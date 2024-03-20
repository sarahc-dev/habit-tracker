"use server"

import { AuthError } from "next-auth"
import { z } from "zod"
import { LoginSchema } from "@/lib/schemas"
import { signIn } from "@/auth"

export async function loginUser(formData: z.infer<typeof LoginSchema>) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials"
        default:
          return "Something went wrong"
      }
    }
    throw error
  }
}
