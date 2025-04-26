import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { User } from "../../../../models/user"
import crypto from "crypto"
import { sendAccountActivityAlert } from "../../../../lib/notifications"
import { sendPasswordResetEmail } from "../../../../lib/resend"

// In a real application, you would send an email with a reset link
// For this demo, we'll just simulate the process
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if user exists
    const user = await User.findOne({ email })

    // For security reasons, don't reveal if the user exists or not
    // Always return a success message even if the user doesn't exist

    // In a real application, you would:
    // 1. Generate a reset token
    // 2. Store it in the database with an expiration
    // 3. Send an email with a link containing the token

    if (user) {
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString("hex")

      // Store the token and its expiration (1 hour from now)
      user.resetPasswordToken = resetToken
      user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour
      await user.save()

      // Send the password reset email
      const emailResult = await sendPasswordResetEmail(email, resetToken)

      if (emailResult.success) {
        console.log(`Password reset email sent to ${email}. Preview: ${emailResult.previewUrl || 'N/A'}`)
      } else {
        console.error(`Failed to send password reset email to ${email}:`, emailResult.error)
      }

      // Send notification about password reset request
      try {
        await sendAccountActivityAlert(
          user._id.toString(),
          "Password Reset Requested",
          `A password reset was requested for your account. If this wasn't you, please secure your account.`
        )
      } catch (notificationError) {
        console.error("Failed to send password reset notification:", notificationError)
        // Don't fail the request if notification fails
      }
    }

    // Always return success to prevent email enumeration attacks
    return NextResponse.json({ message: "If an account with that email exists, a password reset link will be sent." })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "An error occurred during the password reset process" }, { status: 500 })
  }
}
