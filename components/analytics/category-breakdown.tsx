"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { useCurrency } from "../../hooks/useCurrency"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string>("light")

  // Use effect to update the current theme when it changes
  useEffect(() => {
    // resolvedTheme gives us the actual theme being used (including system preference)
    setCurrentTheme(resolvedTheme || theme || "light")
  }, [theme, resolvedTheme])

  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as (CategoryData & { percent: number, originalValue: number })
      // Convert name to string to prevent [object Object] display
      const nameStr = typeof data.name === 'string' ? data.name : String(data.name);
      // Ensure we're using the original value, not the display value
      const value = typeof data.originalValue === 'number' ? data.originalValue : data.value;

      return (
        <div className={`${currentTheme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border-2 rounded-lg shadow-lg p-4 text-sm backdrop-blur-sm`}
             style={{ minWidth: '180px' }}>
          <p className="font-bold text-base mb-2" style={{ color: data.color }}>{nameStr}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Amount:</p>
            <p className="font-bold text-lg">{formatCurrency(value)}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground">Percentage:</p>
            <p className="font-medium">{`${data.percent.toFixed(1)}%`}</p>
          </div>
        </div>
      )
    }
    return null
  }

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : 0), 0)

  // Ensure all values are at least 1% of total for visibility
  const minVisibleValue = total * 0.01

  const dataWithPercent = data.map((item) => {
    const rawValue = typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0
    // Ensure a minimum display value for very small amounts (for visibility)
    const displayValue = rawValue < minVisibleValue && rawValue > 0 ? minVisibleValue : rawValue

    return {
      ...item,
      // Keep original value for tooltips and calculations
      originalValue: rawValue,
      // Use adjusted value for display
      value: displayValue,
      // Calculate accurate percentage based on original value
      percent: total > 0 ? (rawValue / total) * 100 : 0,
    }
  })

  return (
    <div className={`h-80 w-full rounded-lg p-4 border ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ backgroundColor: currentTheme === 'dark' ? 'black' : 'white' }}>
            <Pie
              data={dataWithPercent}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={false}
            >
              {dataWithPercent.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#000000"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000, outline: 'none' }}
              position={{ x: 0, y: 0 }}
              allowEscapeViewBox={{ x: true, y: true }}
              animationDuration={300}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ backgroundColor: currentTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '5px' }}
              formatter={(value, entry, index) => {
                const { color } = entry as any;
                // Convert value to string to prevent [object Object] display
                const valueStr = typeof value === 'string' ? value : String(value);
                // Display only category name
                return <span style={{ color: color, marginLeft: '5px', fontWeight: 'bold', fontSize: '12px' }}>
                  {valueStr}
                </span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

