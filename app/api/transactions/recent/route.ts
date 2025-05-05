import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { convertCurrency } from "../../../../lib/currency"

export const dynamic = "force-dynamic"

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

    // Get recent transactions
    const transactions = await Transaction.find({
      userId: session.user.id,
    })
      .sort({ date: -1 })
      .limit(10)
      .populate("category")

    // Convert all monetary values to the requested currency
    const convertedTransactions = transactions.map(transaction => {
      const convertedAmount = convertCurrency(transaction.amount, currency)
      return {
        ...transaction.toObject(),
        amount: Number(convertedAmount.toFixed(2)),
        displayCurrency: currency
      }
    })

    return NextResponse.json({
      transactions: convertedTransactions,
      currency: currency
    })
  } catch (error) {
    console.error("Recent transactions error:", error)
    return NextResponse.json({ message: "An error occurred while fetching recent transactions" }, { status: 500 })
  }
}

