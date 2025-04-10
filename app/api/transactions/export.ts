import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "../../../lib/mongodb"
import { Transaction } from "../../../models/transaction"
import { authOptions } from "../auth/[...nextauth]/route"
import { Parser } from "json2csv"

export async function GET() {
  try {
    const session = (await getServerSession(authOptions as any)) as { user: { id: string } }
    const userId = session.user.id
    await connectToDatabase()
    const transactions = await Transaction.find({ userId })
    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(transactions)
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=transactions.csv",
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ message: "An error occurred while exporting transactions" }, { status: 500 })
  }
} 