"use client"

import type React from "react"
import "./login.css"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../components/ui/card"
import { PiggyBank, ArrowLeft } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("") // Clear any previous errors

    // Basic validation
    if (!email) {
      setErrorMessage("Email is required")
      setIsLoading(false)
      return
    }

    if (!password) {
      setErrorMessage("Password is required")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Parse the error message if available
        const errorMessage = result.error.includes("Error: ")
          ? result.error.split("Error: ")[1]
          : null;

        // Set appropriate error message based on the error
        if (errorMessage) {
          setErrorMessage(errorMessage);
        } else if (result.error === "CredentialsSignin") {
          setErrorMessage("Invalid email or password. Please try again.");
        } else {
          setErrorMessage("Authentication failed. Please try again.");
        }

        toast({
          title: "Login failed",
          description: errorMessage || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back! You've been logged in successfully.",
          variant: "default",
        });
        router.push("/dashboard")
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.")
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100 opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <PiggyBank className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">FinTrack+</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/register">
            <Button variant="outline" size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 z-10">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">FinTrack+</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <CardContent className="space-y-4">
            {errorMessage && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-md" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="flex flex-col space-y-4 mt-4">
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium"
                >
                  Sign up
                </Link>
              </div>
              <Link href="/" className="flex items-center justify-center text-sm text-gray-500 hover:text-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

