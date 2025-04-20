import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../../../lib/mongodb"
import { Transaction } from "../../../../../models/transaction"
import { Budget } from "../../../../../models/budget"
import { Category } from "../../../../../models/category"
import { User } from "../../../../../models/user"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { convertCurrency } from "../../../../../lib/currency"

// Helper function to convert data to CSV
function convertToCSV(data: any[], fields: string[]) {
  try {
    // Create header row
    const header = fields.join(",")

    // Create data rows
    const rows = data.map(item => {
      return fields.map(field => {
        let value;
        try {
          value = field.split(".").reduce((obj, key) => obj?.[key], item);
        } catch (e) {
          value = "";
        }

        // Handle different data types
        if (value === null || value === undefined) return ""
        if (typeof value === "string") return `"${value.replace(/"/g, '""')}"`
        if (value instanceof Date) return `"${value.toISOString()}"`
        if (typeof value === "object") return `"${JSON.stringify(value).replace(/"/g, '""')}"`
        return value
      }).join(",")
    }).join("\n")

    return `${header}\n${rows}`
  } catch (error) {
    console.error("Error converting to CSV:", error);
    return "Error generating CSV";
  }
}

// Helper function to convert data to JSON
function convertToJSON(data: any[]) {
  try {
    return JSON.stringify(data, null, 2)
  } catch (error) {
    console.error("Error converting to JSON:", error);
    return JSON.stringify({ error: "Error generating JSON" });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Extract userId from params
    const userId = params?.userId
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    // Verify authentication
    const session = await getServerSession(authOptions as any)
    if (!session?.user?.id || session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const exportType = searchParams.get("type") || "all"
    const format = searchParams.get("format") || "csv"
    let currency = searchParams.get("currency") || "USD"

    // Connect to database
    await connectToDatabase()

    // Get user's preferred currency if not specified
    if (!searchParams.has("currency")) {
      const user = await User.findById(userId)
      const userCurrency = user?.preferences?.currency
      if (userCurrency) {
        currency = userCurrency
      }
    }

    // Prepare data based on export type
    let data: any = {}
    let contentType: string
    let filename: string

    // Fetch data based on export type
    if (exportType === "all" || exportType === "transactions") {
      const transactions = await Transaction.find({ userId })
        .populate("category")
        .sort({ date: -1 })

      // Convert amounts to the requested currency
      const convertedTransactions = transactions.map(transaction => {
        const convertedAmount = convertCurrency(transaction.amount, currency)
        return {
          ...transaction.toObject(),
          amount: convertedAmount,
          displayCurrency: currency,
          categoryName: transaction.category?.name || "Uncategorized"
        }
      })

      data.transactions = convertedTransactions
    }

    if (exportType === "all" || exportType === "budgets") {
      const budgets = await Budget.find({ userId }).populate("category")

      // Convert amounts to the requested currency
      const convertedBudgets = budgets.map(budget => {
        const convertedAmount = convertCurrency(budget.amount, currency)
        return {
          ...budget.toObject(),
          amount: convertedAmount,
          displayCurrency: currency,
          categoryName: budget.category?.name || "Uncategorized"
        }
      })

      data.budgets = convertedBudgets
    }

    if (exportType === "all" || exportType === "categories") {
      const categories = await Category.find({ userId })
      data.categories = categories
    }

    // Format the data based on the requested format
    let formattedData: string
    if (format === "json") {
      // For JSON, just return the data directly
      formattedData = JSON.stringify(data, null, 2)
      contentType = "application/json"
      filename = `fintrack-export-${exportType}.json`
    } else {
      // For CSV, use a simple approach
      if (exportType === "transactions" && data.transactions?.length > 0) {
        const fields = ["_id", "type", "amount", "description", "date", "category"]
        formattedData = convertToCSV(data.transactions, fields)
      } else if (exportType === "budgets" && data.budgets?.length > 0) {
        const fields = ["_id", "name", "amount", "period", "category", "startDate", "endDate"]
        formattedData = convertToCSV(data.budgets, fields)
      } else if (exportType === "categories" && data.categories?.length > 0) {
        const fields = ["_id", "name", "type", "color", "icon"]
        formattedData = convertToCSV(data.categories, fields)
      } else if (exportType === "all") {
        // For 'all', just return JSON for simplicity
        formattedData = JSON.stringify(data, null, 2)
        contentType = "application/json"
        filename = `fintrack-export-all.json`
        return new NextResponse(formattedData, {
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}"`,
          },
        })
      } else {
        // Default fallback
        formattedData = "No data available for export"
      }

      contentType = "text/csv"
      filename = `fintrack-export-${exportType}.csv`
    }

    // Return the formatted data
    return new NextResponse(formattedData, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json(
      { message: "Failed to export data" },
      { status: 500 }
    )
  }
}
