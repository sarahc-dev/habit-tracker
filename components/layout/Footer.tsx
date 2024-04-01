import Link from "next/link"

export default function Footer() {
  return (
    <footer className="p-6 md:px-16">
      <p>
        Project by{" "}
        <Link
          href=""
          className="inline-block underline decoration-primary underline-offset-4 transition-all md:hover:mr-1 md:hover:scale-110"
        >
          Sarah
        </Link>
        .
      </p>
    </footer>
  )
}
