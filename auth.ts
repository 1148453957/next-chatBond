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
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      session.user = { ...session.user, ...token } as any;

      return session;
    },
  },
});
