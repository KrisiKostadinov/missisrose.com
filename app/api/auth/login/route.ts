import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/db/prisma";
import { formSchema } from "@/app/auth/login/_schema";
import { generateToken } from "@/lib/helpers";
import { createSession } from "@/lib/session";
import { AuthSession } from "@/types";

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

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Невалидни са имейл адресът или паролата" },
      { status: 400 }
    );
  }

  const passwordValid = await bcrypt.compare(data.password, user.password);

  if (!passwordValid) {
    return NextResponse.json(
      { message: "Невалидни са имейл адресът или паролата" },
      { status: 400 }
    );
  }

  const token = generateToken(user.email);

  const authSession: AuthSession = {
    email: user.email,
    id: user.id,
    password: user.password,
  };

  await createSession("auth", authSession);

  return NextResponse.json({ token }, { status: 200 });
}