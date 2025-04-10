"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { format } from "date-fns"
import { Badge } from "../../components/ui/badge"

type Transaction = {
  _id: string
  amount: number
  type: "expense" | "income"
  category: {
    _id: string
    name: string
    icon: string
    color: string
  }
  description: string
  date: string
}

export function RecentTransactions() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions/recent")
        if (!response.ok) {
          throw new Error("Failed to fetch transactions")
        }
        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load recent transactions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [toast])

  // Sample data for development
  const sampleTransactions = [
    {
      _id: "1",
      amount: 120.5,
      type: "expense",
      category: {
        _id: "cat1",
        name: "Groceries",
        icon: "shopping-cart",
        color: "#10b981",
      },
      description: "Weekly grocery shopping",
      date: "2023-04-01T12:00:00Z",
    },
    {
      _id: "2",
      amount: 2500.0,
      type: "income",
      category: {
        _id: "cat2",
        name: "Salary",
        icon: "briefcase",
        color: "#3b82f6",
      },
      description: "Monthly salary",
      date: "2023-04-01T10:00:00Z",
    },
    {
      _id: "3",
      amount: 45.99,
      type: "expense",
      category: {
        _id: "cat3",
        name: "Entertainment",
        icon: "film",
        color: "#f59e0b",
      },
      description: "Movie tickets",
      date: "2023-03-28T18:30:00Z",
    },
    {
      _id: "4",
      amount: 35.0,
      type: "expense",
      category: {
        _id: "cat4",
        name: "Transportation",
        icon: "car",
        color: "#6366f1",
      },
      description: "Fuel",
      date: "2023-03-27T09:15:00Z",
    },
    {
      _id: "5",
      amount: 200.0,
      type: "income",
      category: {
        _id: "cat5",
        name: "Freelance",
        icon: "laptop",
        color: "#8b5cf6",
      },
      description: "Website design project",
      date: "2023-03-25T14:20:00Z",
    },
  ] as Transaction[]

  const data = isLoading || transactions.length === 0 ? sampleTransactions : transactions

  const filteredTransactions = data.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your most recent financial activities</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-muted"></div>
                  <div className="h-3 w-1/4 animate-pulse rounded bg-muted"></div>
                </div>
                <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction._id} className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${transaction.category.color}20` }}
                >
                  {transaction.type === "expense" ? (
                    <ArrowDownIcon className="h-5 w-5 text-rose-500" />
                  ) : (
                    <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {transaction.category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <div className={`font-medium ${transaction.type === "expense" ? "text-rose-500" : "text-emerald-500"}`}>
                  {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
            <div className="pt-4 text-center">
              <Button variant="outline" size="sm">
                View All Transactions
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

