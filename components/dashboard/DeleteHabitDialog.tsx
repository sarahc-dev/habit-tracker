import { startTransition } from "react"
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useHabitsContext } from "@/contexts/HabitsContext"
import { useToast } from "@/components/ui/use-toast"
import { deleteHabit } from "@/actions/delete-habit"
import { OptimisticHabitType } from "@/lib/types"

export default function DeleteHabitDialog({
  habit,
}: {
  habit: OptimisticHabitType
}) {
  const { setOptimisticHabits } = useHabitsContext()
  const { toast } = useToast()

  async function handleDelete() {
    startTransition(() => {
      setOptimisticHabits({
        action: "deleteHabit",
        habit: habit,
      })
    })

    try {
      await deleteHabit(habit.id)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      })
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this habit
          and all historical tracking.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="hover:bg-foreground hover:text-primary-foreground">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="bg-destructive hover:bg-destructive/70"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
