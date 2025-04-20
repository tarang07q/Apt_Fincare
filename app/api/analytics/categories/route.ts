import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { Category } from "../../../../models/category"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { convertCurrency } from "../../../../lib/currency"

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

    // Get timeframe from query parameters (default to current month)
    const timeframe = searchParams.get("timeframe") || "month"

    // Calculate start date based on timeframe
    let startDate = new Date(now)

    if (timeframe === "3months") {
      startDate.setMonth(now.getMonth() - 2) // 3 months including current month
    } else if (timeframe === "6months") {
      startDate.setMonth(now.getMonth() - 5) // 6 months including current month
    } else if (timeframe === "12months") {
      startDate.setMonth(now.getMonth() - 11) // 12 months including current month
    } else {
      // Default to current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    console.log(`Categories - Timeframe: ${timeframe}, Start date: ${startDate.toISOString()}, End date: ${now.toISOString()}`)

    // Get all expense categories
    const categories = await Category.find({
      userId: session.user.id,
      type: "expense",
    })

    // Get all expense transactions for the selected timeframe
    const transactions = await Transaction.find({
      userId: session.user.id,
      type: "expense",
      date: {
        $gte: startDate,
        $lte: now,
      },
    }).populate("category")

    console.log(`Categories - Found ${transactions.length} transactions for timeframe: ${timeframe}`)

    // Calculate total for each category
    const categoryTotals = categories.map((category) => {
      const categoryTransactions = transactions.filter(
        (transaction) => transaction.category && transaction.category._id.toString() === category._id.toString(),
      )

      // Calculate total with validation
      let total = 0;
      try {
        total = categoryTransactions.reduce((sum, transaction) => {
          // Ensure amount is a valid number
          const amount = typeof transaction.amount === 'number' && !isNaN(transaction.amount) ? transaction.amount : 0;
          return sum + amount;
        }, 0);

        // Round to 2 decimal places
        total = Number(total.toFixed(2));

        // Final validation
        if (isNaN(total)) total = 0;
      } catch (e) {
        console.error('Error calculating category total:', e);
        total = 0;
      }

      return {
        name: category.name || 'Unnamed Category',
        value: total,
        color: category.color || '#cccccc',
      }
    })

    // Filter out categories with zero spending and ensure we have at least one category
    let result = categoryTotals.filter((category) => category.value > 0)

    // If no categories with spending, return at least one with zero value
    if (result.length === 0 && categoryTotals.length > 0) {
      result = [categoryTotals[0]];
    }

    // If still no categories, create a default one
    if (result.length === 0) {
      result = [{
        name: 'No Expenses',
        value: 0,
        color: '#cccccc'
      }];
    }

    // Convert all monetary values to the requested currency
    if (currency !== "USD") {
      result = result.map(category => ({
        ...category,
        value: Number(convertCurrency(category.value, currency).toFixed(2))
      }))
    }

    return NextResponse.json({
      data: result,
      currency: currency
    })
  } catch (error) {
    console.error("Category analytics error:", error)
    return NextResponse.json({ message: "An error occurred while fetching category analytics" }, { status: 500 })
  }
}

