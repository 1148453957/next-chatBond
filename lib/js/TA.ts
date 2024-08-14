import ta from "thinkingdata-browser";
//import { useGlobalData } from '@/stores/gd'
import { XalContext } from "@/lib/utils/xal/XalContext";
import Cookies from "js-cookie";
import { initRBIData, base_info, homeUrl } from "@/api";

// 记录页面打开时间等
const getTiming = () => {
  try {
    const t = window?.performance?.timing ?? {};

    const times = {
      result: "success",
      //DNS查询耗时
      dnsTime: t.domainLookupEnd - t.domainLookupStart,

      // TTFB 从客户端发起请求到接收响应的时间
      ttfbTime: t.responseStart - t.requestStart,

      // http请求总耗时
      httpTotalTime: t.responseEnd - t.requestStart,

      //白屏时间
      blankTime: (t.domInteractive || t.domLoading) - t.fetchStart,

      // 解析dom树耗时
      analysisTime: t.domComplete - t.domInteractive,

      // url回车到现在时长
      loadPageTime: Date.now() - (t?.navigationStart || t.fetchStart),
    };

    ta.track("times", times);
  } catch (error) {
    // 页面时间获取失败
    ta.track("times", {
      result: "error",
    });
  }
};

export const initTA = () => {
  try {
    XalContext.init(
      base_info.packageName,
      base_info.versionCode,
      base_info.versionName,
      homeUrl
    );
    const uuid = XalContext.getClientId();
    sessionStorage.setItem("onlyId", uuid);
    base_info.clientId = uuid;
    const config = {
      appId: initRBIData?.appId,
      serverUrl: initRBIData?.serverUrl,
      autoTrack: {
        pageShow: false,
        pageHide: false,
      },
      showLog: false,
      mode: "normal",
    };

    ta.init(config);
    // TODO:
    // 设置用户属性
    /* const gd = useGlobalData()
    const userId = gd.userId
    if (userId) {
      ta.userSet({ userId })
    } */

    // 每个打点都会加的属性
    ta.setDynamicSuperProperties(() => {
      const channelId = Cookies.get("channelId") || "10000";
      const fromId = Cookies.get("fromId") || "0";
      return {
        url: location.href,
        channelId,
        fromId,
        // web_version_code: window.__version_code,
      };
    });

    if (document.readyState === "complete") {
      getTiming();
    } else {
      window.addEventListener("load", getTiming);
    }
  } catch (error) {
    console.log("initTA error: ", error);
  }
};

export const taLogin = (id = "") => {
  try {
    ta.login(id);
  } catch (error) {
    // console.log('ta.track error: ', error)
  }
};

// 打点
export const sendTA = (
  type: String | "show" | "click" | "operation",
  params = {}
) => {
  try {
    ta.track(type, params);
  } catch (error) {
    // console.log('ta.track error: ', error)
  }
};
