"use server";

import { signIn, auth } from "@/auth";
export async function authenticate() {
  await signIn("credentials");
}

export async function getSessionData() {
  return await auth();
}
