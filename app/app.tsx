"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { initTA } from "@/lib/js/TA";
import { base_info } from "@/api";
import { getUrlParam } from "@/lib/js/utils";
import { useSession } from "next-auth/react";
import ta from "thinkingdata-browser";

export default function AppInit() {
  const env = process.env.NEXT_PUBLIC_RUN_ENV;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status != "loading") {
    }
    const channelId = getUrlParam("c"); //推广渠道id
    const fromId = getUrlParam("cc"); //推广人
    Cookies.set("channelId", channelId, {
      domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
    });
    Cookies.set("fromId", fromId, {
      domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
    });

    base_info.locale = navigator.language;
    base_info.localZone = Math.abs(new Date().getTimezoneOffset());
    Cookies.set("base_info", JSON.stringify(base_info), {
      domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
    });
    Cookies.set("language", navigator.language, {
      domain: env === "prod" ? ".chatbond.co" : ".aecoapps.com",
    });

    initTA();
  }, [status]);

  useEffect(() => {
    // 为打点，设置用户属性
    if (status != "loading") {
      const userId = session?.user?.userId;
      if (userId) {
        ta.userSet({ userId });
      }
    }
  }, [status]);

  return <></>;
}
