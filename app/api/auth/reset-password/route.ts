import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { User } from "../../../../models/user"
import { hash } from "bcryptjs"
import { sendAccountActivityAlert } from "../../../../lib/notifications"
import { sendPasswordChangedEmail } from "../../../../lib/resend"

export const dynamic = "force-static"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Find the user with the matching reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ message: "Password reset token is invalid or has expired" }, { status: 400 })
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10)

    // Update user's password and clear reset token fields
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    // Send notification about password change
    try {
      // Send in-app notification
      await sendAccountActivityAlert(
        user._id.toString(),
        "Password Changed",
        `Your password has been successfully reset. If you didn't make this change, please contact support immediately.`
      )

      // Send email confirmation
      const emailResult = await sendPasswordChangedEmail(user.email)
      if (emailResult.success) {
        console.log(`Password changed email sent to ${user.email}. Preview: ${emailResult.previewUrl || 'N/A'}`)
      } else {
        console.error(`Failed to send password changed email to ${user.email}:`, emailResult.error)
      }
    } catch (notificationError) {
      console.error("Failed to send password change notification:", notificationError)
      // Don't fail the request if notification fails
    }
    return NextResponse.json({ message: "Password has been reset successfully" })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ message: "An error occurred during the password reset process" }, { status: 500 })
  }
}
