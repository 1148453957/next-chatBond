import md5 from "md5";
import dayjs from "dayjs";

export const uuid = () =>
  Number(Math.random().toString().substring(2) + Date.now()).toString(36);

export const uuid2 = (len = 10) => {
  const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let l = 0; l < len; l++) id += c.charAt(~~(Math.random() * 62));
  return id;
};

const generateRandomAlphaNum = (len: number) => {
  let rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random().toString(36).substring(2)
  );
  return rdmString.substring(0, len);
};

export const sign = (key: string) => {
  const now = new Date().getTime();
  const salt = generateRandomAlphaNum(6);
  const signature = md5(now + key + salt);
  return `${signature},${now},${salt}`;
};

export const copyText = (text = "") => {
  return new Promise((resolve, reject) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
        resolve(text);
        return;
      }
      const input = document.createElement("textarea");
      input.setAttribute("readonly", "readonly");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
};

//转换md5
export function getDataMd5(bytes: any) {
  try {
    const md6 = md5(bytes);
    return md6;
  } catch (error) {
    return null;
  }
}

//获取上传签名
export function getSignatureButter(params: any) {
  const sortedKeys = Object.keys(params).sort();
  let builder = "";

  for (const key of sortedKeys) {
    builder += key + "=" + params[key];
  }

  builder += "1q2w3e4r5t6y7u8i9o0p";

  return getDataMd5(builder);
}
//获取上传签名
export function getSignature(params: any) {
  const sortedKeys = Object.keys(JSON.parse(params)).sort();

  let builder = "";

  for (const key of sortedKeys) {
    builder += key + "=" + JSON.stringify(JSON.parse(params)[key]);
  }

  builder += "1q2w3e4r5t6y7u8i9o0p";
  console.log(builder, "builder");

  return getDataMd5(builder);
}

export const getSignatureParams = (params: any) => {
  const data = Object.assign({}, params);
  const keys = Object.keys(data).sort();
  const signArr: string[] = [];
  keys.forEach((key) => {
    const val = data[key];
    if (val !== undefined && key !== "baseInfo") {
      signArr.push(`${key}=${data[key]}`);
    }
  });
  data.signature = md5(signArr.join("&"));
  return data;
};

export const getUrlParam = (name: string) => {
  const hash = location?.hash.split("#")[1] ?? location.search;
  const qs = hash.substring(1);
  const searchParams = new URLSearchParams(qs);
  return searchParams.get(name) ?? "";
};
/**谷歌登录，生成独一无二的state，用于重定向回来的时候比较使用，防止csrf攻击 */
export function generateCryptoRandomState(): string {
  const randomValues = new Uint8Array(16); // 生成 16 字节的随机值
  window.crypto.getRandomValues(randomValues);

  // 使用直接转换字符的方式避免类型问题
  const utf8String = Array.from(randomValues, (byte) =>
    String.fromCharCode(byte)
  ).join("");

  // Base64 编码
  const base64String = btoa(utf8String);

  // 清理 Base64 编码后的字符串，以符合 URL 安全的要求
  return base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
