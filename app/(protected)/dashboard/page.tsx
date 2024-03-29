import Link from "next/link"
import HabitsContextProvider from "@/contexts/HabitsContext"
import HabitsList from "@/components/dashboard/HabitsList"
import AddHabit from "@/components/dashboard/AddHabit"
import { auth } from "@/auth"
import { getDateString, getNextDate, getPreviousDate } from "@/lib/dateUtils"
import { getHabits } from "@/db/queries/getHabits"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { ["date"]: string | undefined }
}) {
  const session = await auth()
  if (!session?.user?.id) return null

  const date = searchParams["date"]
    ? new Date(searchParams["date"])
    : new Date()

  const currentDate = getDateString(date)

  const data = await getHabits(session?.user.id, date)
  return (
    <HabitsContextProvider habits={data} userId={session?.user.id} date={date}>
      <main className="flex-1 px-16">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard?date=${getPreviousDate(currentDate)}`}>
            <FiArrowLeft />
            <span className="sr-only">Previous day</span>
          </Link>

          <div className="font-bold">{currentDate}</div>
          <Link href={`/dashboard?date=${getNextDate(currentDate)}`}>
            <FiArrowRight />
            <span className="sr-only">Next day</span>
          </Link>
        </div>

        <HabitsList />
        <AddHabit />
      </main>
    </HabitsContextProvider>
  )
}
