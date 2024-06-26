import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FiCheck } from "react-icons/fi"
import { CiUndo, CiEdit, CiTrash } from "react-icons/ci"
import { GoGraph } from "react-icons/go"
import EditHabitDialog from "./EditHabitDialog"
import DeleteHabitDialog from "./DeleteHabitDialog"
import { OptimisticHabitType } from "@/lib/types"

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
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`border-l p-4 pl-4 ${checked && "border-white border-opacity-30 text-white"}`}
            data-testid="habitMenu"
          >
            <HiOutlineDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-10">
            <DropdownMenuItem asChild>
              {checked ? (
                <button onClick={handleUncheck} data-testid="uncheckHabit">
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
              <DialogTrigger
                className="flex items-center"
                data-testid="editHabit"
              >
                <CiEdit />
                <span className="ml-2">Edit</span>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger
                className="flex items-center"
                data-testid="deleteHabit"
              >
                <CiTrash />
                <span className="ml-2">Delete</span>
              </AlertDialogTrigger>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
            <>
              <GoGraph />
              <span className="ml-2">View progress</span>
            </>
          </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <EditHabitDialog habit={habit} />
        <DeleteHabitDialog habit={habit} />
      </AlertDialog>
    </Dialog>
  )
}
