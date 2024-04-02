import { startTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
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
import { editHabit } from "@/actions/edit-habit"
import { useToast } from "@/components/ui/use-toast"
import { OptimisticHabitType } from "@/lib/types"

export default function EditHabitDialog({
  habit,
}: {
  habit: OptimisticHabitType
}) {
  const { setOptimisticHabits } = useHabitsContext()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof AddHabitSchema>>({
    resolver: zodResolver(AddHabitSchema),
    defaultValues: {
      title: habit.title,
    },
  })

  async function onSubmit(values: z.infer<typeof AddHabitSchema>) {
    startTransition(() => {
      setOptimisticHabits({
        action: "editHabit",
        habit: { ...values, id: habit.id, checkins: habit.checkins },
      })
    })

    try {
      await editHabit(habit.id, values)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      })
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit habit</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habit</FormLabel>
                <FormControl>
                  <Input {...field} data-testid="editHabit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button type="submit" data-testid="submitEditHabit">
              Edit Habit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  )
}
