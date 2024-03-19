import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { GrGithub } from "react-icons/gr"

type SocialLoginProps = {
  isSignup?: boolean
}

export default function SocialLogin({ isSignup = false }: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <form
        action={async () => {
          "use server"
          console.log("google")
        }}
      >
        <Button type="submit" variant="outline" className="w-full">
          <FcGoogle className="mr-2 h-4 w-4" />
          {`${isSignup ? "Continue" : "Log in"} with Google`}
        </Button>
      </form>
      <form
        action={async () => {
          "use server"
          console.log("github")
        }}
      >
        <Button type="submit" variant="outline" className="w-full">
          <GrGithub className="mr-2 h-4 w-4" />
          {`${isSignup ? "Continue" : "Log in"} with GitHub`}
        </Button>
      </form>
    </div>
  )
}
