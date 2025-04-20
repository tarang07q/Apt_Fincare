import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { Category } from "../../../../models/category"
import { User } from "../../../../models/user"
import { authOptions } from "../../auth/[...nextauth]/route"
import { convertCurrency, convertToUSD } from "../../../../lib/currency"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get user's preferred currency
    const user = await User.findById(session.user.id)
    const userCurrency = user?.preferences?.currency || "USD"

    // Get currency from query parameters
    const { searchParams } = new URL(request.url)
    const currency = searchParams.get("currency") || userCurrency

    // Get transaction
    const transaction = await Transaction.findOne({
      _id: params.id,
      userId: session.user.id,
    }).populate("category")

    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    // Convert transaction amount to the requested currency
    const convertedAmount = convertCurrency(transaction.amount, currency)
    const convertedTransaction = {
      ...transaction.toObject(),
      amount: convertedAmount,
      displayCurrency: currency
    }

    return NextResponse.json(convertedTransaction)
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ message: "An error occurred while fetching the transaction" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get user's preferred currency
    await connectToDatabase()
    const user = await User.findById(session.user.id)
    const userCurrency = user?.preferences?.currency || "USD"

    const { type, amount, category, description, date, paymentMethod, tags, location, currency = userCurrency } = await request.json()

    // Validate input
    if (!type || !amount || !category || !description || !date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      return NextResponse.json({ message: "Amount must be a positive number" }, { status: 400 })
    }

    // Verify category exists and belongs to user
    const categoryDoc = await Category.findOne({
      _id: category,
      userId: session.user.id,
    })

    if (!categoryDoc) {
      return NextResponse.json({ message: "Invalid category" }, { status: 400 })
    }

    // Convert amount to USD for storage
    const amountUSD = convertToUSD(Number.parseFloat(amount), currency)

    // Find and update transaction
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id,
      },
      {
        amount: amountUSD,
        type,
        category,
        description,
        date: new Date(date),
        paymentMethod: paymentMethod || "other",
        tags: tags || [],
        location: location || "",
        originalCurrency: currency,
        originalAmount: Number.parseFloat(amount),
      },
      { new: true }
    )

    if (!transaction) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Transaction updated successfully",
      transaction: {
        _id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description,
        date: transaction.date,
      },
    })
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ message: "An error occurred while updating the transaction" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Delete transaction
    const result = await Transaction.deleteOne({
      _id: params.id,
      userId: session.user.id,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ message: "An error occurred while deleting the transaction" }, { status: 500 })
  }
}
