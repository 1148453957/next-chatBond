"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { initTA } from "@/lib/js/TA";
import { base_info } from "@/api";
import { getUrlParam } from "@/lib/js/utils";

export default function AppInit() {
  const env = process.env.NEXT_PUBLIC_RUN_ENV;
  useEffect(() => {
    base_info.locale = navigator.language;
    base_info.localZone = Math.abs(new Date().getTimezoneOffset());
    Cookies.set("language", navigator.language, {
      domain: env === "prod" ? ".chatbond.co" : ".aecoapps.com",
    });

    initTA();

    const channelId = getUrlParam("c"); //推广渠道id
    const fromId = getUrlParam("cc"); //推广人
    Cookies.set("channelId", channelId, {
      domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
    });
    Cookies.set("fromId", fromId, {
      domain: env == "prod" ? ".chatbond.co" : ".aecoapps.com",
    });


   /*  const gd = useGlobalData()
    if (Cookies.get('isLogined') == '1') {
      gd.getUserInfo()
    } */


  }, []);

  return <></>;
}
