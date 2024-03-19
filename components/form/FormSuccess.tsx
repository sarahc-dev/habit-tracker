import { CheckCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"

type FormSuccessProps = {
  message?: string
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div
      className="flex items-center gap-2 rounded-md bg-green-500/15 px-3 py-2 text-sm text-green-500"
      data-testid="form-success"
    >
      <CheckCircledIcon />
      <p>
        {`${message} `}
        <Link href="/login" className="underline underline-offset-2">
          Go to login page
        </Link>
      </p>
    </div>
  )
}
