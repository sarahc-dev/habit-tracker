"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { signout } from "@/actions/signout"
import { IoExitOutline } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"
import { getGreeting } from "@/utils/dateUtils"
import Avatar from "../dashboard/Avatar"

type DashboardNavProps = {
  name: string | null | undefined
  avatar: string | null | undefined
}

export default function DashboardNav({ name, avatar }: DashboardNavProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop === undefined) return null

  return (
    <>
      {isDesktop ? (
        <>
          <Avatar image={avatar} isDesktop={isDesktop} />
          <p>
            {getGreeting(new Date())}
            <span className={`${!name && "hidden"}`}>
              , {name?.split(" ")[0]}
            </span>
          </p>
          {/* <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Account Settings</Link>
          </nav> */}
          <form action={signout} className="mt-auto">
            <button
              type="submit"
              data-testid="signout"
              className="flex items-center gap-1"
            >
              <IoExitOutline />
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <Avatar image={avatar} isDesktop={isDesktop} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <form action={signout}>
                <button
                  type="submit"
                  data-testid="signout"
                  className="flex items-center gap-1"
                >
                  <IoExitOutline />
                  Sign Out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
