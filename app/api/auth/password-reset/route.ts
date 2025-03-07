import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { formSchema } from "@/app/auth/password-reset/_schema";
import { decodeToken } from "../../../../lib/helpers";
import bcrypt from "bcryptjs";

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

    const user = await prisma.user.findFirst({
      where: { forgotPasswordToken: data.token as string },
    });

    if (!user || !user.forgotPasswordToken) {
      return NextResponse.json(
        { message: "Невалиден линк за смяна на паролата." },
        { status: 400 }
      );
    }

    const decodedData = decodeToken(user.forgotPasswordToken);

    if (!decodedData) {
      return NextResponse.json(
        { message: "Линкът, който сте предоставили е невалиден." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        forgotPasswordToken: null,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Вътрешна грешка на сървъра" },
      { status: 500 }
    );
  }
}