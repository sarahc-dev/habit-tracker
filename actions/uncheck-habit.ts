"use server"

import db from "@/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { checkins } from "@/db/schemas/habits"
import { and, eq, gte, lt } from "drizzle-orm"
import { getLocaleDateISOFormat } from "@/utils/dateUtils"

export async function uncheckHabit(habitId: number, date: Date) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  let timezoneOffset = date.getTimezoneOffset()

  const start = new Date(getLocaleDateISOFormat(date))
  start.setMinutes(start.getMinutes() + timezoneOffset)

  const finish = new Date(getLocaleDateISOFormat(date))
  finish.setMinutes(finish.getMinutes() + 1440)
  timezoneOffset = finish.getTimezoneOffset()
  finish.setMinutes(finish.getMinutes() + timezoneOffset)

  try {
    await db
      .delete(checkins)
      .where(
        and(
          eq(checkins.habitId, habitId),
          gte(checkins.timestamp, start),
          lt(checkins.timestamp, finish)
        )
      )
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Error unchecking habit")
  }
  revalidatePath("/dashboard")
}
