import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { loadEnvConfig } from "@next/env"
import { users } from "./schemas/users"
import { habits } from "./schemas/habits"

loadEnvConfig(process.cwd())

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable not set")
}

const queryClient = neon(connectionString)
const db = drizzle(queryClient)

const resetDb = async () => {
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
