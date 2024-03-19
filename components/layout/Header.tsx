import Link from "next/link"
import Logo from "../Logo"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-16 py-6">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="space-x-3">
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>
    </header>
  )
}
