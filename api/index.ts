/**谷歌登录所需id */
export const googleId =
  process.env.NEXT_PUBLIC_RUN_ENV == "prod"
    ? "587232671502-fera4an8b18gt1pmdpag8ouge5ogc86g.apps.googleusercontent.com"
    : "678474632478-869oob8s9p4gjt67j469ol0bknjc47c4.apps.googleusercontent.com";
/**谷歌登录回调地址 */
export const googleRedirectUrl =
  process.env.NEXT_PUBLIC_RUN_ENV == "prod"
    ? "https://www.chatbond.co"
    : "http://test-bot.aecoapps.com/center";

/**stripe支付所需 */
export const appKey = "optbz50h";
export const signKey =
  process.env.NEXT_PUBLIC_RUN_ENV === "prod"
    ? "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALwh7uqNmj/SKnKF0MLHo7415F9UH83lZpqwuQVZTfLwIyxrZhgjNu63DVxMaO3JxEi1tMw7k3kPcHuaYc6NN/cMHrhEd/GAZDcCUA5IATcwc5NekoNyYeJrIA06xMh+T0ZVC0i3iMZ2vIN5MLg3y4ehmO7kiF5B8sqTNgofBEb/AgMBAAECgYAUSuC3YhC6Q5QaiD6NU/VghfWdJrjLf6wCkX9TiV90DdztZKQ9hEbfltUVGJTU2UeXxCm9QcvVagnq+ysDmY3oowgEnbOC2Orxwk+DK+C4Revjwvsn71DSRmlk8/i3fSt8X+UnzK11aXoxyTwlNrpeeFpxWNcxbUt7NotZr7P2YQJBAP3pY5uJDP6zlN67xvS9c0r3G000Sc+J+gWr0zd9inbWDGJ5kCmJ8mii4CIrvXbSFZpKdDGisoObzMPmbsY5z5ECQQC9rgvXwP0wd+7nhpu6HiIH4lDHo28bl1osduStpJ9p+k+pk/DpEMBSDX8laHsHrhy3o03tb7XwNd9/VDviM4WPAkEAw2rHnaIaHUELN21fz2argCu0mHPAxvkTMyAuHEwDsDhHKdcTa9Tee0e3prTxSaygsbHRwY3NRFs5eiA0a1188QJBAJsepxi+/1CQBJTbhKdk1TfVYXKiuc66rEgIw2MuaiBlUJjCIBa6WE3CM+UH2PWi8mFL8ALphMT5idm7rW2D7QkCQHmUQD1qveoK6+9McRsInawJHREHcZK++Pb/xoQZ9/ecfr3s7xX56Eb5v7hsb+3qZg9GMz+Ut2XIADaO5rCVq3Q="
    : "MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBALOWUIBKwnxb/JR661Eiiw3vW63Xrxyr1IUkXKBg5m8ZNqJ5afMAWrF5rQSa3nbNhiIluEWdU0+eIyrCfYGAq5GpFy7THgF5Ni3xz8JHIC5AckK31uNCFbBJWwxdvi93iv4O6VtkJ4RcO7c8/Ash5Qetj5IycvN7SP+n5+quFyO/AgMBAAECgYEAjTGTHSqp+ihAT2TM+j9UYKJdzDIVRU97iSprgNRul86U++zFdf5DT+HAPCye130DBnnthR4KUECemZHMJzNIr6jiY4qYH1cerK1YFqqPpS8BiS14R5gHc25tI5EeQMDs+jfJUjSrOItKfOGb7MQj8E83TzS0lduC1R/p7b2Y23ECQQD+DiGw9r/4cqHlUR7xF/EMm4tI36eSaOtQf/GtPlLCudBiouetcau2GHotZXmVvjSH3g7txMMACXCRoC6P7LOjAkEAtPY/t2ebQVuFO2wL3gPJ50NBKVd+srDBuTA7daKaAU+3jR2r9KYZuNpze9/o4Y3qiFZUy0tbGX9KO1GxcrlxNQJBALf+tBfeHRpqqyXRon8pv8JJxI56rHo00nfysa2uvXGZ8Xn+UZwj/yBaieHm5C+3GYRtJpK9Nh0IuSY+xHooC9ECQQCEo0mogIRHr3FEULmSDWzb2WvVhZAUIYKc3kF2w6vl8iwzfuAe/fA0kcm7ri7fxEl3jO+x4pXvZmFegU5zLIFRAkEA/NyaGCLOJ1sm6NJ5gFo9M6A7OUQKxpJ40wKBrtM89nyPiDFb7JMpeBkF9K+MRa/GAOhjBNGEpCRzp6j8pVzP1Q==";

/**paypal支付所需 */
export const paypalClientID =
  process.env.NEXT_PUBLIC_RUN_ENV == "prod"
    ? "AXZlmy96vSVH3c8ygvVKBbOH1738yOza2tlL8Z_tJUJ_6nAcw9GGHGNaW-CY2MrDtlPOi2kL1ZJMbsXE"
    : "ASYLPg5D6_RRgGGwEWc1-a25BFi3uOB04hCkvDJLLKQf7lBJfbsvWbeYCfP6WcTdWK1yNDJ2zRcmxroA";

/**数数打点 */
export const initRBIData = {
  appId:
    process.env.NEXT_PUBLIC_RUN_ENV == "prod"
      ? "a7af28148f3642f4a7134577aff7ab3c"
      : "cd2fb7e3f295490f82577adb7b38760b",
  serverUrl: "//ta-api.allyfy.chat/",
};
export const homeUrl = "https://www.chatbond.co";

export const appId = "102210213";
export const packageName = "com.cch.allyfy.webh";
export const base_info = {
  clientId: "b4d3ezmepd15003lxbg5anb6af0yy975", // 手动生成的用户ID
  pid: "38281", // 产品的APK_ID
  channelId: "100000", // TODO:推广的渠道号，暂定
  versionCode: 3, // 每次发版递增
  versionName: "1.0.1.1005", // 提测涉及的版本号
  locale: "", // 浏览器语言
  localZone: 0, //和零时区的分钟差
  packageName,
  appId,
};
