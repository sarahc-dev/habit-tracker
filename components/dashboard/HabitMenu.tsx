import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FiCheck } from "react-icons/fi"
import { CiUndo, CiEdit } from "react-icons/ci"
import { GoGraph } from "react-icons/go"

type HabitMenuProps = {
  checked: boolean
  handleCheckin: () => void
  handleUncheck: () => void
}

export default function HabitMenu({
  checked,
  handleCheckin,
  handleUncheck,
}: HabitMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`border-l p-6 pl-4 ${checked && "border-black border-opacity-40"}`}
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
          <>
            <CiEdit />
            {/* TODO: Open edit habit modal */}
            <span className="ml-2">Edit</span>
          </>
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
  )
}
