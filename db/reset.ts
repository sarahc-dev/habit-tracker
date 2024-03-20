import { loadEnvConfig } from "@next/env"
import { drizzle } from "drizzle-orm/postgres-js"
import { users } from "./schemas/users"
import { habits } from "./schemas/habits"
import postgres from "postgres"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const resetDb = async () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable not set")
  }

  const queryClient = postgres(connectionString)
  const db = drizzle(queryClient)

  try {
    await db.delete(users)
    await db.delete(habits)

    console.log("Database reset")
    process.exit(0)
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

resetDb()
