import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "@/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    // to expose data like user id it on the client side
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
