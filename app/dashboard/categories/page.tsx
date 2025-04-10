"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { useToast } from "../../../components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Loader2, Plus, RefreshCw } from "lucide-react"
import { AddCategoryForm } from "../../../components/categories/add-category-form"
import { CategoryList } from "../../../components/categories/category-list"

export default function CategoriesPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [activeType, setActiveType] = useState("all")

  useEffect(() => {
    fetchCategories()
  }, [activeType])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const url = activeType !== "all" ? `/api/categories?type=${activeType}` : "/api/categories"

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchCategories()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your transaction categories</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <AddCategoryForm
                onSuccess={() => {
                  setIsAddCategoryOpen(false)
                  fetchCategories()
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

      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <CategoryList categories={categories} onRefresh={handleRefresh} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

