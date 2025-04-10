import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Budget } from "../../../../models/budget"
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

    // Get current date
    const now = new Date()

    // Get active budgets for the user
    const budgets = await Budget.find({
      userId: session.user.id,
      isActive: true,
      $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }],
    }).populate("category")

    if (!budgets || budgets.length === 0) {
      return NextResponse.json([])
    }

    // Calculate spent amount for each budget
    const budgetsWithProgress = await Promise.all(
      budgets.map(async (budget) => {
        let dateRange = {}

        // Set date range based on budget period
        switch (budget.period) {
          case "daily":
            dateRange = {
              $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
              $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
            }
            break
          case "weekly":
            const startOfWeek = new Date(now)
            startOfWeek.setDate(now.getDate() - now.getDay())
            startOfWeek.setHours(0, 0, 0, 0)
            const endOfWeek = new Date(startOfWeek)
            endOfWeek.setDate(startOfWeek.getDate() + 6)
            endOfWeek.setHours(23, 59, 59, 999)
            dateRange = {
              $gte: startOfWeek,
              $lte: endOfWeek,
            }
            break
          case "monthly":
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
            dateRange = {
              $gte: startOfMonth,
              $lte: endOfMonth,
            }
            break
          case "quarterly":
            const currentQuarter = Math.floor(now.getMonth() / 3)
            const startOfQuarter = new Date(now.getFullYear(), currentQuarter * 3, 1)
            const endOfQuarter = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0, 23, 59, 59, 999)
            dateRange = {
              $gte: startOfQuarter,
              $lte: endOfQuarter,
            }
            break
          case "yearly":
            const startOfYear = new Date(now.getFullYear(), 0, 1)
            const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
            dateRange = {
              $gte: startOfYear,
              $lte: endOfYear,
            }
            break
        }

        // Get transactions for this category and date range
        const transactions = await Transaction.find({
          userId: session.user.id,
          category: budget.category._id,
          type: "expense",
          date: dateRange,
        })

        // Calculate total spent
        const spent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        // Calculate percentage and status
        const percentage = Math.round((spent / budget.amount) * 100)
        let status = "on-track"

        if (percentage >= 100) {
          status = "over-budget"
        } else if (percentage >= budget.alerts.threshold) {
          status = "warning"
        }

        return {
          ...budget.toObject(),
          spent,
          percentage,
          status,
          remaining: Math.max(0, budget.amount - spent),
        }
      }),
    )

    return NextResponse.json(budgetsWithProgress)
  } catch (error) {
    console.error("Budget progress error:", error)
    return NextResponse.json({ message: "An error occurred while fetching budget progress" }, { status: 500 })
  }
}

