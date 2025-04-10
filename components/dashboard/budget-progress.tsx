"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../hooks/use-toast"
import { Progress } from "../ui/progress"
import { AlertTriangle } from "lucide-react"

type Budget = {
  _id: string
  category: {
    _id: string
    name: string
    icon: string
    color: string
  }
  amount: number
  spent: number
  period: string
  alerts: {
    enabled: boolean
    threshold: number
  }
}

export function BudgetProgress() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [budgets, setBudgets] = useState<Budget[]>([])

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch("/api/budgets/progress")
        if (!response.ok) {
          throw new Error("Failed to fetch budgets")
        }
        const data = await response.json()
        setBudgets(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load budget data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBudgets()
  }, [toast])

  // Sample data for development
  const sampleBudgets = [
    {
      _id: "1",
      category: {
        _id: "cat1",
        name: "Groceries",
        icon: "shopping-cart",
        color: "#10b981",
      },
      amount: 500,
      spent: 320,
      period: "monthly",
      alerts: {
        enabled: true,
        threshold: 80,
      },
    },
    {
      _id: "2",
      category: {
        _id: "cat2",
        name: "Entertainment",
        icon: "film",
        color: "#f59e0b",
      },
      amount: 200,
      spent: 185,
      period: "monthly",
      alerts: {
        enabled: true,
        threshold: 80,
      },
    },
    {
      _id: "3",
      category: {
        _id: "cat3",
        name: "Transportation",
        icon: "car",
        color: "#6366f1",
      },
      amount: 300,
      spent: 150,
      period: "monthly",
      alerts: {
        enabled: true,
        threshold: 80,
      },
    },
    {
      _id: "4",
      category: {
        _id: "cat4",
        name: "Dining Out",
        icon: "utensils",
        color: "#ef4444",
      },
      amount: 250,
      spent: 230,
      period: "monthly",
      alerts: {
        enabled: true,
        threshold: 80,
      },
    },
  ] as Budget[]

  const data = isLoading || budgets.length === 0 ? sampleBudgets : budgets

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against your budget limits</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
                </div>
                <div className="h-2 w-full animate-pulse rounded bg-muted"></div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No budgets found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((budget) => {
              const percentage = Math.round((budget.spent / budget.amount) * 100)
              const isNearLimit = percentage >= budget.alerts.threshold
              const isOverBudget = percentage > 100

              return (
                <div key={budget._id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: budget.category.color }}></div>
                      <span className="font-medium">{budget.category.name}</span>
                      {isNearLimit && (
                        <AlertTriangle className={`h-4 w-4 ${isOverBudget ? "text-rose-500" : "text-amber-500"}`} />
                      )}
                    </div>
                    <div className="text-sm">
                      ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                    </div>
                  </div>
                  <Progress
                    value={percentage > 100 ? 100 : percentage}
                    className={`h-2 ${isOverBudget ? "bg-rose-100" : isNearLimit ? "bg-amber-100" : "bg-emerald-100"}`}
                    indicatorClassName={isOverBudget ? "bg-rose-500" : isNearLimit ? "bg-amber-500" : "bg-emerald-500"}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage}% used</span>
                    <span>{budget.period}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

