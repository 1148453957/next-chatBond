"use server";

import { signIn, auth } from "@/auth";
export async function authenticate(redirectTo) {
  await signIn("credentials", {
    redirectTo,
  });
}

export async function getSessionData() {
  return await auth();
}
