//import { redirect, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authenticate, getSessionData } from "@/app/login/action";
import { loginByGoogle } from "@/api/login";
import Cookies from "js-cookie";
import { sendTA } from "@/lib/js/TA";
import { MeaasgeCom } from "./actions";

export default async function indexPage({ searchParams }: any) {
  const session = await getSessionData();
  const env = process.env.NEXT_PUBLIC_RUN_ENV;

  const cookieStore = cookies();

/*   const [message, setMessage] = useState({
    type: "error",
    content: "",
  }); */

const message={
  type: "error",
  content: "",
}



console.log(333333,searchParams);


  if (
    searchParams.code &&
    searchParams.state &&
    searchParams.state == cookieStore.get("allyFyGoogleState")?.value
  ) {
    // 谷歌登录回调过来的

    try {
      console.log('111???');
      
      let res: any = await loginByGoogle({
        auth_code: searchParams.code,
        account_type: 14,
        client_type: 0,
      });
      console.log('12222???',res.data.error_code);

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
            console.log(99999,session);
            throw JSON.stringify(session)
          })
          .catch((error: any) => {
        /*     setMessage((prevState) => ({
              ...prevState,
              content: "Login failed, please try again later",
            }));
 */
            message.content="Login failed, please try again later"
          //  redirect("/login?r=" + encodeURIComponent("/center"));
          });
      } else {
        throw res.data?.error_msg;
      }
    } catch (err: any) {

      message.content= err ||"Login failed, please try again later"
      await new Promise(resolve => setTimeout(resolve, 10000));
  redirect("/login?r=" + encodeURIComponent("/center"));
  
    }
  } else {
    const isLoggedIn = session?.user?.userId;

    if (!isLoggedIn) {
     // redirect("/login?r=" + encodeURIComponent("/center"));
    }
  }
  return (
    <>
      <MeaasgeCom type={message.type} content={message.content}></MeaasgeCom>
      <div>这是cenetr页面</div>
    </>
  );
}
