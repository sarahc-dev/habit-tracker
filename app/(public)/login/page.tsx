import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import SocialLogin from "@/components/SocialLogin"
import LoginForm from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "Login | Habit Tracker",
}

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-16">
      <Card className="max-w-md">
        <CardHeader>
          <h1 className="text-xl font-bold">Login</h1>
          <p>Login to your account and continue building good habits today.</p>
        </CardHeader>
        <CardContent>
          <SocialLogin />
          <div className="my-3 text-center before:mr-2 before:inline-block before:w-[50px] before:border-t before:align-middle before:content-[''] after:ml-2 after:inline-block after:w-[50px] after:border-t after:align-middle after:content-['']">
            or
          </div>
          <LoginForm />
          <div className="mt-3 text-center text-sm">
            Don&apos;t have an account?
            <Link href="/signin" className="text-accent ml-1">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
