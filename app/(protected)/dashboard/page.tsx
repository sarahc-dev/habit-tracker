import HabitsContextProvider from "@/contexts/HabitsContext"
import { auth } from "@/auth"
import { getHabits } from "@/db/queries/getHabits"
import { calculateMillisecondsToMidnight } from "@/lib/dateUtils"
import HabitContainer from "@/components/dashboard/HabitContainer"
import DayStats from "@/components/dashboard/DayStats"
import RefreshPage from "@/components/RefreshPage"

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

  const millisecondsToMidnight = searchParams["date"]
    ? 0
    : calculateMillisecondsToMidnight(date)

  const data = await getHabits(session?.user.id, date)
  // console.log(data)

  return (
    <HabitsContextProvider habits={data} userId={session?.user.id} date={date}>
      <main className="flex flex-1 gap-6 px-16">
        <HabitContainer date={date} />

        <DayStats />
      </main>
      <RefreshPage milliseconds={millisecondsToMidnight} />
    </HabitsContextProvider>
  )
}
