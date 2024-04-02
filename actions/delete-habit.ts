"use server"

import db from "@/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { habits } from "@/db/schemas/habits"
import { eq } from "drizzle-orm"

export async function deleteHabit(habitId: number) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  try {
    await db.delete(habits).where(eq(habits.id, habitId))
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Error deleting habit")
  }
  revalidatePath("/dashboard")
}
