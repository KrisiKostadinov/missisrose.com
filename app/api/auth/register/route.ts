import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { formSchema } from "@/app/auth/register/_schema";
import { prisma } from "@/db/prisma";
import {
  generateConfirmationLink,
  generateConfirmationToken,
  replaceVariables,
  sendEmail,
} from "@/app/api/auth/helpers";

export async function POST(req: NextRequest) {
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

  try {
    const template = await prisma.template.findFirst({
      where: { key: "email_confirmation_token" },
    });

    if (!template) {
      throw new Error("Темплейтът не е валиден");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Имейлът вече е регистриран" },
        { status: 400 }
      );
    }

    const emailVerificationToken = await generateConfirmationToken(data.email);
    const emailVerificationLink = generateConfirmationLink(
      emailVerificationToken
    );

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { email: data.email },
      data: { emailVerificationToken },
    });

    const variables = {
      link: emailVerificationLink,
      name: data.name,
      support_phone: process.env.SUPPORT_PHONE as string,
      support_email: process.env.SUPPORT_EMAIL as string,
      website: process.env.NEXT_PUBLIC_APP_URL as string,
    };

    const html = replaceVariables(template.content, variables);

    await sendEmail(data.email, "Потвърждение на имейл", html);

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}
