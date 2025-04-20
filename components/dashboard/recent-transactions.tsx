"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { format } from "date-fns"
import { Badge } from "../../components/ui/badge"
import { useCurrency } from "../../hooks/useCurrency"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const { currency, currencySymbol, formatCurrency } = useCurrency()
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch transactions when component mounts or currency changes
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/transactions/recent?currency=${currency}`)
        if (!response.ok) {
          throw new Error("Failed to fetch transactions")
        }
        const result = await response.json()
        setTransactions(result.transactions || [])
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
  }, [currency, toast])

  const filteredTransactions = transactions.filter(
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
                  {transaction.type === "expense" ? "-" : "+"}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
            <div className="pt-4 text-center">
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/transactions')}>
                View All Transactions
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

