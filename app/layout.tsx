import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cn } from "@/utils/utils"
import "./globals.css"

const fontSans = Nunito_Sans({
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
          "flex min-h-screen flex-col font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
