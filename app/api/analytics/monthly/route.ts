import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { authOptions } from "../../auth/[...nextauth]/route"
import { compare } from "bcryptjs"; // Use bcryptjs instead of bcrypt
import { Parser } from "json2csv"

interface TransactionData {
  name: string
  month: number
  year: number
  income: number
  expenses: number
  savings?: number
  savingsRate?: number
}

// Define a type for the session user
interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

// Define a type for the session
interface Session {
  user?: SessionUser
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  if (url.pathname === "/api/transactions/export") {
    try {
      const session = await getServerSession(authOptions as any)
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }
      await connectToDatabase()
      const transactions = await Transaction.find({ userId: session.user.id })
      const json2csvParser = new Parser()
      const csv = json2csvParser.parse(transactions)
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=transactions.csv",
        },
      })
    } catch (error) {
      console.error("Export error:", error)
      return NextResponse.json({ message: "An error occurred while exporting transactions" }, { status: 500 })
    }
  }

  try {
    const session = (await getServerSession(authOptions as any)) as { user?: { id: string } }
    const userId = session.user?.id

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get current date
    const now = new Date()

    // Calculate start date (6 months ago)
    const startDate = new Date(now)
    startDate.setMonth(now.getMonth() - 5)
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Initialize result array with past 6 months
    const result: TransactionData[] = []
    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate)
      date.setMonth(startDate.getMonth() + i)
      result.push({
        name: monthNames[date.getMonth()],
        month: date.getMonth(),
        year: date.getFullYear(),
        income: 0,
        expenses: 0,
      })
    }

    // Get all transactions for the past 6 months
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: startDate,
        $lte: now,
      },
    })

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(result)
    }

    // Calculate monthly totals
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)
      const month = transactionDate.getMonth()
      const year = transactionDate.getFullYear()

      const monthData = result.find((item) => item.month === month && item.year === year)

      if (monthData) {
        if (transaction.type === "income") {
          monthData.income += transaction.amount
        } else if (transaction.type === "expense") {
          monthData.expenses += transaction.amount
        }
      }
    })

    // Calculate savings and percentages
    result.forEach((month: TransactionData) => {
      month.savings = month.income - month.expenses
      month.savingsRate = month.income > 0 ? Math.round((month.savings / month.income) * 100) : 0

      // Round values to 2 decimal places
      month.income = Number.parseFloat(month.income.toFixed(2))
      month.expenses = Number.parseFloat(month.expenses.toFixed(2))
      month.savings = Number.parseFloat(month.savings.toFixed(2))
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Monthly analytics error:", error)
    return NextResponse.json({ message: "An error occurred while fetching monthly analytics" }, { status: 500 })
  }
}

