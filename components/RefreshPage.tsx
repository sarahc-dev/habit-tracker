"use client"
// Hacky way to refresh page at midnight
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function RefreshPage({
  milliseconds,
}: {
  milliseconds: number
}) {
  const router = useRouter()

  useEffect(() => {
    if (milliseconds > 0) {
      const timer = setTimeout(() => {
        router.refresh()
      }, milliseconds)
      return () => clearTimeout(timer)
    }
  }, [router, milliseconds])

  return null
}
