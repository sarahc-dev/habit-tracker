import Link from "next/link"
import HabitsList from "@/components/dashboard/HabitsList"
import AddHabit from "@/components/dashboard/AddHabit"
import {
  getDateString,
  getNextDate,
  getPreviousDate,
  getRelativeDate,
} from "@/lib/dateUtils"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export default function HabitContainer({ date }: { date: Date }) {
  const currentDate = getDateString(date)
  const relativeDate = getRelativeDate(date)
  return (
    <div className="w-1/2">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard?date=${getPreviousDate(currentDate)}`}>
          <FiArrowLeft />
          <span className="sr-only">Previous day</span>
        </Link>

        <div className="font-bold">{relativeDate}</div>
        <Link href={`/dashboard?date=${getNextDate(currentDate)}`}>
          <FiArrowRight />
          <span className="sr-only">Next day</span>
        </Link>
      </div>

      <HabitsList />
      <AddHabit />
    </div>
  )
}
