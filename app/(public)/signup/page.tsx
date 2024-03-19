import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import SocialLogin from "@/components/SocialLogin"
import SignupForm from "@/components/SignupForm"

export const metadata: Metadata = {
  title: "Signup | Habit Tracker",
}

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-16">
      <Card className="max-w-md">
        <CardHeader>
          <h1 className="text-xl font-bold">Signup</h1>
          <p>
            Sign up using one of the following services and start building good
            habits today.
          </p>
        </CardHeader>
        <CardContent>
          <SocialLogin isSignup />
          <div className="my-3 text-center before:mr-2 before:inline-block before:w-[50px] before:border-t before:align-middle before:content-[''] after:ml-2 after:inline-block after:w-[50px] after:border-t after:align-middle after:content-['']">
            or
          </div>
          <SignupForm />
          <div className="mt-3 text-center text-sm">
            Already have an account?
            <Link href="/signin" className="text-accent ml-1">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
