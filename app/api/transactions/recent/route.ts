import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get recent transactions
    const transactions = await Transaction.find({
      userId: session.user.id,
    })
      .sort({ date: -1 })
      .limit(10)
      .populate("category")

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Recent transactions error:", error)
    return NextResponse.json({ message: "An error occurred while fetching recent transactions" }, { status: 500 })
  }
}

