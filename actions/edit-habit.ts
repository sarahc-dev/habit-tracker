"use server"

import * as z from "zod"
import db, { habits } from "@/db"
import { revalidatePath } from "next/cache"
import { AddHabitSchema } from "@/lib/schemas"
import { auth } from "@/auth"
import { eq } from "drizzle-orm"

export async function editHabit(
  habitId: number,
  formData: z.infer<typeof AddHabitSchema>
) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  const validatedFields = AddHabitSchema.safeParse(formData)

  if (!validatedFields.success) throw new Error("Invalid fields")

  try {
    await db
      .update(habits)
      .set(validatedFields.data)
      .where(eq(habits.id, habitId))
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Something went wrong")
  }
  revalidatePath("/dashboard")
}
