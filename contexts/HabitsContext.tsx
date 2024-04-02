"use client"

import { createContext, useContext, useOptimistic } from "react"
import { OptimisticHabitType } from "@/utils/types"

type HabitsContextType = {
  optimisticHabits: OptimisticHabitType[]
  setOptimisticHabits: (action: {
    action: string
    habit: OptimisticHabitType
  }) => void
  userId: string
  date: Date
}

export const HabitsContext = createContext<HabitsContextType | undefined>(
  undefined
)

export default function HabitsContextProvider({
  children,
  habits,
  userId,
  date,
}: {
  children: React.ReactNode
  habits: OptimisticHabitType[]
  userId: string
  date: Date
}) {
  const [optimisticHabits, setOptimisticHabits] = useOptimistic(
    habits,
    (
      state,
      { action, habit }: { action: string; habit: OptimisticHabitType }
    ) => {
      switch (action) {
        case "markComplete":
          return state.map((h) => (h.id === habit.id ? habit : h))
        case "undoComplete":
          return state.map((h) =>
            h.id === habit.id ? { ...h, checkins: [] } : h
          )
        default:
          return [...state, habit]
      }
    }
  )

  return (
    <HabitsContext.Provider
      value={{ optimisticHabits, setOptimisticHabits, userId, date }}
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
