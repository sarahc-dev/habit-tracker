import { loadEnvConfig } from "@next/env"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const migrateDb = async () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable not set")
  }

  const migrationClient = postgres(connectionString, { max: 1 })
  const db = drizzle(migrationClient)

  try {
    await migrate(db, { migrationsFolder: "drizzle" })
    await migrationClient.end()

    console.log("Migration successful")
    process.exit(0)
  } catch (error) {
    console.error(error)
    await migrationClient.end()

    process.exit(1)
  }
}

migrateDb()
