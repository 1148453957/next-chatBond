import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        let user = { id: 1, name: "User", email: credentials.email };

        console.log(111111, credentials);

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
