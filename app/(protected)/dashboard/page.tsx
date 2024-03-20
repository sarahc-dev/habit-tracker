import { auth } from "@/auth"
import { getDateString } from "@/lib/dateUtils"
import HabitsList from "@/components/dashboard/HabitsList"
import AddHabit from "@/components/dashboard/AddHabit"

export default async function Dashboard() {
  const currentDate = getDateString(new Date())
  return (
    <main className="flex-1 px-16">
      <div className="font-bold">{currentDate}</div>
      <HabitsList />
      <AddHabit />
    </main>
  )
}
