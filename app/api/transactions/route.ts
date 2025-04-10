import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../lib/mongodb"
import { Transaction } from "../../../models/transaction"
import { Category } from "../../../models/category"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { type, amount, category, description, date, paymentMethod, tags, location } = await request.json()

    // Validate input
    if (!type || !amount || !category || !description || !date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      return NextResponse.json({ message: "Amount must be a positive number" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Verify category exists and belongs to user
    const categoryDoc = await Category.findOne({
      _id: category,
      userId: session.user.id,
    })

    if (!categoryDoc) {
      return NextResponse.json({ message: "Invalid category" }, { status: 400 })
    }

    // Create new transaction
    const newTransaction = new Transaction({
      userId: session.user.id,
      amount: Number.parseFloat(amount),
      type,
      category,
      description,
      date: new Date(date),
      paymentMethod: paymentMethod || "other",
      tags: tags || [],
      location: location || "",
    })

    await newTransaction.save()

    return NextResponse.json(
      {
        message: "Transaction added successfully",
        transaction: {
          _id: newTransaction._id,
          amount: newTransaction.amount,
          type: newTransaction.type,
          description: newTransaction.description,
          date: newTransaction.date,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ message: "An error occurred while adding the transaction" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const type = searchParams.get("type")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "date"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build query
    const query: any = { userId: session.user.id }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    if (type) {
      query.type = type
    }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Build sort
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    // Get transactions
    const transactions = await Transaction.find(query).sort(sort).skip(skip).limit(limit).populate("category")

    // Get total count for pagination
    const total = await Transaction.countDocuments(query)

    return NextResponse.json({
      transactions,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + transactions.length < total,
      },
    })
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ message: "An error occurred while fetching transactions" }, { status: 500 })
  }
}

