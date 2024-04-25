import Link from "next/link"

export default function Footer() {
  return (
    <footer className="p-6 md:px-16 md:text-end">
      <p>
        Project by{" "}
        <Link
          href="https://github.com/sarahc-dev"
          className="inline-block underline decoration-primary underline-offset-4"
        >
          Sarah
        </Link>
        .
      </p>
    </footer>
  )
}
