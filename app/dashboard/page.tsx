"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Overview } from "../../components/dashboard/overview"
import { RecentTransactions } from "../../components/dashboard/recent-transactions"
import { BudgetProgress } from "../../components/dashboard/budget-progress"
import { useSession } from "next-auth/react"
import { useToast } from "../../components/ui/use-toast"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  })

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/transactions/summary")
        if (!response.ok) {
          throw new Error("Failed to fetch summary data")
        }
        const data = await response.json()
        setSummary(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load financial summary",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [toast])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {session?.user?.name}! Here's an overview of your finances.</p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${summary.balance.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">Your current financial balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${summary.totalIncome.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total income this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${summary.totalExpenses.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total expenses this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budget Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <RecentTransactions />
        </TabsContent>
        <TabsContent value="budgets" className="space-y-4">
          <BudgetProgress />
        </TabsContent>
      </Tabs>
    </div>
  )
}

