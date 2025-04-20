"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../hooks/use-toast"
import { Progress } from "../ui/progress"
import { AlertTriangle } from "lucide-react"
import { useCurrency } from "../../hooks/useCurrency"

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
  const { currency, currencySymbol, formatCurrency } = useCurrency()
  const [isLoading, setIsLoading] = useState(true)
  const [budgets, setBudgets] = useState<Budget[]>([])

  // Fetch budgets when component mounts or currency changes
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/budgets/progress?currency=${currency}`)
        if (!response.ok) {
          throw new Error("Failed to fetch budgets")
        }
        const result = await response.json()
        setBudgets(result.data || [])
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
  }, [currency, toast])

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
        ) : budgets.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No budgets found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {budgets.map((budget) => {
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
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
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

