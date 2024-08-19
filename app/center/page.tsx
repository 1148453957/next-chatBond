"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { authenticate, getSessionData } from "@/app/login/action";
import { loginByGoogle } from "@/api/login";
import Cookies from "js-cookie";
import { sendTA } from "@/lib/js/TA";
import { message, Spin } from "antd";
export default function indexPage({ searchParams }: any) {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(session?.user?.userId);
  const router = useRouter();

  const env = process.env.NEXT_PUBLIC_RUN_ENV;
  const [messageApi, contextHolder] = message.useMessage();

  async function initFn() {
    console.log("我只执行一次");

    if (
      searchParams.code &&
      searchParams.state &&
      searchParams.state == Cookies.get("allyFyGoogleState")
    ) {
      // 谷歌登录回调过来的

      try {
        let res: any = await loginByGoogle({
          auth_code: searchParams.code,
          account_type: 14,
          client_type: 0,
        });

        if (+res.data.error_code === 0) {
          authenticate()
            .then(async (res) => {
              sendTA("XWEB_CLICK", {
                name: "login",
                style: "login_success",
                container: Cookies.get("userId"),
              });
              const session = await getSessionData();

              Cookies.set("userId", session?.user?.userId as any, {
                domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
              });
              Cookies.set("isLogined", "1", {
                domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
              });

              setIsLoggedIn(session?.user?.userId);
            })
            .catch((error: any) => {
              messageApi.open({
                type: "error",
                content: "Login failed, please try again later",
              });
              setTimeout(() => {
                router.push("/login?r=" + encodeURIComponent("/center"));
              }, 1000);
            });
        } else {
          throw res.data?.error_msg;
        }
      } catch (err: any) {
        messageApi.open({
          type: "error",
          content: err || "Login failed, please try again later",
        });
        setTimeout(() => {
          router.push("/login?r=" + encodeURIComponent("/center"));
        }, 1000);
      }
    } else {
      if (!isLoggedIn) {
        // 如果没有登录，就会直接重定向
        router.push("/login?r=" + encodeURIComponent("/center"));
      }
    }
  }

  useEffect(() => {
    initFn();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="h-full bg-#fff text-black/50 p-5 font-[Inter]">
        {!isLoggedIn ? (
          <div className="text-center mt-6">
            <Spin />
          </div>
        ) : (
          "qweqweqweqwe"
        )}
      </div>
    </>
  );
}
