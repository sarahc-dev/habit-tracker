"use client"

import { useHabitsContext } from "@/contexts/HabitsContext"
import Habit from "./Habit"

export default function HabitsList() {
  const { optimisticHabits } = useHabitsContext()

  return (
    <div className="lg:w-1/2">
      {optimisticHabits.length === 0 ? (
        <div>You have not added any habits yet.</div>
      ) : (
        <ul aria-label="habits list - click to complete" className="space-y-3">
          {optimisticHabits.map((habit) => (
            <Habit key={habit.id} habit={habit} />
          ))}
        </ul>
      )}
    </div>
  )
}
