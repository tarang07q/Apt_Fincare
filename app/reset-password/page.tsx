"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { PiggyBank } from "lucide-react"
import { useToast } from "../../components/ui/use-toast"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400 && data.message.includes("token is invalid")) {
          setTokenError(true)
          throw new Error("Password reset link is invalid or has expired")
        } else {
          throw new Error(data.message || "Failed to reset password")
        }
      }

      setIsReset(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const [tokenError, setTokenError] = useState(false)

  const [maskedEmail, setMaskedEmail] = useState<string>('')
  const [isVerifying, setIsVerifying] = useState<boolean>(true)

  // Check token validity when component mounts
  useEffect(() => {
    if (!token) {
      setTokenError(true)
      setIsVerifying(false)
      return
    }

    // Verify the token with the server
    const verifyToken = async () => {
      try {
        setIsVerifying(true)
        const response = await fetch('/api/auth/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok || !data.valid) {
          setTokenError(true)
          toast({
            title: 'Invalid or Expired Link',
            description: data.message || 'The password reset link is invalid or has expired.',
            variant: 'destructive',
          })
        } else if (data.email) {
          setMaskedEmail(data.email)
        }
      } catch (error) {
        setTokenError(true)
        toast({
          title: 'Verification Error',
          description: 'An error occurred while verifying the reset link.',
          variant: 'destructive',
        })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [token, toast])

  // Show loading state while verifying token
  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PiggyBank className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">FinTrack+</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Verifying Reset Link</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your password reset link...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If no token is provided or token is invalid, show an error
  if (!token || tokenError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PiggyBank className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">FinTrack+</span>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Please request a new password reset link.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link href="/forgot-password">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Request New Reset Link
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-12 dark:from-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">FinTrack+</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-center">
            {!isReset
              ? maskedEmail
                ? `Enter a new password for ${maskedEmail}`
                : "Enter your new password below"
              : "Your password has been reset successfully"}
          </CardDescription>
        </CardHeader>

        {!isReset ? (
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <div className="px-6 py-4">
            <CardContent className="space-y-4">
              <div className="rounded-md bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  Your password has been reset successfully. You will be redirected to the login page shortly.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link href="/login">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Go to Login
                </Button>
              </Link>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  )
}
