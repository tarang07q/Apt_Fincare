"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { useToast } from "../../../hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { AlertTriangle, Loader2, Plus, RefreshCw, InfoIcon } from "lucide-react"
import { BudgetProgress } from "../../../components/dashboard/budget-progress"
import { AddBudgetForm } from "../../../components/budgets/add-budget-form"
import { BudgetList } from "../../../components/budgets/budget-list"
import { ThreeDIcon } from "../../../components/ui/3d-icon"
import { useCurrency } from "../../../hooks/useCurrency"

export default function BudgetsPage() {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const [isLoading, setIsLoading] = useState(true)
  const [budgets, setBudgets] = useState([])
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [activePeriod, setActivePeriod] = useState("monthly")

  useEffect(() => {
    fetchBudgets()
  }, [activePeriod])

  const fetchBudgets = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/budgets?period=${activePeriod}`)
      if (!response.ok) {
        throw new Error("Failed to fetch budgets")
      }
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load budgets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchBudgets()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <ThreeDIcon icon="solar:wallet-money-linear" size={40} color="#6366f1" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
            <p className="text-muted-foreground">Set and track your spending limits</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Budget</DialogTitle>
              </DialogHeader>
              <AddBudgetForm
                onSuccess={() => {
                  setIsAddBudgetOpen(false)
                  fetchBudgets()
                }}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-blue-500" />
            <CardTitle>Budget Instructions</CardTitle>
          </div>
          <CardDescription>
            How to use the budget tracking features effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Budget Types:</strong> Create budgets for different time periods (weekly, monthly, quarterly, yearly).</p>
            <p><strong>Budget Progress:</strong> The progress bar shows how much of your budget has been used.</p>
            <p><strong>Color Indicators:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-emerald-500 font-medium">Green</span> - Under budget (less than 75% used)</li>
              <li><span className="text-amber-500 font-medium">Yellow</span> - Approaching limit (75-99% used)</li>
              <li><span className="text-rose-500 font-medium">Red</span> - Over budget (100%+ used)</li>
            </ul>
            <p><strong>Currency:</strong> All budget amounts are shown in your selected currency ({formatCurrency(100).replace('100', 'XXX')}).</p>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activePeriod} onValueChange={setActivePeriod}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value={activePeriod} className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Budget Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : budgets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-2">
                      <ThreeDIcon icon="solar:money-bag-bold-duotone" size={64} color="#6366f1" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No budgets found</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                      You haven't set up any {activePeriod} budgets yet. Create a budget to start tracking your
                      spending.
                    </p>
                    <Button className="mt-4" onClick={() => setIsAddBudgetOpen(true)}>
                      Add Budget
                    </Button>
                  </div>
                ) : (
                  <BudgetProgress budgets={budgets} />
                )}
              </CardContent>
            </Card>


          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

