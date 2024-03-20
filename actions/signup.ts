"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { SignupSchema } from "@/lib/schemas"
import db, { getUserByEmail, users } from "@/db"

export async function signupUser(formData: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (existingUser.length > 0) {
    return { error: "Email already in use" }
  }

  try {
    await db.insert(users).values({ email: email, password: hashedPassword })
    return { success: "Successfully signed up." }
  } catch (error) {
    console.error(error)
    return { error: "Something went wrong. Try again" }
  }
}
