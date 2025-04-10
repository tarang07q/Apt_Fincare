"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Loader2, MoreHorizontal, Pencil, Trash2, XCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { useToast } from "../../components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { EditBudgetForm } from "../../components/budgets/edit-budget-form"
import { useCurrency } from "../../hooks/useCurrency"

type Budget = {
  _id: string
  category: {
    _id: string
    name: string
    color: string
  }
  amount: number
  spent: number
  percentage: number
  remaining: number
  period: string
  status: string
  alerts: {
    enabled: boolean
    threshold: number
  }
  rollover: {
    enabled: boolean
    amount: number
  }
  notes?: string
}

type BudgetListProps = {
  budgets: Budget[]
  isLoading: boolean
  onRefresh: () => void
  period: string
}

export function BudgetList({ budgets, isLoading, onRefresh, period }: BudgetListProps) {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)

  const handleDelete = async () => {
    if (!selectedBudget) return

    try {
      const response = await fetch(`/api/budgets/${selectedBudget._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete budget")
      }

      toast({
        title: "Budget deleted",
        description: "The budget has been deleted successfully",
      })

      onRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete budget",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedBudget(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "over-budget":
        return <XCircle className="h-4 w-4 text-rose-500" />
      default:
        return null
    }
  }

  const getPeriodLabel = (period: string) => {
    const periods = {
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      yearly: "Yearly",
    }
    return periods[period] || period
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (budgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No {period} budgets found</p>
      </div>
    )
  }

  return (
    <>
      <div className="divide-y">
        {budgets.map((budget) => (
          <div key={budget._id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: budget.category.color }} />
                <span className="font-medium">{budget.category.name}</span>
                {getStatusIcon(budget.status)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedBudget(budget)
                      setEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-rose-500 focus:text-rose-500"
                    onClick={() => {
                      setSelectedBudget(budget)
                      setDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                </span>
                <span
                  className={
                    budget.status === "over-budget"
                      ? "text-rose-500"
                      : budget.status === "warning"
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }
                >
                  {budget.percentage}% used
                </span>
              </div>

              <Progress
                value={budget.percentage > 100 ? 100 : budget.percentage}
                className={`h-2 ${
                  budget.status === "over-budget"
                    ? "bg-rose-100"
                    : budget.status === "warning"
                      ? "bg-amber-100"
                      : "bg-emerald-100"
                }`}
                indicatorClassName={
                  budget.status === "over-budget"
                    ? "bg-rose-500"
                    : budget.status === "warning"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {budget.remaining > 0
                    ? `${formatCurrency(budget.remaining)} remaining`
                    : `${formatCurrency(Math.abs(budget.remaining))} over budget`}
                </span>
                <span>{getPeriodLabel(budget.period)}</span>
              </div>

              {budget.notes && <div className="text-xs text-muted-foreground mt-2 italic">{budget.notes}</div>}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the budget.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-rose-500 hover:bg-rose-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
          </DialogHeader>
          {selectedBudget && (
            <EditBudgetForm
              budget={selectedBudget}
              onSuccess={() => {
                setEditDialogOpen(false)
                onRefresh()
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

