"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
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
import { useToast } from "../ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { EditCategoryForm } from "./edit-category-form"
import { Badge } from "../../components/ui/badge"

type Category = {
  _id: string
  name: string
  type: "expense" | "income" | "both"
  color: string
  icon: string
  description?: string
  isDefault?: boolean
}

type CategoryListProps = {
  categories: Category[]
  onRefresh: () => void
}

export function CategoryList({ categories, onRefresh }: CategoryListProps) {
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleDelete = async () => {
    if (!selectedCategory) return

    try {
      const response = await fetch(`/api/categories/${selectedCategory._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete category")
      }

      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully",
      })

      onRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete category",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setSelectedCategory(null)
    }
  }

  const getCategoryTypeLabel = (type: string) => {
    const types = {
      expense: "Expense",
      income: "Income",
      both: "Both",
    }
    return types[type] || type
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No categories found</p>
      </div>
    )
  }

  return (
    <>
      <div className="divide-y">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center gap-4 p-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{category.name}</p>
                {category.isDefault && (
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{getCategoryTypeLabel(category.type)}</span>
                {category.description && <span>• {category.description}</span>}
              </div>
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
                    setSelectedCategory(category)
                    setEditDialogOpen(true)
                  }}
                  disabled={category.isDefault}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-500 focus:text-rose-500"
                  onClick={() => {
                    setSelectedCategory(category)
                    setDeleteDialogOpen(true)
                  }}
                  disabled={category.isDefault}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category and may affect transactions and
              budgets using this category.
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
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <EditCategoryForm
              category={selectedCategory}
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

