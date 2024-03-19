"use server"

import { z } from "zod"
import { LoginSchema, SignupSchema } from "@/lib/schemas"

export async function authenticateUser(formData: z.infer<typeof LoginSchema>) {
  console.log(formData)
  return { error: "Error" }
}

export async function signupUser(formData: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(formData)

  //   return { message: "Please enter a valid email" }\
  return { success: "Successfully signed up." }
}
