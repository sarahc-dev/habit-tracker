import HabitsList from "@/components/dashboard/HabitsList"
import AddHabit from "@/components/dashboard/AddHabit"
import { getNextDate, getPreviousDate, getRelativeDate } from "@/lib/dateUtils"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export default function HabitContainer({ date }: { date: Date }) {
  return (
    <div className="md:w-1/2">
      <HabitsList />
    </div>
  )
}
