import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { eq } from "drizzle-orm"
import { users } from "./schemas/users"

const queryClient = neon(process.env.DATABASE_URL!)
const db = drizzle(queryClient)

export default db

export { users }

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}
