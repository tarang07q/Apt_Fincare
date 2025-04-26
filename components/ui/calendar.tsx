"use client"

import * as React from "react"
import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);

  // Generate years for selection (10 years before and after current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsYearSelectOpen(false);

    // Update the month in DayPicker
    if (props.onMonthChange) {
      const newDate = new Date(year, selectedMonth, 1);
      props.onMonthChange(newDate);
    }
  };

  // Handle month change from DayPicker
  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date.getMonth());
    setSelectedYear(date.getFullYear());

    if (props.onMonthChange) {
      props.onMonthChange(date);
    }
  };

  // Custom caption component with year selection
  const CustomCaption = ({ displayMonth }: { displayMonth: Date }) => {
    return (
      <div className="flex justify-center items-center space-x-1 relative">
        <div className="flex items-center">
          <span className="text-sm font-medium text-foreground dark:text-gray-200">
            {format(displayMonth, 'MMMM')}
          </span>
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-foreground dark:text-gray-200 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 rounded-md"
            >
              {format(displayMonth, 'yyyy')}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            {isYearSelectOpen && (
              <div className="absolute z-50 mt-1 max-h-60 w-24 overflow-auto rounded-md bg-card border border-input shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="p-1 grid grid-cols-2 gap-1">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      className={cn(
                        "px-2 py-1 text-sm rounded-md text-foreground dark:text-gray-200",
                        year === selectedYear
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
      </div>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-card border rounded-md shadow-md dark:bg-gray-800", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center h-10",
        caption_label: "hidden", // Hide default caption label since we're using custom caption
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 dark:border-gray-600 dark:hover:bg-gray-700"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7 w-full",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-medium text-[0.8rem] text-center flex items-center justify-center",
        row: "grid grid-cols-7 w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600 rounded-full",
        day_today: "bg-accent text-accent-foreground font-bold border border-emerald-500 dark:border-emerald-400 dark:bg-gray-700 rounded-full",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground dark:text-gray-500",
        day_disabled: "text-muted-foreground opacity-50 dark:text-gray-600",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth }) => <CustomCaption displayMonth={displayMonth} />
      }}
      onMonthChange={handleMonthChange}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
