import { Suspense } from "react"
import { signOut } from "@/auth"
import CalendarPicker from "../dashboard/CalendarPicker"

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-16 py-6">
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit" data-testid="signout">
          Sign Out
        </button>
      </form>
      <Suspense>
        <CalendarPicker />
      </Suspense>
    </header>
  )
}
