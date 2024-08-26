"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate, getSessionData } from "@/app/login/action";
import { loginByGoogle } from "@/api/login";
import Cookies from "js-cookie";
import { sendTA } from "@/lib/js/TA";
import { message, Spin } from "antd";

export default function indexPage({ session, searchParams }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const env = process.env.NEXT_PUBLIC_RUN_ENV;
  const [messageApi, contextHolder] = message.useMessage();
  const isLoggedIn = session?.user?.userId;

  async function initFn() {
    if (!isLoggedIn) {
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
          console.log(444444, res);

          if (+res.error_code === 0) {
            authenticate("/center")
              .then(async () => {
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
                getData();
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
            throw res?.error_msg;
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
        // 如果没有登录，就会直接重定向
        router.push("/login?r=" + encodeURIComponent("/center"));
      }
    } else {
      // 已经登录，请求连接数据
      getData();
    }
  }

  function getData() {
    console.log(33333);
  }

  useEffect(() => {
    initFn();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="h-full bg-#fff text-black/50 p-5 font-[Inter]">
        {isLoading ? (
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
