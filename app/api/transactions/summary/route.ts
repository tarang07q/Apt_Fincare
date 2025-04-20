import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { authOptions } from "../../auth/[...nextauth]/route"
import { convertCurrency } from "../../../../lib/currency"
import { User } from "../../../../models/user"

export async function GET(request: Request) {
  // Get currency from query parameters
  const { searchParams } = new URL(request.url)
  const currency = searchParams.get("currency") || "USD"
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get 2025 year date range
    const startOfYear = new Date(2025, 0, 1) // January 1, 2025
    const endOfYear = new Date(2025, 11, 31) // December 31, 2025

    // Get income transactions for 2025
    const incomeTransactions = await Transaction.find({
      userId: session.user.id,
      type: "income",
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    })

    // Get expense transactions for 2025
    const expenseTransactions = await Transaction.find({
      userId: session.user.id,
      type: "expense",
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
    })

    // Calculate totals in USD
    const totalIncomeUSD = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    const totalExpensesUSD = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    const balanceUSD = totalIncomeUSD - totalExpensesUSD

    // Convert to requested currency
    const totalIncome = convertCurrency(totalIncomeUSD, currency)
    const totalExpenses = convertCurrency(totalExpensesUSD, currency)
    const balance = convertCurrency(balanceUSD, currency)

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      balance,
      currency
    })
  } catch (error) {
    console.error("Summary error:", error)
    return NextResponse.json({ message: "An error occurred while fetching summary" }, { status: 500 })
  }
}

