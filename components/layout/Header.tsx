import Link from "next/link"
import Logo from "../Logo"
import Nav from "./Nav"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 md:px-16">
      <Link href="/">
        <Logo />
      </Link>
      <Nav />
    </header>
  )
}
