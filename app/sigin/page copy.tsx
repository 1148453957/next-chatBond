"use client";

import { authenticate } from "./action";

export default  function LoginPage() {
  const submit = () => {
    authenticate();
  };

  return (
    <main className="flex flex-col p-4">
      123123
      <div onClick={submit}>登录</div>
      <div>登出</div>
    </main>
  );
}
