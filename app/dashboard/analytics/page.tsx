"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useToast } from "../../../components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { MonthlyOverview } from "../../../components/analytics/monthly-overview"
import { CategoryBreakdown } from "../../../components/analytics/category-breakdown"
import { SpendingTrends } from "../../../components/analytics/spending-trends"
import { SavingsRate } from "../../../components/analytics/savings-rate"
import { IncomeVsExpenses } from "../../../components/analytics/income-vs-expenses"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [timeframe, setTimeframe] = useState("6months")

  useEffect(() => {
    fetchData()
  }, [timeframe])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch monthly data
      const monthlyResponse = await fetch(`/api/analytics/monthly?timeframe=${timeframe}`)
      if (!monthlyResponse.ok) {
        throw new Error("Failed to fetch monthly data")
      }
      const monthlyData = await monthlyResponse.json()
      setMonthlyData(monthlyData)

      // Fetch category data
      const categoryResponse = await fetch(`/api/analytics/categories?timeframe=${timeframe}`)
      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch category data")
      }
      const categoryData = await categoryResponse.json()
      setCategoryData(categoryData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Visualize your financial data and gain insights</p>
      </div>

      <div className="flex justify-between items-center">
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="3months">3 Months</TabsTrigger>
            <TabsTrigger value="6months">6 Months</TabsTrigger>
            <TabsTrigger value="12months">1 Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Your income and expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyOverview data={monthlyData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdown data={categoryData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Rate</CardTitle>
              <CardDescription>Percentage of income saved each month</CardDescription>
            </CardHeader>
            <CardContent>
              <SavingsRate data={monthlyData} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>How your spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingTrends data={monthlyData} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Compare your income and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <IncomeVsExpenses data={monthlyData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

