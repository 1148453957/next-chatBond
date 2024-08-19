"use client";
import { message } from "antd";
import { useEffect } from "react";
export function MeaasgeCom({ type, content }: any) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (content) {
      messageApi.open({
        type,
        content,
      });
    }
  }, []);
  return <> {contextHolder} </>;
}
