import { JSON_HEADER } from "./lib/constants/api.constant";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(` ${process.env.API}/auth/signin`, {
          method: "POST",
          headers: {
            ...JSON_HEADER,
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const payload: ApiResponse<LoginResponse> = await response.json();

        if (payload.message == "success") {
          // Save the token in cookies
          cookies().set("token_exam", payload.token, {
            httpOnly: true,
          });

          return {
            token: payload.token,
            ...payload.user,
          };
        }
        throw new Error(`Failed to sign in user: ${payload.message}`);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;

      return session;
    },
  },
};
