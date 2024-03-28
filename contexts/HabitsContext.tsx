"use client"

import { createContext, useContext, useOptimistic } from "react"
import { HabitType } from "@/lib/types"

type HabitsContextType = {
  optimisticHabits: HabitType[]
  setOptimisticHabits: (action: { action: string; habit: HabitType }) => void
  userId: string
}

export const HabitsContext = createContext<HabitsContextType | undefined>(
  undefined
)

export default function HabitsContextProvider({
  children,
  habits,
  userId,
}: {
  children: React.ReactNode
  habits: HabitType[]
  userId: string
}) {
  const [optimisticHabits, setOptimisticHabits] = useOptimistic(
    habits,
    (state, { action, habit }: { action: string; habit: HabitType }) => {
      switch (action) {
        case "markComplete":
          return state.map((h) => (h.id === habit.id ? habit : h))
        default:
          return [...state, habit]
      }
    }
  )

  return (
    <HabitsContext.Provider
      value={{ optimisticHabits, setOptimisticHabits, userId }}
    >
      {children}
    </HabitsContext.Provider>
  )
}

export function useHabitsContext() {
  const context = useContext(HabitsContext)
  if (context === undefined) {
    throw new Error(
      "useHabitsContext must be used within a HabitsContextProvider"
    )
  }
  return context
}
