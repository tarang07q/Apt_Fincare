import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../../lib/mongodb"
import { User } from "../../../../../models/user"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { compare, hash } from "bcryptjs"
import { sendAccountActivityAlert } from "../../../../../lib/notifications"
import { sendPasswordChangedEmail } from "../../../../../lib/resend"

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is trying to change their own password
    if (session.user.id !== params.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get request body
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Find user by ID
    const user = await User.findById(params.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update password
    user.password = hashedPassword
    await user.save()

    // Send notification about password change
    try {
      // Send in-app notification
      await sendAccountActivityAlert(
        user._id.toString(),
        "Password Changed",
        `Your password has been successfully changed. If you didn't make this change, please contact support immediately.`
      )
      
      // Send email confirmation
      await sendPasswordChangedEmail(user.email)
    } catch (notificationError) {
      console.error("Failed to send password change notification:", notificationError)
      // Don't fail the request if notification fails
    }

    return NextResponse.json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Error changing password:", error)
    return NextResponse.json(
      { message: "An error occurred while changing password" },
      { status: 500 }
    )
  }
}
