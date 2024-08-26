"use server";
import { cookies } from "next/headers";

import { appId } from "./index";
import qs from "qs";
const accountDomain = process.env.NEXT_PUBLIC_ACC_HOST;
import axios from "axios";
const http = axios.create({
  withCredentials: true,
});

http.interceptors.response.use(
  function (response: any) {
    // 把登录接口也放在了服务端，所以需要把set-cookie手动存在客户端，但是如果接口都从服务端走到话，似乎客户端也不需要了啊
    // 性能影响呢？
    if (["/v2/user/login"].some((e) => response.config.url.includes(e))) {
      if (
        response.headers["set-cookie"] &&
        response.headers["set-cookie"].length > 0
      ) {
        const cookieStore = cookies();
        response.headers["set-cookie"].forEach((e) => {
          let arr = e.split(";");
          let obj = {} as any;
          arr.forEach((item) => {
            const [name, value] = item.trim().split("=");
            switch (name) {
              case "psu":
                obj.name = "psu";
                obj.value = value;

                break;
              case "pms":
                obj.name = "pms";
                obj.value = value;

                break;
              case "psf":
                obj.name = "psf";
                obj.value = value;

                break;
              case "HttpOnly":
                obj[name] = true;

                break;
              case "expires":
                obj[name] = new Date(value);

                break;
              default:
                obj[name] = value;

                break;
            }
          });
          cookieStore.set(obj);
        });
      }
    }
    return Promise.resolve(response.data);
  },
  function (error) {
    return Promise.reject(error.message || error);
  }
);
const randomStr = (length = 8) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/**谷歌登录 */
export const loginByGoogle = (params = {}) => {
  return http.post(
    `${accountDomain}/v2/user/register`,
    qs.stringify({
      ...params,
      app_id: appId,
      cr: randomStr(16),
    })
  );
};

/**邮箱注册,获取验证码 */
export const emailRegister = (params: any) => {
  return http.post(
    `${accountDomain}/v2/user/register`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    })
  );
};
/**邮箱注册,验证验证码 */
export const emailVerifyCode = (params: any) => {
  return http.post(
    `${accountDomain}/v2/user/verifycode`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
    })
  );
};

/**邮箱登录 */
export const emailLogin = (params: any) => {
  return http.post(
    `${accountDomain}/v2/user/login`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    })
  );
};

/**重置密码,获取验证码 */
export const resetPassword = (params: any) => {
  return http.post(
    `${accountDomain}/v2/user/forget_pwd`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
      cr: randomStr(16),
    })
  );
};
/**重置密码,验证验证码 */
export const resetPasswordVerifyCode = (params: any) => {
  return http.post(
    `${accountDomain}/v2/user/reset_pwd`,
    qs.stringify({
      ...params,
      app_id: appId,
      account_type: 7,
    })
  );
};
/**退出登录 */
export const logout = (params = {}) => {
  return http.post(
    `${accountDomain}/v2/user/logout`,
    qs.stringify({
      ...params,
      account_type: 7,
      app_id: appId,
    })
  );
};
/**修改用户信息 */
export const updateAccountApi = (params = {}) => {
  return http.post(`${accountDomain}/api/v1/account/update`, params);
};
/**删除用户 */
export const deleteAccountApi = (params = {}) => {
  return http.post(`${accountDomain}/api/v1/account/delete`, params);
};
