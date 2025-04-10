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

    // Get current month date range
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // Get income transactions for current month
    const incomeTransactions = await Transaction.find({
      userId: session.user.id,
      type: "income",
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })

    // Get expense transactions for current month
    const expenseTransactions = await Transaction.find({
      userId: session.user.id,
      type: "expense",
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })

    // Calculate totals
    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

    const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

    const balance = totalIncome - totalExpenses

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      balance,
    })
  } catch (error) {
    console.error("Summary error:", error)
    return NextResponse.json({ message: "An error occurred while fetching summary" }, { status: 500 })
  }
}

