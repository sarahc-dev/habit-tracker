import type { Metadata } from "next"
import DashboardHeader from "@/components/layout/DashboardHeader"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Dashboard | Habit Tracker",
}

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}
