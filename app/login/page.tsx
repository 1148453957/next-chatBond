"use client";

import { signIn } from "@/lib/auth";

export default async function LoginPage() {
  const submit = () => {
    signIn("credentials", { formData: 123123 });
  };

  return (
    <main className="flex flex-col p-4">
      123123
      <div onClick={submit}>登录</div>
      <div>登出</div>
    </main>
  );
}
