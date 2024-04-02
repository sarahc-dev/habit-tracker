"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { FiCalendar } from "react-icons/fi"
import { getLocaleDateISOFormat } from "@/lib/dateUtils"

export default function CalendarPicker() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get("date")
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <button>
          <FiCalendar size="1.4em" />
          <span className="sr-only">Calendar</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(date) => {
            const ISODate = getLocaleDateISOFormat(date!)
            router.push(`/dashboard?date=${ISODate}`)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
