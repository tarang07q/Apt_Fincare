import { NextResponse, NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { compare } from "bcryptjs"; // Use bcryptjs instead of bcrypt
import { Parser } from "json2csv"
import { convertCurrency } from "../../../../lib/currency"

export const dynamic = "force-dynamic"

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

    // Get currency from query parameters or user preferences
    const { searchParams } = new URL(request.url)
    let currency = searchParams.get("currency") || "USD"

    // Connect to database
    await connectToDatabase()

    // If no currency specified, get user's preferred currency
    if (!searchParams.has("currency")) {
      const user = await User.findById(userId)
      if (user?.preferences?.currency) {
        currency = user.preferences.currency
      }
    }

    // Get current date
    const now = new Date()

    // Get timeframe from query parameters (default to 6 months)
    const timeframe = searchParams.get("timeframe") || "6months"

    // Calculate start date based on timeframe
    const startDate = new Date(now)

    if (timeframe === "3months") {
      startDate.setMonth(now.getMonth() - 2) // 3 months including current month
    } else if (timeframe === "6months") {
      startDate.setMonth(now.getMonth() - 5) // 6 months including current month
    } else if (timeframe === "12months") {
      startDate.setMonth(now.getMonth() - 11) // 12 months including current month
    } else {
      // Default to 6 months
      startDate.setMonth(now.getMonth() - 5)
    }

    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    console.log(`Timeframe: ${timeframe}, Start date: ${startDate.toISOString()}, End date: ${now.toISOString()}`)

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Determine number of months based on timeframe
    let numberOfMonths = 6; // Default
    if (timeframe === "3months") {
      numberOfMonths = 3;
    } else if (timeframe === "6months") {
      numberOfMonths = 6;
    } else if (timeframe === "12months") {
      numberOfMonths = 12;
    }

    // Initialize result array with the correct number of months
    const result: TransactionData[] = []
    for (let i = 0; i < numberOfMonths; i++) {
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

    console.log(`Initializing ${numberOfMonths} months of data for timeframe: ${timeframe}`)

    // Get all transactions for the selected timeframe
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: startDate,
        $lte: now,
      },
    })

    console.log(`Found ${transactions.length} transactions for timeframe: ${timeframe}`)

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
      // Ensure income and expenses are valid numbers
      month.income = typeof month.income === 'number' && !isNaN(month.income) ? month.income : 0
      month.expenses = typeof month.expenses === 'number' && !isNaN(month.expenses) ? month.expenses : 0

      // Calculate savings
      month.savings = month.income - month.expenses

      // Calculate savings rate
      month.savingsRate = month.income > 0 ? Math.round((month.savings / month.income) * 100) : 0

      // Round values to 2 decimal places
      month.income = Number(month.income.toFixed(2))
      month.expenses = Number(month.expenses.toFixed(2))
      month.savings = Number(month.savings.toFixed(2))

      // Final validation to ensure no NaN values
      if (isNaN(month.income)) month.income = 0
      if (isNaN(month.expenses)) month.expenses = 0
      if (isNaN(month.savings)) month.savings = 0
      if (isNaN(month.savingsRate)) month.savingsRate = 0
    })

    // Convert all monetary values to the requested currency
    if (currency !== "USD") {
      result.forEach((month: TransactionData) => {
        month.income = Number(convertCurrency(month.income, currency).toFixed(2))
        month.expenses = Number(convertCurrency(month.expenses, currency).toFixed(2))
        month.savings = Number(convertCurrency(month.savings, currency).toFixed(2))
      })
    }

    return NextResponse.json({
      data: result,
      currency: currency
    })
  } catch (error) {
    console.error("Monthly analytics error:", error)
    return NextResponse.json({ message: "An error occurred while fetching monthly analytics" }, { status: 500 })
  }
}

