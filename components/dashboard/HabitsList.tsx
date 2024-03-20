"use client"

import { useHabitsContext } from "@/contexts/HabitsContext"

export default function HabitsList() {
  const { optimisticHabits } = useHabitsContext()
  return (
    <div className="my-4">
      {optimisticHabits.length === 0 ? (
        <div>You have not added any habits yet.</div>
      ) : (
        <ul>
          {optimisticHabits.map((habit) => (
            <li key={habit.id} data-testid={habit.id}>
              {habit.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
