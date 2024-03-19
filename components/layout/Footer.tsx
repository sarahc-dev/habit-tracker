import Link from "next/link"

export default function Footer() {
  return (
    <footer className="px-16 py-6">
      <p>
        Project by{" "}
        <Link
          href=""
          className="decoration-accent underline underline-offset-2"
        >
          Sarah
        </Link>
        .
      </p>
    </footer>
  )
}
