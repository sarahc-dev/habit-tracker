"use server"

import * as z from "zod"
import db, { habits } from "@/db"
import { revalidatePath } from "next/cache"
import { AddHabitSchema } from "@/lib/schemas"
import { auth } from "@/auth"

export async function addHabit(
  userId: string,
  formData: z.infer<typeof AddHabitSchema>
) {
  const session = await auth()
  if (!session?.user)
    throw new Error("You must be signed in to perform this action")

  const validatedFields = AddHabitSchema.safeParse(formData)

  if (!validatedFields.success) throw new Error("Invalid fields")

  try {
    await db.insert(habits).values({ ...validatedFields.data, userId: userId })
  } catch (error) {
    console.error(error)
    revalidatePath("/dashboard")
    throw new Error("Something went wrong")
  }
  revalidatePath("/dashboard")
}
