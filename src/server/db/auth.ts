import {  Pages, Routes } from "@/components/constants/enum";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./prisma";
import { login } from "../_action/auth";

 const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
       const res = await login(credentials!);
       if (res.status === 200 && res.user) {
        return res.user;
      } else {
        throw new Error(
          JSON.stringify({
            validationError: res.error,
            resError: res.message,
          })
        );
      }
      },
    }),
  ],
  adapter:PrismaAdapter(db),
  pages:{
    signIn :`/${Routes.AUTH}/${Pages.LOGIN}`
  }
};
export default authOptions;