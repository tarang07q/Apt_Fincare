"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export function Overview() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch monthly data
        const monthlyResponse = await fetch("/api/analytics/monthly")
        if (!monthlyResponse.ok) {
          throw new Error("Failed to fetch monthly data")
        }
        const monthlyData = await monthlyResponse.json()
        setMonthlyData(monthlyData)

        // Fetch category data
        const categoryResponse = await fetch("/api/analytics/categories")
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

    fetchData()
  }, [toast])

  // Sample data for development
  const sampleMonthlyData = [
    { name: "Jan", income: 2400, expenses: 1800 },
    { name: "Feb", income: 1980, expenses: 1600 },
    { name: "Mar", income: 2780, expenses: 2100 },
    { name: "Apr", income: 3080, expenses: 2400 },
    { name: "May", income: 2780, expenses: 2200 },
    { name: "Jun", income: 3290, expenses: 2500 },
  ]

  const sampleCategoryData = [
    { name: "Food", value: 400, color: "#10b981" },
    { name: "Housing", value: 800, color: "#3b82f6" },
    { name: "Transportation", value: 300, color: "#6366f1" },
    { name: "Entertainment", value: 200, color: "#f59e0b" },
    { name: "Healthcare", value: 150, color: "#ef4444" },
  ]

  const data = isLoading || monthlyData.length === 0 ? sampleMonthlyData : monthlyData
  const pieData = isLoading || categoryData.length === 0 ? sampleCategoryData : categoryData

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>Your income and expenses over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Breakdown of your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
          <CardDescription>How your spending has changed over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expenses" fill="#6366f1" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

