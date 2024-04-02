import Link from "next/link"
import { Suspense } from "react"
import {
  getNextDate,
  getPreviousDate,
  getRelativeDate,
} from "@/utils/dateUtils"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import AddHabit from "./AddHabit"
import CalendarPicker from "../dashboard/CalendarPicker"

export default function HabitsHeader({ date }: { date: Date }) {
  const relativeDate = getRelativeDate(date)
  return (
    <div className="my-4 flex justify-between gap-5 md:mt-5">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard?date=${getPreviousDate(date)}`}>
          <FiArrowLeft />
          <span className="sr-only">Previous day</span>
        </Link>

        <div className="font-bold">{relativeDate}</div>
        <Link href={`/dashboard?date=${getNextDate(date)}`}>
          <FiArrowRight />
          <span className="sr-only">Next day</span>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <Suspense>
          <CalendarPicker />
        </Suspense>
        <AddHabit />
      </div>
    </div>
  )
}
