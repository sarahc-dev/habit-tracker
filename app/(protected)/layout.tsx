import type { Metadata } from "next"
import HabitsContextProvider from "@/contexts/HabitsContext"
import DashboardHeader from "@/components/layout/DashboardHeader"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import { auth } from "@/auth"
import { getHabits } from "@/db/queries/getHabits"

export const metadata: Metadata = {
  title: "Dashboard | Habit Tracker",
}

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) return null

  const today = new Date()

  const data = await getHabits(session?.user.id, today)
  console.log(data)
  return (
    <>
      <HabitsContextProvider habits={data} userId={session?.user.id}>
        <DashboardHeader />
        {children}
        <Footer />
        <Toaster />
      </HabitsContextProvider>
    </>
  )
}
