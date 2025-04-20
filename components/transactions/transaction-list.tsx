"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
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
import { EditTransactionForm } from "../../components/transactions/edit-transaction-form"
import { useCurrency } from "../../hooks/useCurrency"

type Transaction = {
  _id: string
  amount: number
  type: "expense" | "income" | "transfer"
  category: {
    _id: string
    name: string
    icon: string
    color: string
  }
  description: string
  date: string
  paymentMethod?: string
  location?: string
  tags?: string[]
}

type TransactionListProps = {
  transactions: Transaction[]
  isLoading: boolean
  onRefresh: () => void
}

export function TransactionList({ transactions, isLoading, onRefresh }: TransactionListProps) {
  const { toast } = useToast()
  const { formatCurrency } = useCurrency()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleDelete = async () => {
    if (!selectedTransaction) return

    try {
      const response = await fetch(`/api/transactions/${selectedTransaction._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete transaction")
      }

      toast({
        title: "Transaction deleted",
        description: "The transaction has been deleted successfully",
      })

      onRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete transaction",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedTransaction(null)
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      cash: "Cash",
      credit_card: "Credit Card",
      debit_card: "Debit Card",
      bank_transfer: "Bank Transfer",
      mobile_payment: "Mobile Payment",
      other: "Other",
    }
    return methods[method] || method
  }

  if (isLoading && transactions.length === 0) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
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
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <EditTransactionForm
              transaction={selectedTransaction}
              onSuccess={() => {
                setEditDialogOpen(false)
                onRefresh()
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="flex items-center gap-4 p-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${transaction.category.color}20` }}
            >
              {transaction.type === "expense" ? (
                <ArrowDownIcon className="h-5 w-5 text-rose-500" />
              ) : transaction.type === "income" ? (
                <ArrowUpIcon className="h-5 w-5 text-emerald-500" />
              ) : (
                <ArrowUpIcon className="h-5 w-5 rotate-90 text-blue-500" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <p className="font-medium">{transaction.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline" className="text-xs">
                  {transaction.category.name}
                </Badge>

                <span className="text-muted-foreground">{format(new Date(transaction.date), "MMM d, yyyy")}</span>

                {transaction.paymentMethod && (
                  <span className="text-muted-foreground">{getPaymentMethodLabel(transaction.paymentMethod)}</span>
                )}

                {transaction.location && <span className="text-muted-foreground">{transaction.location}</span>}

                {transaction.tags && transaction.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {transaction.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`font-medium ${
                  transaction.type === "expense"
                    ? "text-rose-500"
                    : transaction.type === "income"
                      ? "text-emerald-500"
                      : "text-blue-500"
                }`}
              >
                {transaction.type === "expense" ? "-" : transaction.type === "income" ? "+" : ""}
                {formatCurrency(transaction.amount)}
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
                      setSelectedTransaction(transaction)
                      setEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-rose-500 focus:text-rose-500"
                    onClick={() => {
                      setSelectedTransaction(transaction)
                      setDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
