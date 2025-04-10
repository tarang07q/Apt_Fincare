"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useCurrency } from "../../hooks/useCurrency"

type MonthlyData = {
  name: string
  month: number
  year: number
  income: number
  expenses: number
  savings: number
  savingsRate: number
}

type SpendingTrendsProps = {
  data: MonthlyData[]
}

export function SpendingTrends({ data }: SpendingTrendsProps) {
  const { formatCurrency, currencySymbol } = useCurrency()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-rose-500">Expenses: {formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${currencySymbol}${value}`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#ef4444"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

