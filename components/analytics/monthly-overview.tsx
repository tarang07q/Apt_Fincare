"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
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

type MonthlyOverviewProps = {
  data: MonthlyData[]
}

export function MonthlyOverview({ data }: MonthlyOverviewProps) {
  const { formatCurrency, currencySymbol } = useCurrency()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-emerald-500">Income: {formatCurrency(payload[0].value)}</p>
          <p className="text-rose-500">Expenses: {formatCurrency(payload[1].value)}</p>
          <p className="text-blue-500">Savings: {formatCurrency(payload[0].value - payload[1].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Legend />
          <Bar dataKey="income" name="Income" fill="#10b981" />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

