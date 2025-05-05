import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../../lib/mongodb"
import { User } from "../../../../../models/user"
import { authOptions } from "../../../auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

// GET endpoint to fetch user notification settings
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is trying to access their own data
    if (session.user.id !== params.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Connect to database
    await connectToDatabase()

    // Find user
    const user = await User.findById(params.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return notification settings
    return NextResponse.json({
      notifications: user.preferences?.notifications || {
        budgetAlerts: true,
        weeklyReports: true,
        monthlyReports: false,
        transactionAlerts: true,
        savingsGoalAlerts: true,
        accountActivityAlerts: true,
      }
    })
  } catch (error) {
    console.error("Error fetching notification settings:", error)
    return NextResponse.json(
      { message: "An error occurred while fetching notification settings" },
      { status: 500 }
    )
  }
}

// PUT endpoint to update user notification settings
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is trying to update their own data
    if (session.user.id !== params.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get notification settings from request body
    const notificationSettings = await request.json()

    // Connect to database
    await connectToDatabase()

    // Find and update user
    const user = await User.findById(params.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Initialize preferences if they don't exist
    if (!user.preferences) {
      user.preferences = {}
    }

    // Update notification settings
    user.preferences.notifications = {
      budgetAlerts: notificationSettings.budgetAlerts ?? true,
      weeklyReports: notificationSettings.weeklyReports ?? true,
      monthlyReports: notificationSettings.monthlyReports ?? false,
      transactionAlerts: notificationSettings.transactionAlerts ?? true,
      savingsGoalAlerts: notificationSettings.savingsGoalAlerts ?? true,
      accountActivityAlerts: notificationSettings.accountActivityAlerts ?? true,
    }

    // Save user
    await user.save()

    // Return updated notification settings
    return NextResponse.json({
      message: "Notification settings updated successfully",
      notifications: user.preferences.notifications
    })
  } catch (error) {
    console.error("Error updating notification settings:", error)
    return NextResponse.json(
      { message: "An error occurred while updating notification settings" },
      { status: 500 }
    )
  }
}
