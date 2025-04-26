import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../lib/mongodb"
import { Transaction } from "../../../../models/transaction"
import { Category } from "../../../../models/category"
import { authOptions } from "../../auth/[...nextauth]/route"
import { format } from "date-fns"
import { convertCurrency } from "../../../../lib/currency"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(request.url)
    const type = url.searchParams.get("type") || ""
    const category = url.searchParams.get("category") || ""
    const startDate = url.searchParams.get("startDate") || ""
    const endDate = url.searchParams.get("endDate") || ""
    const search = url.searchParams.get("search") || ""
    const currency = url.searchParams.get("currency") || "USD"

    // Connect to database
    await connectToDatabase()

    // Build query
    const query: any = { userId: session.user.id }

    if (type) {
      query.type = type
    }

    if (category && category !== "all") {
      // Find category by name or ID
      let categoryDoc
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        categoryDoc = await Category.findById(category)
      } else {
        categoryDoc = await Category.findOne({ name: category, userId: session.user.id })
      }

      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    // Handle date filtering - allow filtering by either start date, end date, or both
    if (startDate || endDate) {
      query.date = {}

      if (startDate) {
        query.date.$gte = new Date(startDate)
      }

      if (endDate) {
        query.date.$lte = new Date(endDate)
      }
    }

    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ]
    }

    // Fetch transactions
    const transactions = await Transaction.find(query)
      .populate("category")
      .sort({ date: -1 })
      .lean()

    // Convert amounts to the selected currency
    const convertedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const convertedAmount = await convertCurrency(
          transaction.amount,
          transaction.currency || "USD",
          currency
        )

        return {
          id: transaction._id.toString(),
          date: format(new Date(transaction.date), "yyyy-MM-dd"),
          description: transaction.description,
          amount: convertedAmount,
          currency,
          type: transaction.type,
          category: transaction.category?.name || "Uncategorized",
          notes: transaction.notes || "",
        }
      })
    )

    // Convert to CSV
    const headers = ["ID", "Date", "Description", "Amount", "Currency", "Type", "Category", "Notes"]
    const csvRows = [
      headers.join(","),
      ...convertedTransactions.map((t) => {
        return [
          t.id,
          t.date,
          `"${t.description.replace(/"/g, '""')}"`, // Escape quotes in CSV
          t.amount,
          t.currency,
          t.type,
          `"${t.category.replace(/"/g, '""')}"`,
          `"${(t.notes || "").replace(/"/g, '""')}"`,
        ].join(",")
      }),
    ]

    const csv = csvRows.join("\n")

    // Set headers for file download
    const headers2 = new Headers()
    headers2.set("Content-Type", "text/csv")
    headers2.set("Content-Disposition", `attachment; filename="transactions-${format(new Date(), "yyyy-MM-dd")}.csv"`)

    return new NextResponse(csv, {
      status: 200,
      headers: headers2,
    })
  } catch (error) {
    console.error("Error exporting transactions:", error)
    return NextResponse.json(
      { message: "An error occurred while exporting transactions" },
      { status: 500 }
    )
  }
}
