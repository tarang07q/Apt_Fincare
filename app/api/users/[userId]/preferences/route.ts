import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../../lib/mongodb"
import { User, getUserModel } from "../../../../../models/user"
import { authOptions } from "../../../auth/[...nextauth]/route"

// GET /api/users/[userId]/preferences
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Extract userId from params
    const userId = params?.userId
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Verify authentication
    const session = await getServerSession(authOptions as any)
    if (!session?.user?.id || session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get user preferences
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return user preferences
    return NextResponse.json({
      currency: user.preferences?.currency || "USD",
      theme: user.preferences?.theme || "system",
      notifications: {
        budgetAlerts: user.preferences?.notifications?.budgetAlerts ?? true,
        weeklyReports: user.preferences?.notifications?.weeklyReports ?? true,
      },
    })
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return NextResponse.json(
      { message: "Failed to fetch user preferences" },
      { status: 500 }
    )
  }
}

// PUT /api/users/[userId]/preferences
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Extract userId from params
    const userId = params?.userId
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Verify authentication
    const session = await getServerSession(authOptions as any)
    if (!session?.user?.id || session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { currency, theme, notifications } = body

    // Connect to database
    await connectToDatabase()

    // Update user preferences
    const user = await User.findByIdAndUpdate(
      userId,
      {
        "preferences.currency": currency,
        "preferences.theme": theme,
        "preferences.notifications.budgetAlerts": notifications?.budgetAlerts,
        "preferences.notifications.weeklyReports": notifications?.weeklyReports,
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return updated preferences
    return NextResponse.json({
      currency: user.preferences?.currency,
      theme: user.preferences?.theme,
      notifications: user.preferences?.notifications,
    })
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return NextResponse.json(
      { message: "Failed to update user preferences" },
      { status: 500 }
    )
  }
}
