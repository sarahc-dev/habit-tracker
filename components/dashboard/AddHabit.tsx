"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddHabitForm from "../form/AddHabitForm"

export default function AddHabit() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add Habit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new habit</DialogTitle>
        </DialogHeader>
        <AddHabitForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
