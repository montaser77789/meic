import * as z from "zod"

export const loginSchema = () => {
  return z.object({
    email: z.email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(40, { message: "Password must be at most 40 characters" }),
  })
}

export type validationErrors =
  | {
      [key: string]: string[]
    }
  | undefined
