import React from "react"
import '../styles/globals.css'
import {Inter} from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "../components/auth-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FinTrack+ | Financial Management Platform",
  description:
    "Secure financial management platform to track expenses, manage budgets, and achieve your financial goals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

