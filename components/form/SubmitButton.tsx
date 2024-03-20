"use client"

import { Button } from "../ui/button"

export default function SubmitButton({
  pending,
  children,
}: {
  pending: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="w-full"
    >
      {children}
    </Button>
  )
}
