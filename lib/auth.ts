import { redirect } from "next/navigation";

import { decrypt, deleteSession, getSession } from "@/lib/session";
import { AuthSession } from "@/types";

export async function logout(path: string = "/auth/login") {
  await deleteSession("auth");
  redirect(path);
}

export async function getAuthSessionData() {
  const session = await getSession("auth");

  if (!session) {
    return null;
  }

  const decryptedData = await decrypt(session.value);

  if (!decryptedData) {
    return null;
  }
  
  return decryptedData as AuthSession;
}
