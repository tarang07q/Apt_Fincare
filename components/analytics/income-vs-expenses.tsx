"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts"
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

type IncomeVsExpensesProps = {
  data: MonthlyData[]
}

export function IncomeVsExpenses({ data }: IncomeVsExpensesProps) {
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
        <div className={`${currentTheme === 'dark' ? 'bg-black border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border rounded-md shadow-sm p-4 text-sm`}>
          <p className="font-medium text-base mb-2">{label}</p>
          <div className="space-y-1">
            {payload[0] && (
              <div className="flex justify-between items-center gap-4">
                <span className="text-emerald-500 font-medium">Income:</span>
                <span className="text-emerald-500 font-bold text-lg">{formatCurrency(payload[0].value)}</span>
              </div>
            )}
            {payload[1] && (
              <div className="flex justify-between items-center gap-4">
                <span className="text-rose-500 font-medium">Expenses:</span>
                <span className="text-rose-500 font-bold text-lg">{formatCurrency(payload[1].value)}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  // Custom gradient colors for better visual appeal
  const incomeGradientId = "incomeGradient"
  const expenseGradientId = "expenseGradient"

  return (
    <div className={`h-80 w-full rounded-lg p-4 border ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            <linearGradient id={incomeGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id={expenseGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
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
            domain={['dataMin - 1000', 'dataMax + 1000']}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: currentTheme === 'dark' ? '#ffffff' : '#374151' }}>{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#064e3b' }}
            activeDot={{ stroke: '#10b981', strokeWidth: 2, r: 6, fill: '#064e3b' }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4, fill: '#7f1d1d' }}
            activeDot={{ stroke: '#ef4444', strokeWidth: 2, r: 6, fill: '#7f1d1d' }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

