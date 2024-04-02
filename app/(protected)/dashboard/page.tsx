import HabitsContextProvider from "@/contexts/HabitsContext"
import { auth } from "@/auth"
import { getHabits } from "@/db/queries/getHabits"
import { calculateMillisecondsToMidnight } from "@/utils/dateUtils"
import HabitsHeader from "@/components/dashboard/HabitsHeader"
import HabitsList from "@/components/dashboard/HabitsList"
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
      <main className="mt-16 flex-1 px-6 md:ml-56 md:mt-0 md:pr-10 xl:pr-16">
        <HabitsHeader date={date} />
        <div className="flex flex-col gap-6 lg:flex-row">
          <HabitsList />
          <DayStats />
        </div>
      </main>
      <RefreshPage milliseconds={millisecondsToMidnight} />
    </HabitsContextProvider>
  )
}
