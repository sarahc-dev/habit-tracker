import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { migrate } from "drizzle-orm/neon-http/migrator"
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd())

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable not set")
}

const migrationClient = neon(connectionString)
const db = drizzle(migrationClient)

const migrateDb = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" })

    console.log("Migration successful")
    process.exit(0)
  } catch (error) {
    console.error("Error during migration: ", error)
    process.exit(1)
  }
}
migrateDb()
