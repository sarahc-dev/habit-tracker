import { startTransition } from "react"
import { useHabitsContext } from "@/contexts/HabitsContext"
import { OptimisticHabitType } from "@/utils/types"
import { Card, CardContent } from "../ui/card"
import { FiCheckCircle, FiCircle } from "react-icons/fi"
import { checkinHabit } from "@/actions/checkin-habit"
import { uncheckHabit } from "@/actions/uncheck-habit"
import HabitMenu from "./HabitMenu"
import { useToast } from "@/components/ui/use-toast"
import { getLocaleDateISOFormat } from "@/utils/dateUtils"

export default function Habit({ habit }: { habit: OptimisticHabitType }) {
  const { setOptimisticHabits, date } = useHabitsContext()
  const { toast } = useToast()

  const checked = habit.checkins.length === 1

  async function handleCheckin() {
    if (!checked) {
      startTransition(() => {
        setOptimisticHabits({
          action: "editHabit",
          habit: {
            ...habit,
            checkins: [{ id: 1, timestamp: new Date(), habitId: habit.id }],
          },
        })
      })

      try {
        const isToday =
          getLocaleDateISOFormat(date) === getLocaleDateISOFormat(new Date())
        // checks in with timestamp if today
        await checkinHabit(habit.id, isToday ? new Date() : date)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Please try again.",
        })
      }
    }
  }

  async function handleUncheck() {
    if (checked) {
      startTransition(() => {
        setOptimisticHabits({
          action: "undoComplete",
          habit: habit,
        })
      })

      try {
        await uncheckHabit(habit.id, date)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Please try again.",
        })
      }
    }
  }

  return (
    <Card
      role="listitem"
      className={`${checked && "bg-gradient-to-l from-primary to-accent text-secondary-foreground"}`}
      data-testid={habit.id}
    >
      <CardContent className="flex items-center p-0">
        <button
          onClick={handleCheckin}
          className="flex grow items-center gap-3 px-4 text-start"
        >
          {checked ? <FiCheckCircle size="1em" /> : <FiCircle size="1em" />}
          {habit.title}
        </button>
        <HabitMenu
          checked={checked}
          handleCheckin={handleCheckin}
          handleUncheck={handleUncheck}
          habit={habit}
        />
      </CardContent>
    </Card>
  )
}
