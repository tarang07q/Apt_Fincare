"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useToast } from "../../../components/ui/use-toast"
import { Loader2, BarChart3, PieChart, LineChart, TrendingUp, ArrowRightLeft } from "lucide-react"
import { MonthlyOverview } from "../../../components/analytics/monthly-overview"
import { CategoryBreakdown } from "../../../components/analytics/category-breakdown"
import { SpendingTrends } from "../../../components/analytics/spending-trends"
import { SavingsRate } from "../../../components/analytics/savings-rate"
import { IncomeVsExpenses } from "../../../components/analytics/income-vs-expenses"
import { useCurrency } from "../../../hooks/useCurrency"
import { ThreeDIcon } from "../../../components/ui/3d-icon"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const { currency } = useCurrency()
  const [isLoading, setIsLoading] = useState(true)
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [timeframe, setTimeframe] = useState("6months")

  useEffect(() => {
    fetchData()
  }, [timeframe, currency])

  // Empty arrays for when no data is available
  const emptyMonthlyData = []
  const emptyCategoryData = []

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch monthly data
      const monthlyResponse = await fetch(`/api/analytics/monthly?timeframe=${timeframe}&currency=${currency}`)
      if (!monthlyResponse.ok) {
        throw new Error("Failed to fetch monthly data")
      }
      const monthlyDataResponse = await monthlyResponse.json()

      // Validate monthly data
      const validatedMonthlyData = Array.isArray(monthlyDataResponse.data) ?
        monthlyDataResponse.data.map(item => ({
          name: item.name || '',
          income: typeof item.income === 'number' && !isNaN(item.income) ? item.income : 0,
          expenses: typeof item.expenses === 'number' && !isNaN(item.expenses) ? item.expenses : 0,
          savings: typeof item.savings === 'number' && !isNaN(item.savings) ? item.savings : 0,
          savingsRate: typeof item.savingsRate === 'number' && !isNaN(item.savingsRate) ? item.savingsRate : 0
        })) :
        emptyMonthlyData

      setMonthlyData(validatedMonthlyData)

      // Fetch category data
      const categoryResponse = await fetch(`/api/analytics/categories?timeframe=${timeframe}&currency=${currency}`)
      if (!categoryResponse.ok) {
        throw new Error("Failed to fetch category data")
      }
      const categoryDataResponse = await categoryResponse.json()

      // Validate category data
      const validatedCategoryData = Array.isArray(categoryDataResponse.data) ?
        categoryDataResponse.data.map(item => ({
          name: item.name || 'Other',
          value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0,
          color: item.color || '#cccccc'
        })) :
        emptyCategoryData

      setCategoryData(validatedCategoryData)
    } catch (error) {
      // Set empty arrays in case of error
      setMonthlyData(emptyMonthlyData)
      setCategoryData(emptyCategoryData)

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
      <div className="flex items-center gap-3">
        <ThreeDIcon icon="solar:chart-bold-duotone" size={40} color="#6366f1" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Visualize your financial data and gain insights</p>
        </div>
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
              <div className="flex items-center gap-2">
                <ThreeDIcon icon="solar:chart-2-bold-duotone" size={24} color="#6366f1" />
                <CardTitle>Monthly Overview</CardTitle>
              </div>
              <CardDescription>Your income and expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyOverview data={monthlyData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThreeDIcon icon="solar:pie-chart-2-bold-duotone" size={24} color="#ef4444" />
                <CardTitle>Expense Categories</CardTitle>
              </div>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdown data={categoryData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThreeDIcon icon="solar:percent-bold-duotone" size={24} color="#10b981" />
                <CardTitle>Savings Rate</CardTitle>
              </div>
              <CardDescription>Percentage of income saved each month</CardDescription>
            </CardHeader>
            <CardContent>
              <SavingsRate data={monthlyData} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThreeDIcon icon="solar:chart-line-bold-duotone" size={24} color="#f59e0b" />
                <CardTitle>Spending Trends</CardTitle>
              </div>
              <CardDescription>How your spending has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingTrends data={monthlyData} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThreeDIcon icon="solar:chart-square-bold-duotone" size={24} color="#3b82f6" />
                <CardTitle>Income vs Expenses</CardTitle>
              </div>
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

