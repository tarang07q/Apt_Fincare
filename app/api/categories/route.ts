import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../lib/mongodb"
import { Category } from "../../../models/category"
import { authOptions } from "../auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    // Get categories for the user
    const categories = await Category.find({
      userId: session.user.id,
    }).sort({ name: 1 })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Categories error:", error)
    return NextResponse.json({ message: "An error occurred while fetching categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, icon, color, type } = await request.json()

    // Validate input
    if (!name || !type) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if category already exists
    const existingCategory = await Category.findOne({
      userId: session.user.id,
      name,
      type,
    })

    if (existingCategory) {
      return NextResponse.json({ message: "Category already exists" }, { status: 409 })
    }

    // Create new category
    const newCategory = new Category({
      userId: session.user.id,
      name,
      icon: icon || "tag",
      color: color || "#6366f1",
      type,
    })

    await newCategory.save()

    return NextResponse.json({ message: "Category added successfully", category: newCategory }, { status: 201 })
  } catch (error) {
    console.error("Category error:", error)
    return NextResponse.json({ message: "An error occurred while adding the category" }, { status: 500 })
  }
}

