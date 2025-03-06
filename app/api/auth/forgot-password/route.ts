import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { formSchema } from "@/app/auth/forgot-password/_schema";
import {
  generateLink,
  generateToken,
  replaceVariables,
  sendEmail,
} from "@/app/api/auth/helpers";

const BASE_URL = `${process.env.NEXT_PUBLIC_APP_URL}/auth/password-reset` as string;

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Методът не е позволен" },
        { status: 405 }
      );
    }

    const data = await req.json();

    if (!data) {
      return NextResponse.json({ message: "Невалидни данни" }, { status: 400 });
    }

    const validation = formSchema.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Имейл адресът, който сте предоставили е невалиден." },
        { status: 400 }
      );
    }

    const template = await prisma.template.findFirst({
      where: { key: "forgot_password" },
    });

    if (!template) {
      throw new Error("Темплейтът не е валиден");
    }

    const forgotPasswordToken = await generateToken(user.email);
    const forgotPasswordLink = generateLink(BASE_URL, forgotPasswordToken);

    await prisma.user.update({
      where: { email: data.email },
      data: {
        forgotPasswordToken: forgotPasswordToken,
      },
    });

    const variables = {
      link: forgotPasswordLink,
      name: user.name as string,
      website_name: process.env.NEXT_PUBLIC_APP_NAME as string,
      support_phone: process.env.SUPPORT_PHONE as string,
      support_email: process.env.SUPPORT_EMAIL as string,
      website: process.env.NEXT_PUBLIC_APP_URL as string,
    };

    const html = replaceVariables(template.content, variables);

    await sendEmail(data.email, "Забравена парола", html);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}