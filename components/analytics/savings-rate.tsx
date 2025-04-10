"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type MonthlyData = {
  name: string
  month: number
  year: number
  income: number
  expenses: number
  savings: number
  savingsRate: number
}

type SavingsRateProps = {
  data: MonthlyData[]
}

export function SavingsRate({ data }: SavingsRateProps) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-blue-500">Savings Rate: {payload[0].value.toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="savingsRate" name="Savings Rate" stroke="#3b82f6" fill="#3b82f680" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

