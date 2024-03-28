import { defineConfig } from "drizzle-kit"
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd())

export default defineConfig({
  schema: "./db/schemas/",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
})
