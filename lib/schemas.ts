import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const SignupSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
      .regex(/^(?=.*[A-Z])(?=.*\d).+/, {
        message: "Must include at least one uppercase letter and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
