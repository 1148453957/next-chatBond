"use server";

import { signIn, auth } from "@/auth";
export async function authenticate() {
/*   const session = await auth();
  console.log(11111, session);
 */
//  await signIn("credentials", { redirectTo: "/test3" });
  await signIn("credentials");
}
