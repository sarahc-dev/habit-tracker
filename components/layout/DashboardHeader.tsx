import Logo from "../Logo"
import DashboardNav from "./DashboardNav"
import { auth } from "@/auth"

export default async function DashboardHeader() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <header className="fixed flex h-16 w-full items-center rounded-b-xl bg-card px-6 py-4 shadow max-md:justify-between md:h-[calc(100vh-3rem)] md:w-56 md:flex-col md:rounded-xl md:p-6">
      <Logo />
      <DashboardNav name={session.user.name} avatar={session.user.image} />
    </header>
  )
}
