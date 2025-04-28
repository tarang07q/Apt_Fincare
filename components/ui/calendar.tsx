"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays } from "date-fns"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"

export interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  initialFocus?: boolean
  fromYear?: number
  toYear?: number
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  disabled = false,
  initialFocus = false,
  fromYear,
  toYear,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected && !Array.isArray(selected) ? selected : new Date())
  const [isYearSelectOpen, setIsYearSelectOpen] = React.useState(false)
  const [isMonthSelectOpen, setIsMonthSelectOpen] = React.useState(false)
  const yearSelectorRef = React.useRef<HTMLDivElement>(null)
  const monthSelectorRef = React.useRef<HTMLDivElement>(null)

  // Generate years for selection
  const currentYear = new Date().getFullYear()
  const startYear = fromYear || currentYear - 10
  const endYear = toYear || currentYear + 10
  const years = React.useMemo(() => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  }, [startYear, endYear])

  // Months for selection
  const months = React.useMemo(() => {
    return [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
  }, [])

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Generate days for the current month
  const days = React.useMemo(() => {
    const firstDayOfMonth = startOfMonth(currentMonth)
    const lastDayOfMonth = endOfMonth(currentMonth)

    // Get days from previous month to fill the first row
    const daysInPreviousMonth = firstDayOfMonth.getDay()
    const previousMonthDays = daysInPreviousMonth > 0
      ? eachDayOfInterval({
          start: subMonths(addDays(firstDayOfMonth, -daysInPreviousMonth), 0),
          end: subMonths(addDays(firstDayOfMonth, -1), 0)
        })
      : []

    // Get days from current month
    const currentMonthDays = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

    // Get days from next month to fill the last row
    const daysInNextMonth = 6 - lastDayOfMonth.getDay()
    const nextMonthDays = daysInNextMonth > 0
      ? eachDayOfInterval({
          start: addMonths(addDays(lastDayOfMonth, 1), 0),
          end: addMonths(addDays(lastDayOfMonth, daysInNextMonth), 0)
        })
      : []

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
  }, [currentMonth])

  // Close selectors when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearSelectorRef.current && !yearSelectorRef.current.contains(event.target as Node)) {
        setIsYearSelectOpen(false)
      }
      if (monthSelectorRef.current && !monthSelectorRef.current.contains(event.target as Node)) {
        setIsMonthSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
    setIsYearSelectOpen(false)
  }

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1))
    setIsMonthSelectOpen(false)
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (disabled) return
    if (onSelect) {
      onSelect(date)
    }
  }

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selected) return false

    if (Array.isArray(selected)) {
      return selected.some(selectedDate => isSameDay(selectedDate, date))
    }

    return isSameDay(selected, date)
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  // Group days into weeks
  const weeks = React.useMemo(() => {
    const result = []
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }
    return result
  }, [days])

  return (
    <div className={cn("p-3 bg-card border rounded-md shadow-md dark:bg-gray-800", className)}>
      {/* Header with month/year selector and navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-1">
          {/* Month selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsMonthSelectOpen(!isMonthSelectOpen)
                setIsYearSelectOpen(false)
              }}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-foreground dark:text-gray-200 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 rounded-md"
            >
              <span className="font-semibold">{format(currentMonth, 'MMMM')}</span>
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {isMonthSelectOpen && (
              <div
                ref={monthSelectorRef}
                className="absolute z-50 top-10 left-0 max-h-60 w-36 overflow-auto rounded-md bg-card border border-input shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="p-1">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(index)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-sm rounded-md text-foreground dark:text-gray-200",
                        index === currentMonth.getMonth()
                          ? "bg-emerald-600 text-white dark:bg-emerald-500"
                          : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                      )}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Year selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsYearSelectOpen(!isYearSelectOpen)
                setIsMonthSelectOpen(false)
              }}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-foreground dark:text-gray-200 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 rounded-md"
            >
              <span className="font-semibold">{format(currentMonth, 'yyyy')}</span>
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {isYearSelectOpen && (
              <div
                ref={yearSelectorRef}
                className="absolute z-50 top-10 left-0 max-h-60 w-36 overflow-auto rounded-md bg-card border border-input shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="p-1 grid grid-cols-3 gap-1">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      className={cn(
                        "px-2 py-1 text-sm rounded-md text-foreground dark:text-gray-200",
                        year === currentMonth.getFullYear()
                          ? "bg-emerald-600 text-white dark:bg-emerald-500"
                          : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="flex justify-between">
            {daysOfWeek.map((day) => (
              <th key={day} className="text-muted-foreground text-[0.8rem] font-medium text-center py-2 w-9">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex} className="flex justify-between">
              {week.map((day) => {
                const isCurrentMonth = isSameMonth(day, currentMonth)
                return (
                  <td key={day.toString()} className="text-center p-0 relative h-9 w-9 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled || !isCurrentMonth}
                      className={cn(
                        "h-8 w-8 p-0 font-normal rounded-full flex items-center justify-center",
                        isSelected(day) && "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white",
                        isToday(day) && !isSelected(day) && "border border-emerald-500 dark:border-emerald-400",
                        !isCurrentMonth && "text-muted-foreground opacity-50",
                        !disabled && isCurrentMonth && !isSelected(day) && "hover:bg-accent dark:hover:bg-gray-700"
                      )}
                    >
                      {format(day, 'd')}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Calendar.displayName = "Calendar"
