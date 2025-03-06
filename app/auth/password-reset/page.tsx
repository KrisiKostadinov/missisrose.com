import { redirect } from "next/navigation";

import { prisma } from "@/db/prisma";
import Header from "@/app/_components/header";
import PasswordResetForm from "@/app/auth/password-reset/_components/password-reset-form";
import { decodeToken } from "@/app/api/auth/helpers";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PasswordResetPage({ searchParams }: Props) {
  const awaitedParams = await searchParams;

  const user = await prisma.user.findFirst({
    where: { forgotPasswordToken: awaitedParams.token as string }
  });

  if (!user || !user.forgotPasswordToken || !awaitedParams.token) {
    return redirect("/");
  }

  const decodedData = decodeToken(user.forgotPasswordToken);

  if (!decodedData) {
    return redirect("/");
  }

  return (
    <>
      <Header />
      <PasswordResetForm token={awaitedParams.token as string} />
    </>
  );
}
