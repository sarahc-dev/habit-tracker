"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { FiCalendar } from "react-icons/fi"

export default function CalendarPicker() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get("date")
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <button>
          <FiCalendar />
          <span className="sr-only">Calendar</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(date) => {
            router.push(`/dashboard?date=${date?.toISOString().split("T")[0]}`)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
