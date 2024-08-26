"use server";

import { signIn, auth } from "@/auth";
export async function authenticate() {
  const session = await auth();
  try {
     await signIn("credentials", {
      test: 123123,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }
}
