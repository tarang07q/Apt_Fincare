"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

// This provider wraps the app with SessionProvider for authentication
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // For static export, we still use SessionProvider but it will use client-side auth
  return <SessionProvider>{children}</SessionProvider>
}
