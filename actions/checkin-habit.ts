"use server"

import db from "@/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { checkins } from "@/db/schemas/habits"

export async function checkinHabit(habitId: number, date: Date) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  try {
    await db.insert(checkins).values({ habitId: habitId, timestamp: date })
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Error checking in habit")
  }
  revalidatePath("/dashboard")
}
