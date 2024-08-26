import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserInfoApi } from "@/api/bot";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      email: string;
      displayName: string;
      subscriptionId: string;
      equityName: string;
      totalMessagesCredits: number;
      usedMessagesCredits: number;
      subscriptionDetails: any;
      thirdCustomerId: string;
      thirdSubscriptionId: string;
      nextRenewalTime: number;
      subscriptionExpireTime: number;
      apiKeys: any;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        try {
          let userRes = await getUserInfoApi();
          return { ...userRes.data, status: 1 };
        } catch (err: any) {
          throw "出错了";

          return null;
        }
      },
    }) as any,
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      // 依靠这个token去和服务端建立链接，判断是否登录的，cookie里清除掉，就退出登录了
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        path: "/",
        maxAge: 6 * 60 * 60, // 单位是秒，6个小时后过期，token失效，退出登录，需要重新登陆，
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = { ...session.user, ...token } as any;
      return session;
    },
  },
  trustHost: true, //这里不写会打包的时候会报错，不知道为啥，没有读到.env里面的配置
  secret: "aJaOZZl7No0C/HTp/BsLbNTh/asSgWD6Ux1IQxIV3Ow=", //这里不写会打包的时候会报错，不知道为啥，没有读到.env里面的配置
});
