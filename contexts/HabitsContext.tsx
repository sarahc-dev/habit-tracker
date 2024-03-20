"use client"

import { createContext, useContext, useOptimistic } from "react"
import { HabitType } from "@/lib/types"

type HabitsContextType = {
  optimisticHabits: HabitType[]
  addOptimisticHabit: (habit: HabitType) => void
}

export const HabitsContext = createContext<HabitsContextType | undefined>(
  undefined
)

export default function HabitsContextProvider({
  children,
  habits,
}: {
  children: React.ReactNode
  habits: HabitType[]
}) {
  const [optimisticHabits, addOptimisticHabit] = useOptimistic(
    habits,
    (state: HabitType[], newHabit: HabitType) => {
      return [...state, newHabit]
    }
  )

  return (
    <HabitsContext.Provider value={{ optimisticHabits, addOptimisticHabit }}>
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
