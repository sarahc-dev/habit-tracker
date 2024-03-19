import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const fontSans = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

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
      <body
        className={cn(
          "flex min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
