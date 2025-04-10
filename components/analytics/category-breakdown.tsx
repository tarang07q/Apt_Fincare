"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useCurrency } from "../../hooks/useCurrency"

type CategoryData = {
  name: string
  value: number
  color: string
}

type CategoryBreakdownProps = {
  data: CategoryData[]
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const { formatCurrency } = useCurrency()

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{data.name}</p>
          <p>{formatCurrency(data.value)}</p>
          <p>{`${data.percent.toFixed(1)}%`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const dataWithPercent = data.map((item) => ({
    ...item,
    percent: (item.value / total) * 100,
  }))

  return (
    <div className="h-80 w-full">
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithPercent}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${percent.toFixed(0)}%`}
            >
              {dataWithPercent.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

