"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend, TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useCurrency } from "../../hooks/useCurrency"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string>("light")

  // Use effect to update the current theme when it changes
  useEffect(() => {
    // resolvedTheme gives us the actual theme being used (including system preference)
    setCurrentTheme(resolvedTheme || theme || "light")
  }, [theme, resolvedTheme])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${currentTheme === 'dark' ? 'bg-black border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-md shadow-sm p-3 text-sm`}>
          <p className="font-medium text-base mb-1">{label}</p>
          <p className="text-rose-500 font-medium">Expenses: {formatCurrency(payload[0]?.value || 0)}</p>
        </div>
      )
    }
    return null
  }

  // Custom gradient for the area chart
  const expenseGradientId = "spendingTrendGradient"

  return (
    <div className={`h-80 w-full rounded-lg p-4 border ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
          style={{ backgroundColor: currentTheme === 'dark' ? 'black' : 'white' }}
        >
          <defs>
            <linearGradient id={expenseGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={currentTheme === 'dark' ? '#6b7280' : '#374151'} opacity={0.3} />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: '#6b7280', strokeWidth: 1 }}
            tickLine={{ stroke: '#6b7280' }}
            tick={{ fill: currentTheme === 'dark' ? '#ffffff' : '#374151', fontSize: 12 }}
          />
          <YAxis
            axisLine={{ stroke: '#6b7280', strokeWidth: 1 }}
            tickLine={{ stroke: '#6b7280' }}
            tick={{ fill: currentTheme === 'dark' ? '#ffffff' : '#374151', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value === undefined || value === null || isNaN(value)) return `${currencySymbol}0`;
              return `${currencySymbol}${Math.round(value)}`;
            }}
            allowDecimals={false}
            domain={[0, 'auto']}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: currentTheme === 'dark' ? '#ffffff' : '#374151' }}>{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#ef4444"
            strokeWidth={3}
            fill={`url(#${expenseGradientId})`}
            activeDot={{ stroke: '#ef4444', strokeWidth: 2, r: 6, fill: '#7f1d1d' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      )}
    </div>
  )
}

