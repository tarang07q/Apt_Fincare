"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Overview } from "../../components/dashboard/overview"
import { RecentTransactions } from "../../components/dashboard/recent-transactions"
import { BudgetProgress } from "../../components/dashboard/budget-progress"
import { useSession } from "next-auth/react"
import { useToast } from "../../components/ui/use-toast"
import { useCurrency } from "../../hooks/useCurrency"
import { useApi } from "../../hooks/useApi"
import { ThreeDIcon } from "../../components/ui/3d-icon"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const { fetchWithCurrency } = useApi()
  const [isLoading, setIsLoading] = useState(true)
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  })

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true)
        const response = await fetchWithCurrency("/api/transactions/summary")
        if (isMounted && response) {
          // Type assertion for the response
          const data = response as any;
          setSummary({
            totalIncome: data.totalIncome || 0,
            totalExpenses: data.totalExpenses || 0,
            balance: data.balance || 0
          })
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Error",
            description: "Failed to load financial summary",
            variant: "destructive",
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSummary()

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [toast, fetchWithCurrency])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, {session?.user?.name}! Here's an overview of your finances.</p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <ThreeDIcon icon="solar:wallet-money-bold-duotone" size={28} color="#6366f1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                formatCurrency(summary.balance)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Your financial balance for 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ThreeDIcon icon="solar:money-bag-bold-duotone" size={28} color="#10b981" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                formatCurrency(summary.totalIncome)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total income for 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ThreeDIcon icon="solar:card-transfer-bold-duotone" size={28} color="#ef4444" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                formatCurrency(summary.totalExpenses)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total expenses for 2025</p>
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

