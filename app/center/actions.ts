"use client";
import { message } from "antd";
import { useEffect } from "react";
export  function meaasgeCom(type: string, content: string) {
  const [messageApi, contextHolder]: any = message.useMessage();
  useEffect(() => {
    messageApi[type](content);
  }, []);
  return null
}
