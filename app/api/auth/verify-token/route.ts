import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { User } from "../../../../models/user"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, message: "Token is required" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Find the user with the matching reset token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({
        valid: false,
        message: "Password reset token is invalid or has expired"
      })
    }

    // Token is valid
    return NextResponse.json({
      valid: true,
      message: "Token is valid",
      email: user.email.replace(/(.{2})(.*)(?=@)/, function(_, a, b) {
        return a + b.replace(/./g, '*');
      })
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({
      valid: false,
      message: "An error occurred during token verification"
    }, { status: 500 })
  }
}
