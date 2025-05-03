import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Budget } from "../../../../models/budget"
import { Transaction } from "../../../../models/transaction"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { convertCurrency } from "../../../../lib/currency"
import { sendBudgetAlert } from "../../../../lib/notifications"

export const dynamic = "force-static"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get currency from query parameters
    const { searchParams } = new URL(request.url)
    let currency = searchParams.get("currency") || "USD"

    // Connect to database
    await connectToDatabase()

    // If no currency specified, get user's preferred currency
    if (!searchParams.has("currency")) {
      const user = await User.findById(session.user.id)
      if (user?.preferences?.currency) {
        currency = user.preferences.currency
      }
    }

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
        let shouldSendAlert = false

        if (percentage >= 100) {
          status = "over-budget"
          shouldSendAlert = true
        } else if (percentage >= budget.alerts.threshold) {
          status = "warning"
          shouldSendAlert = true
        }

        // Send budget alert if needed
        if (shouldSendAlert && budget.alerts?.enabled !== false) {
          try {
            const budgetName = budget.category.name || 'Budget';
            await sendBudgetAlert(
              session.user.id,
              budgetName,
              spent,
              budget.amount,
              currency
            );
          } catch (alertError) {
            console.error('Failed to send budget alert:', alertError);
            // Don't fail the request if alert fails
          }
        }

        // Calculate remaining budget (can be negative if over budget)
        const remaining = budget.amount - spent

        return {
          ...budget.toObject(),
          spent,
          percentage,
          status,
          remaining,
        }
      }),
    )

    // Convert all monetary values to the requested currency
    if (currency !== "USD") {
      budgetsWithProgress.forEach(budget => {
        budget.amount = Number(convertCurrency(budget.amount, currency).toFixed(2))
        budget.spent = Number(convertCurrency(budget.spent, currency).toFixed(2))
        budget.remaining = Number(convertCurrency(budget.remaining, currency).toFixed(2))
      })
    }

    return NextResponse.json({
      data: budgetsWithProgress,
      currency: currency
    })
  } catch (error) {
    console.error("Budget progress error:", error)
    return NextResponse.json({ message: "An error occurred while fetching budget progress" }, { status: 500 })
  }
}

