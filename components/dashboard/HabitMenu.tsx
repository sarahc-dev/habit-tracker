import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FiCheck } from "react-icons/fi"
import { CiUndo, CiEdit } from "react-icons/ci"
import { GoGraph } from "react-icons/go"
import EditHabitDialogContent from "./EditHabitDialog"
import { OptimisticHabitType } from "@/utils/types"

type HabitMenuProps = {
  checked: boolean
  handleCheckin: () => void
  handleUncheck: () => void
  habit: OptimisticHabitType
}

export default function HabitMenu({
  checked,
  handleCheckin,
  handleUncheck,
  habit,
}: HabitMenuProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`border-l p-4 pl-4 ${checked && "border-white border-opacity-30 text-white"}`}
        >
          <HiOutlineDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-10">
          <DropdownMenuItem asChild>
            {checked ? (
              <button onClick={handleUncheck}>
                <CiUndo />
                <span className="ml-2">Undo completed</span>
              </button>
            ) : (
              <button onClick={handleCheckin}>
                <FiCheck />
                <span className="ml-2">Mark as complete</span>
              </button>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger className="flex items-center">
              <CiEdit />
              <span className="ml-2">Edit</span>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <>
              <GoGraph />
              {/* TODO: Show habit progress */}
              <span className="ml-2">View progress</span>
            </>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditHabitDialogContent habit={habit} />
    </Dialog>
  )
}
