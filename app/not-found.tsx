import Link from "next/link"
import { HiOutlineEmojiSad } from "react-icons/hi"

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <HiOutlineEmojiSad size="1.5em" />
      <h2 className="mb-3 mt-2 text-xl font-semibold">404 Not Found</h2>
      <Link
        href="/"
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  )
}
