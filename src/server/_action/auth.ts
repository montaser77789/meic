"use server";

import bcrypt from "bcryptjs";
import { db } from "../db/prisma";
import { loginSchema } from "@/validation/auth";

export const login = async (
  credentials: Record<"email" | "password", string>
) => {
  const result = loginSchema().safeParse(credentials);

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return {
        message: "User not found",
        status: 401,
      };
    }
    const isValidPassword = bcrypt.compare(
      result.data.password,
      user?.password || ""
    );
    if (!isValidPassword) {
      return {
        message: "Invalid password",
        status: 401,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: "Login successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
