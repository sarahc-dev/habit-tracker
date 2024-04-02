import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 text-center md:px-16">
      <h1 className="mt-10 text-5xl font-bold uppercase">
        Improve your habits
        <br />
        <span className="underline decoration-primary underline-offset-4">
          one day
        </span>{" "}
        at a time.
      </h1>
      <p className="my-6 max-w-xl">
        Unlock your potential by tracking your habits to reach your goals. Set
        habits, monitor your progress, and stay committed every step of the way.
      </p>
      <Link
        href="/signup"
        className="rounded-md bg-foreground px-4 py-2 text-white shadow transition-all hover:bg-primary/90"
      >
        Try Habit Tracker
      </Link>
    </main>
  )
}
