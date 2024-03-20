import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { LoginSchema } from "@/lib/schemas"
import { getUserByEmail } from "@/db"

export const authConfig = {
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user[0] || !user[0].password) return null

          const passwordMatch = await bcrypt.compare(password, user[0].password)

          if (passwordMatch) return user[0]
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
