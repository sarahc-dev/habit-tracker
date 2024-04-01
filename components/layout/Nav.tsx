"use client"

import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "../ui/drawer"
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"

const NavLinks = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/about",
    title: "About",
  },
  {
    link: "/login",
    title: "Login",
  },
  {
    link: "/signup",
    title: "Signup",
  },
]

export default function Nav() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop === undefined) return null

  return isDesktop ? (
    <nav className="space-x-4">
      {NavLinks.map((navLink) => (
        <Link
          key={navLink.title}
          href={navLink.link}
          className="inline-block decoration-primary underline-offset-4 transition-all hover:scale-110 hover:underline"
        >
          {navLink.title}
        </Link>
      ))}
    </nav>
  ) : (
    <Drawer direction="right">
      <DrawerTrigger>
        <HamburgerMenuIcon height="1.5em" width="1.5em" />
      </DrawerTrigger>
      <DrawerContent className="px-6">
        <DrawerHeader className="px-0 py-6">
          <DrawerClose aria-label="close menu" className="ml-auto">
            <Cross1Icon height="1.5em" width="1.5em" />
          </DrawerClose>
        </DrawerHeader>
        <nav className="flex flex-col gap-4 text-end">
          {NavLinks.map((navLink) => (
            <DrawerClose asChild key={navLink.title}>
              <Link href={navLink.link}>{navLink.title}</Link>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
