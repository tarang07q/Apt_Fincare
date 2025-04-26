
"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { useToast } from "../../../components/ui/use-toast"
import { format } from "date-fns"
import {
  Download,
  Filter,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  FlipHorizontalIcon as SwitchHorizontal,
} from "lucide-react"
import { ThreeDIcon } from "../../../components/ui/3d-icon"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useCurrencyContext } from "../../../components/currency-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { AddTransactionForm } from "../../../components/transactions/add-transaction-form"
import { TransactionList } from "../../../components/transactions/transaction-list"
import { TransactionFilters } from "../../../components/transactions/transaction-filters"


// Define a type for filters
interface Filter {
  type: string
  category: string
  startDate: string
  endDate: string
  search: string
  sortBy: string
  sortOrder: string
}

export default function TransactionsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currency } = useCurrencyContext()

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    skip: 0,
    hasMore: false,
  })

  // Fix type declarations
  const [filters, setFilters] = useState<Filter>({
    type: searchParams?.get("type") || "",
    category: searchParams?.get("category") || "",
    startDate: searchParams?.get("startDate") || "",
    endDate: searchParams?.get("endDate") || "",
    search: searchParams?.get("search") || "",
    sortBy: searchParams?.get("sortBy") || "date",
    sortOrder: searchParams?.get("sortOrder") || "desc",
  })

  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchCategories()
    fetchTransactions()
  }, [filters])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const fetchTransactions = async (reset = false) => {
    setIsLoading(true)
    try {
      const skip = reset ? 0 : pagination.skip

      // Build query string from filters
      const params = new URLSearchParams()
      params.append("limit", pagination.limit.toString())
      params.append("skip", skip.toString())

      if (filters.type) params.append("type", filters.type)
      if (filters.category && filters.category !== 'all') params.append("category", filters.category)
      if (filters.startDate) params.append("startDate", filters.startDate)
      if (filters.endDate) params.append("endDate", filters.endDate)
      if (filters.search) params.append("search", filters.search)
      params.append("sortBy", filters.sortBy)
      params.append("sortOrder", filters.sortOrder)

      const response = await fetch(`/api/transactions?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }

      const data = await response.json()

      if (reset || skip === 0) {
        setTransactions(data.transactions)
      } else {
        setTransactions((prev) => [...prev, ...data.transactions])
      }

      setPagination(data.pagination)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<Filter>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))

    // Reset pagination when filters change
    setPagination((prev) => ({
      ...prev,
      skip: 0,
    }))
  }

  const handleTabChange = (value: any) => {
    setActiveTab(value)

    if (value === "all") {
      handleFilterChange({ type: "" })
    } else {
      handleFilterChange({ type: value })
    }
  }

  const handleLoadMore = async () => {
    const newSkip = pagination.skip + pagination.limit

    // Build query string from filters
    const params = new URLSearchParams()
    params.append("limit", pagination.limit.toString())
    params.append("skip", newSkip.toString())

    if (filters.type) params.append("type", filters.type)
    if (filters.category && filters.category !== 'all') params.append("category", filters.category)
    if (filters.startDate) params.append("startDate", filters.startDate)
    if (filters.endDate) params.append("endDate", filters.endDate)
    if (filters.search) params.append("search", filters.search)
    params.append("sortBy", filters.sortBy)
    params.append("sortOrder", filters.sortOrder)

    setIsLoading(true)
    try {
      const response = await fetch(`/api/transactions?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch more transactions")
      }

      const data = await response.json()

      // Append new transactions to existing ones
      setTransactions((prev) => [...prev, ...data.transactions])

      // Update pagination
      setPagination({
        ...data.pagination,
        skip: newSkip
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load more transactions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchTransactions(true)
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      toast({
        title: "Exporting transactions",
        description: "Your transactions are being exported to CSV",
      })

      // Build query string from filters
      const params = new URLSearchParams()
      if (filters.type) params.append("type", filters.type)
      if (filters.category && filters.category !== 'all') params.append("category", filters.category)
      if (filters.startDate) params.append("startDate", filters.startDate)
      if (filters.endDate) params.append("endDate", filters.endDate)
      if (filters.search) params.append("search", filters.search)

      // Add currency parameter
      params.append("currency", currency)

      const response = await fetch(`/api/transactions/export?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to export transactions")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url

      // Include date range in filename if filters are applied
      let filename = "transactions"
      if (filters.startDate) {
        const start = new Date(filters.startDate)
        filename += `-from-${format(start, "yyyy-MM-dd")}`
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate)
        filename += `-to-${format(end, "yyyy-MM-dd")}`
      }
      if (!filters.startDate && !filters.endDate) {
        filename += `-${format(new Date(), "yyyy-MM-dd")}`
      }

      a.download = `${filename}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export successful",
        description: "Your transactions have been exported to CSV",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export transactions",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Export functionality is handled by handleExport

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Manage and track your financial transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>
              <AddTransactionForm
                onSuccess={() => {
                  setIsAddTransactionOpen(false)
                  fetchTransactions(true)
                }}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>

          <Button variant="outline" size="icon" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="sr-only">Export</span>
          </Button>

          <Button
            variant={isFiltersVisible ? "default" : "outline"}
            size="icon"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                />
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="expense">Expenses</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          {isFiltersVisible && (
            <CardContent className="pb-3 pt-0">
              <TransactionFilters filters={filters} onFilterChange={handleFilterChange} categories={categories} />
            </CardContent>
          )}
        </Card>

        <Card>
          <CardContent className="p-0">
            <TransactionList transactions={transactions} isLoading={isLoading} onRefresh={handleRefresh} />

            {pagination.hasMore && (
              <div className="flex justify-center p-4 border-t">
                <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}

            {!isLoading && transactions.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-2">
                  <ThreeDIcon icon="solar:card-recive-bold-duotone" size={64} color="#6366f1" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No transactions found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  No transactions match your current filters. Try changing your search or filters, or add a new
                  transaction.
                </p>
                <Button className="mt-4" onClick={() => setIsAddTransactionOpen(true)}>
                  Add Transaction
                </Button>
              </div>
            )}
          </CardContent>
        </Card>


      </div>
    </div>
  )
}

