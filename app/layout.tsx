import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Habit Tracker",
  description:
    "Build positive habits and achieve your goals with our habit tracker app.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen antialiased ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
