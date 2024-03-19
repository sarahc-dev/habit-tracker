import { loadEnvConfig } from "@next/env"
import type { Config } from "drizzle-kit"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export default {
  schema: "db/schemas/",
  out: "drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
