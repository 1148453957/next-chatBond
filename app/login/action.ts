"use server";

import { signIn, auth } from "@/auth";
export async function authenticate() {
  return await signIn("credentials");
}

export async function getSessionData() {
  return await auth();
}
