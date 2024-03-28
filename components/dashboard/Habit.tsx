import { startTransition } from "react"
import { useHabitsContext } from "@/contexts/HabitsContext"
import { HabitType } from "@/lib/types"
import { Card, CardContent } from "../ui/card"
import { FiCheckCircle, FiCircle } from "react-icons/fi"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { checkinHabit } from "@/actions/checkin-habit"
import { useToast } from "@/components/ui/use-toast"

export default function Habit({ habit }: { habit: HabitType }) {
  const { setOptimisticHabits } = useHabitsContext()
  const { toast } = useToast()

  const checked = habit.checkins?.length === 1

  async function handleCheckin() {
    if (!checked) {
      startTransition(() => {
        setOptimisticHabits({
          action: "markComplete",
          habit: {
            ...habit,
            checkins: [{ id: 1, timestamp: new Date(), habitId: habit.id }],
          },
        })
      })

      try {
        // TODO: change date
        await checkinHabit(habit.id, new Date())
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
      className={`w-1/3 ${checked && "bg-secondary"}`}
      data-testid={habit.id}
    >
      <CardContent className="flex items-center p-0">
        <button
          onClick={handleCheckin}
          className="flex grow items-center gap-3 p-4 text-start"
        >
          {checked ? <FiCheckCircle size="1em" /> : <FiCircle size="1em" />}
          {habit.title}
        </button>
        <button
          className={`border-l p-6 pl-4 ${checked && "border-black border-opacity-40"}`}
        >
          <HiOutlineDotsVertical />
        </button>
      </CardContent>
    </Card>
  )
}
