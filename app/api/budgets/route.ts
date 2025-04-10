import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../lib/mongodb"
import { Budget } from "../../../models/budget"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get budgets for the user
    const budgets = await Budget.find({
      userId: session.user.id,
    }).populate("category")

    return NextResponse.json(budgets)
  } catch (error) {
    console.error("Budgets error:", error)
    return NextResponse.json({ message: "An error occurred while fetching budgets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { category, amount, period, startDate, endDate, alerts } = await request.json()

    // Validate input
    if (!category || !amount || !period) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if budget already exists for this category and period
    const existingBudget = await Budget.findOne({
      userId: session.user.id,
      category,
      period,
    })

    if (existingBudget) {
      return NextResponse.json({ message: "Budget already exists for this category and period" }, { status: 409 })
    }

    // Create new budget
    const newBudget = new Budget({
      userId: session.user.id,
      category,
      amount: Number.parseFloat(amount),
      period,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      alerts: alerts || {
        enabled: true,
        threshold: 80,
      },
    })

    await newBudget.save()

    return NextResponse.json({ message: "Budget added successfully", budget: newBudget }, { status: 201 })
  } catch (error) {
    console.error("Budget error:", error)
    return NextResponse.json({ message: "An error occurred while adding the budget" }, { status: 500 })
  }
}

