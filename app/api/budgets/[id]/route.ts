import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Budget } from "../../../../models/budget"
import { Category } from "../../../../models/category"
import { authOptions } from "../../auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

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

    // Get budget
    const budget = await Budget.findOne({
      _id: params.id,
      userId: session.user.id,
    }).populate("category")

    if (!budget) {
      return NextResponse.json({ message: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json(budget)
  } catch (error) {
    console.error("Budget error:", error)
    return NextResponse.json({ message: "An error occurred while fetching the budget" }, { status: 500 })
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

    const { category, amount, period, alerts, rollover, notes } = await request.json()

    // Validate input
    if (!category || !amount || !period) {
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

    // Find and update budget
    const budget = await Budget.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id,
      },
      {
        category,
        amount: Number.parseFloat(amount),
        period,
        alerts,
        rollover,
        notes,
      },
      { new: true }
    )

    if (!budget) {
      return NextResponse.json({ message: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Budget updated successfully",
      budget: {
        _id: budget._id,
        amount: budget.amount,
        period: budget.period,
      },
    })
  } catch (error) {
    console.error("Budget error:", error)
    return NextResponse.json({ message: "An error occurred while updating the budget" }, { status: 500 })
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

    // Delete budget
    const result = await Budget.deleteOne({
      _id: params.id,
      userId: session.user.id,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Budget deleted successfully" })
  } catch (error) {
    console.error("Budget error:", error)
    return NextResponse.json({ message: "An error occurred while deleting the budget" }, { status: 500 })
  }
}
