import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()
  return (
    <main className="flex-1 px-16">
      <h1>Dashboard</h1>
      <p>Signed in as: {session?.user?.email}</p>
    </main>
  )
}
