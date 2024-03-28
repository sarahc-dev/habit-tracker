"use client"

import { startTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useHabitsContext } from "@/contexts/HabitsContext"
import { AddHabitSchema } from "@/lib/schemas"
import { addHabit } from "@/actions/add-habit"
import { useToast } from "@/components/ui/use-toast"

type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>

export default function AddHabitForm({ setOpen }: { setOpen: SetOpenType }) {
  const { setOptimisticHabits, userId } = useHabitsContext()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof AddHabitSchema>>({
    resolver: zodResolver(AddHabitSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof AddHabitSchema>) {
    startTransition(() => {
      setOptimisticHabits({
        action: "add",
        habit: { ...values, id: 0 },
      })
    })

    setOpen(false)
    try {
      await addHabit(userId, values)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit</FormLabel>
              <FormControl>
                <Input {...field} data-testid="habit" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" data-testid="submitAddHabit">
          Add Habit
        </Button>
      </form>
    </Form>
  )
}
