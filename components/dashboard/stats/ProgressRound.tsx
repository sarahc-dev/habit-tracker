"use client"
import ProgressBarRound from "./ProgressBarRound"
import { useHabitsContext } from "@/contexts/HabitsContext"

export default function ProgressRound() {
  const { optimisticHabits } = useHabitsContext()

  const totalHabits = optimisticHabits.length
  const habitsCompleted = optimisticHabits.filter(
    (habit) => habit.checkins.length > 0
  ).length
  const completed = totalHabits
    ? Math.round((habitsCompleted / totalHabits) * 100)
    : 0
  return (
    <div className="relative mx-auto flex h-[160px] w-[160px] items-center justify-center">
      <div className="flex h-[160px] w-[160px] items-center justify-center rounded-full border shadow">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border text-2xl font-bold shadow-inner">
          {completed}%
        </div>
      </div>
      <ProgressBarRound percentComplete={completed} />
    </div>
  )
}
