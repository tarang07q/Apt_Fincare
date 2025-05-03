import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { User } from "../../../../models/user"
import { authOptions } from "../[...nextauth]/route"
import { sendAccountActivityAlert } from "../../../../lib/notifications"

export const dynamic = "force-static"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get login details from request body
    const { device, location, time } = await request.json()

    // Connect to database
    await connectToDatabase()

    // Find user
    const user = await User.findById(session.user.id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update last login time
    user.lastLogin = new Date()
    await user.save()

    // Send account activity notification
    try {
      const deviceInfo = device || "Unknown device"
      const locationInfo = location || "Unknown location"
      const timeInfo = time || new Date().toLocaleString()

      await sendAccountActivityAlert(
        session.user.id,
        "New Login Detected",
        `Login from ${deviceInfo} at ${locationInfo} on ${timeInfo}`
      )
    } catch (error) {
      console.error("Failed to send login notification:", error)
      // Don't fail the request if notification fails
    }

    return NextResponse.json({ message: "Login notification sent successfully" })
  } catch (error) {
    console.error("Login notification error:", error)
    return NextResponse.json({ message: "An error occurred while processing login notification" }, { status: 500 })
  }
}
