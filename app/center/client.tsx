"use client";
import "./index.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate, getSessionData } from "@/app/login/action";
import { loginByGoogle } from "@/api/login";
import Cookies from "js-cookie";
import { sendTA } from "@/lib/js/TA";
import { message, Spin, Button, Dropdown, Menu } from "antd";
import { robotListApi, deleteBotApi } from "@/api/bot";
import {
  PlusOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useErrorStore } from "@/app/store/useErrorStore";
import { useShallow } from "zustand/react/shallow";
export default function clientPage({ session, searchParams }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const env = process.env.NEXT_PUBLIC_RUN_ENV;
  const [messageApi, contextHolder] = message.useMessage();
  const isLoggedIn = session?.user?.userId;

  async function initFn() {
    sendTA("XWEB_SHOW", {
      name: "Chatbots_page",
      container: Cookies.get("userId"),
    });
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
          if (+res.error_code === 0) {
            authenticate()
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
                await getData();
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
      await getData();
    }
  }
  const [botList, setBotList] = useState([]);
  const [canCreate, setCanCreate] = useState(true);

  async function getData() {
    try {
      const res = await robotListApi();
      setBotList(res.data);
      setCanCreate(
        res.data.length < session.user?.subscriptionDetails?.botNumber
      );
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initFn();
  }, []);
  function handleAdd() {}
  function handleLink(botId: any) {}
  function handleClick(botId: any) {}
  return (
    <>
      {contextHolder}
      <div className="w-full h-[calc(100%-64px)]  bg-#fff text-black/50 p-5 font-[Inter]">
        {isLoading ? (
          <div className="text-center mt-6 ">
            <Spin />
          </div>
        ) : (
          <div className="max-w-[1080px] mx-auto relative">
            <div className="mb-10">
              <h1
                className={`text-8 text-#040608 fw-700 mt-15 text-center   ${
                  botList.length ? "text-left" : ""
                }`}
              >
                Chatbots
              </h1>
              {botList.length && canCreate && (
                <div className="absolute right-0 top-0 md:top--3">
                  <Button
                    onClick={handleAdd}
                    type="text"
                    className="w-36 !h-10 md:w-204px md:!h-12 text-18px !b-0 !text-#fff !fw-700"
                    style={{
                      background:
                        "var(--Linear, linear-gradient(90deg, #83e10a 0%, #0ac655 100%))",
                    }}
                  >
                    <span>New Chatbot</span>
                    <PlusOutlined
                      style={{ position: "relative", top: " -2px" }}
                    />
                  </Button>
                </div>
              )}
            </div>
            <div className="animate-ease-in border-1 border-#E6E6E6 p-6 text-center rounded-3">
              {botList.length ? (
                <div className="_ItemWA  grid gap-4 md:gap-5 lg:gap-6">
                  {botList.map((item, index) => (
                    <div
                      key={index}
                      className={`relative z10 bg-#F0F0F0 overflow-hidden rd-2 transition-transform hover:scale-105 ${
                        !item.path ? "!cursor-not-allowed" : ""
                      }`}
                    >
                      <div
                        className="flex cursor-pointer"
                        onClick={() => handleLink(item.botId)}
                      >
                        <div className="w-full h-full">
                          {item.avatar ? (
                            <img
                              className="w-full object-cover bg-#E6E6E6"
                              src={item.avatar}
                            />
                          ) : (
                            <div className="w-full h-full fcc min-h-130px bg-#E6E6E6">
                              <img
                                className="w-full max-w-25 object-cover"
                                src="/assets/img/default_bg.png"
                                alt="Chatbond defaultBg"
                              />
                            </div>
                          )}
                          <div className="max-h-16 m-3 fw-500 bg-#F0F0F0 text-left break-all text-4 text-black lh-5 text-overflow-2">
                            {item.botName}
                          </div>
                        </div>
                        {/* <Dropdown
                          dropdownRender={() => (
                            <div
                              className="flex items-center"
                              onClick={() => handleClick(item.id)}
                            >
                              <DeleteOutlined />
                              <span className="pl-2">删除</span>
                            </div>
                          )}
                        >
                          <EllipsisOutlined className="absolute top-5 right-5  text-lg cursor-pointer text-black/50 hover:!text-[#000]" />
                        </Dropdown> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Button
                  onClick={handleAdd}
                  type="text"
                  className="!b-0 w-204px !h-12 text-18px !text-#fff !fw-700 my-33"
                  style={{
                    background:
                      "var(--Linear, linear-gradient(90deg, #83e10a 0%, #0ac655 100%))",
                  }}
                >
                  <span>New Chatbot</span>

                  <PlusOutlined
                    style={{ position: "relative", top: " -2px" }}
                  />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
