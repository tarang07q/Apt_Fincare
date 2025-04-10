import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { Category } from "../../../../models/category"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get current month date range
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Get all expense categories
    const categories = await Category.find({
      userId: session.user.id,
      type: "expense",
    })

    // Get all expense transactions for the current month
    const transactions = await Transaction.find({
      userId: session.user.id,
      type: "expense",
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).populate("category")

    // Calculate total for each category
    const categoryTotals = categories.map((category) => {
      const categoryTransactions = transactions.filter(
        (transaction) => transaction.category && transaction.category._id.toString() === category._id.toString(),
      )

      const total = categoryTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

      return {
        name: category.name,
        value: total,
        color: category.color,
      }
    })

    // Filter out categories with zero spending
    const result = categoryTotals.filter((category) => category.value > 0)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Category analytics error:", error)
    return NextResponse.json({ message: "An error occurred while fetching category analytics" }, { status: 500 })
  }
}

