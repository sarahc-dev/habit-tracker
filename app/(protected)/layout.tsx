import DashboardHeader from "@/components/layout/DashboardHeader"
import Footer from "@/components/layout/Footer"

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardHeader />
      {children}
      <Footer />
    </>
  )
}
