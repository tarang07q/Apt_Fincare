"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

type Category = {
  _id: string
  name: string
  type: string
  color: string
}

type TransactionFiltersProps = {
  filters: {
    type: string
    category: string
    startDate: string
    endDate: string
    search: string
    sortBy: string
    sortOrder: string
  }
  onFilterChange: (filters: any) => void
  categories: Category[]
}

export function TransactionFilters({ filters, onFilterChange, categories }: TransactionFiltersProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.startDate ? new Date(filters.startDate) : undefined,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate ? new Date(filters.endDate) : undefined)

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    onFilterChange({
      startDate: date ? date.toISOString() : "",
    })
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date)
    onFilterChange({
      endDate: date ? date.toISOString() : "",
    })
  }

  const handleClearFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onFilterChange({
      type: "",
      category: "",
      startDate: "",
      endDate: "",
      search: "",
      sortBy: "date",
      sortOrder: "desc",
    })
  }

  const hasActiveFilters =
    filters.type !== "" ||
    filters.category !== "" ||
    filters.startDate !== "" ||
    filters.endDate !== "" ||
    filters.sortBy !== "date" ||
    filters.sortOrder !== "desc"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={filters.category} onValueChange={(value) => onFilterChange({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
                {startDate && (
                  <X
                    className="ml-auto h-4 w-4 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStartDateSelect(undefined)
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={handleStartDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
                {endDate && (
                  <X
                    className="ml-auto h-4 w-4 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEndDateSelect(undefined)
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={handleEndDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <div className="flex gap-2">
            <Select value={filters.sortBy} onValueChange={(value) => onFilterChange({ sortBy: value })}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="description">Description</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.sortOrder} onValueChange={(value) => onFilterChange({ sortOrder: value })}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Asc</SelectItem>
                <SelectItem value="desc">Desc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2 text-xs">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

