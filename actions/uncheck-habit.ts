"use server"

import db from "@/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { checkins } from "@/db/schemas/habits"
import { sql } from "drizzle-orm"

export async function uncheckHabit(habitId: number, date: Date) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  try {
    await db.execute(
      sql`DELETE FROM ${checkins} where extract(day from ${checkins.timestamp}) = ${date.getDate()} and ${checkins.habitId} = ${habitId}`
    )
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Error unchecking habit")
  }
  revalidatePath("/dashboard")
}
