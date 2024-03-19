"use client"

import { Button } from "./button"

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
      className="w-full disabled:bg-red-500"
    >
      {children}
    </Button>
  )
}
