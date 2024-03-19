"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <h2 className="mb-3 mt-2 text-xl font-semibold">
        Oops, something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400"
      >
        Try again
      </button>
    </main>
  )
}
