import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const currentUser = !!req.auth

  if (currentUser && !nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }

  if (!currentUser && nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*.png$).*)"],
}
