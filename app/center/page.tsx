//import { redirect, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authenticate, getSessionData } from "@/app/login/action";
import { message } from "antd";
import { loginByGoogle } from "@/api/login";
import Cookies from "js-cookie";
import { sendTA } from "@/lib/js/TA";
import { meaasgeCom } from "./actions.ts";
export default async function indexPage({ searchParams }: any) {


  meaasgeCom('error','123123')
  return (
    <>

      <div>这是cenetr页面</div>
    </>
  );
 /*  const session = await getSessionData();
  const env = process.env.NEXT_PUBLIC_RUN_ENV;

  const cookieStore = cookies();

  const [meaasge, setMeaasge] = useState({
    type: "error",
    content: "123",
  });

  if (
    searchParams.code &&
    searchParams.state &&
    searchParams.state == cookieStore.get("allyFyGoogleState")?.value
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
             Cookies.set('isLogined', '1', {
              domain: env == 'prod' ? '.chatbond.co' : '.aecoapps.com',
            })
          })
          .catch((error: any) => {
            messageApi.error("Login failed, please try again later");
            redirect("/login?r=" + encodeURIComponent("/center"));
          });
      } else {
        throw res.data?.error_msg;
      }
    } catch (err: any) {
      messageApi.error(err || "Login failed, please try again later");
      redirect("/login?r=" + encodeURIComponent("/center"));
    }
  } else {
    const isLoggedIn = session?.user?.userId;

    if (!isLoggedIn) {
      redirect("/login?r=" + encodeURIComponent("/center"));
    }
  }
  return (
    <>

      <div>这是cenetr页面</div>
    </>
  ); */
}
