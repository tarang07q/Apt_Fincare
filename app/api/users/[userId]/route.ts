import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is trying to access their own data
    if (session.user.id !== params.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Connect to database
    await connectToDatabase()

    // Find user by ID
    const user = await User.findById(params.userId).select("-password -resetPasswordToken -resetPasswordExpires")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return user data
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { message: "An error occurred while fetching user data" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is trying to update their own data
    if (session.user.id !== params.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get request body
    const data = await request.json()
    
    // Connect to database
    await connectToDatabase()

    // Find user by ID
    const user = await User.findById(params.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update allowed fields only
    const allowedFields = ["name", "email"]
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        user[field] = data[field]
      }
    }

    // Save updated user
    await user.save()

    // Return updated user data (excluding sensitive fields)
    const updatedUser = await User.findById(params.userId).select("-password -resetPasswordToken -resetPasswordExpires")
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { message: "An error occurred while updating user data" },
      { status: 500 }
    )
  }
}
