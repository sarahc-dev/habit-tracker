import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { eq } from "drizzle-orm"
import * as userSchema from "./schemas/users"
import * as habitSchema from "./schemas/habits"

let connectionString = process.env.DATABASE_URL

if (
  process.env.VERCEL_ENV === "preview" &&
  process.env.NEXT_PUBLIC_DATABASE_URL
) {
  connectionString = process.env.NEXT_PUBLIC_DATABASE_URL
}

const queryClient = neon(connectionString!)
const db = drizzle(queryClient, { schema: { ...userSchema, ...habitSchema } })

export default db

export const { users } = userSchema
export const { habits } = habitSchema

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}
