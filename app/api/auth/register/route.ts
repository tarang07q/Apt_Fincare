import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { hash } from "bcryptjs"
import { User } from "../../../../models/user"
import { Category } from "../../../../models/category"

export const dynamic = "force-static"

// Default categories to create for new users
const defaultCategories = [
  { name: "Groceries", icon: "shopping-cart", color: "#10b981", type: "expense", isDefault: true },
  { name: "Rent/Mortgage", icon: "home", color: "#3b82f6", type: "expense", isDefault: true },
  { name: "Utilities", icon: "zap", color: "#f59e0b", type: "expense", isDefault: true },
  { name: "Transportation", icon: "car", color: "#6366f1", type: "expense", isDefault: true },
  { name: "Dining Out", icon: "utensils", color: "#ef4444", type: "expense", isDefault: true },
  { name: "Entertainment", icon: "film", color: "#8b5cf6", type: "expense", isDefault: true },
  { name: "Healthcare", icon: "activity", color: "#ec4899", type: "expense", isDefault: true },
  { name: "Shopping", icon: "shopping-bag", color: "#14b8a6", type: "expense", isDefault: true },
  { name: "Salary", icon: "briefcase", color: "#22c55e", type: "income", isDefault: true },
  { name: "Freelance", icon: "laptop", color: "#3b82f6", type: "income", isDefault: true },
  { name: "Investments", icon: "trending-up", color: "#6366f1", type: "income", isDefault: true },
  { name: "Gifts", icon: "gift", color: "#f59e0b", type: "income", isDefault: true },
]

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: new Date(),
    })

    const savedUser = await newUser.save()

    // Create default categories for the new user
    const categoryPromises = defaultCategories.map((category) => {
      return new Category({
        ...category,
        userId: savedUser._id,
      }).save()
    })

    await Promise.all(categoryPromises)

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}

