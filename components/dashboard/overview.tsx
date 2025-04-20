"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../components/ui/use-toast"
import { useCurrency } from "../../hooks/useCurrency"
import { useTheme } from "next-themes"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export function Overview() {
  const { toast } = useToast()
  const { currency, currencySymbol, formatCurrency } = useCurrency()
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string>("light")
  const [isLoading, setIsLoading] = useState(true)
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      // Convert name to string to prevent [object Object] display
      const nameStr = typeof data.name === 'string' ? data.name : String(data.name);
      // Calculate percentage
      const total = pieData.reduce((sum, item) => sum + item.value, 0);
      const percent = total > 0 ? (data.value / total) * 100 : 0;

      return (
        <div className={`${currentTheme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} border-2 rounded-lg shadow-lg p-4 text-sm backdrop-blur-sm`}
             style={{ minWidth: '180px' }}>
          <p className="font-bold text-base mb-2" style={{ color: data.color }}>{nameStr}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Amount:</p>
            <p className="font-bold text-lg">{formatCurrency(data.value)}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground">Percentage:</p>
            <p className="font-medium">{`${percent.toFixed(1)}%`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Use effect to update the current theme when it changes
  useEffect(() => {
    // resolvedTheme gives us the actual theme being used (including system preference)
    setCurrentTheme(resolvedTheme || theme || "light")
  }, [theme, resolvedTheme])

  // Refetch data when currency changes
  // Fetch data when component mounts or currency changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Fetch monthly data with currency
        const monthlyResponse = await fetch(`/api/analytics/monthly?currency=${currency}`)
        if (!monthlyResponse.ok) {
          throw new Error("Failed to fetch monthly data")
        }
        const monthlyResult = await monthlyResponse.json()
        setMonthlyData(monthlyResult.data || [])

        // Fetch category data with currency
        const categoryResponse = await fetch(`/api/analytics/categories?currency=${currency}`)
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category data")
        }
        const categoryResult = await categoryResponse.json()
        setCategoryData(categoryResult.data || [])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currency, toast])

  // No need for empty fallback data anymore

  // Validate and sanitize monthly data
  const sanitizedMonthlyData = Array.isArray(monthlyData) ? monthlyData.map(item => ({
    name: item.name || '',
    income: typeof item.income === 'number' && !isNaN(item.income) ? item.income : 0,
    expenses: typeof item.expenses === 'number' && !isNaN(item.expenses) ? item.expenses : 0
  })) : []

  // Validate and sanitize category data
  const sanitizedCategoryData = Array.isArray(categoryData) ? categoryData.map(item => ({
    name: item.name || 'Other',
    value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0,
    color: item.color || '#cccccc'
  })) : []

  const data = sanitizedMonthlyData
  const pieData = sanitizedCategoryData

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>Your income and expenses over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : sanitizedMonthlyData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className={`h-80 rounded-lg p-2 ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
              <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={10}
                barSize={20}
                style={{ backgroundColor: currentTheme === 'dark' ? 'black' : 'white' }}
              >
                <defs>
                  <linearGradient id="overviewIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="overviewExpenseGradient" x1="0" y1="0" x2="0" y2="1">
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
                  domain={[0, 'auto']}
                  ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  formatter={(value) => [`${currencySymbol}${value}`, undefined]}
                  contentStyle={{
                    backgroundColor: currentTheme === 'dark' ? 'black' : 'white',
                    border: `1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.375rem',
                    padding: '0.75rem',
                    color: currentTheme === 'dark' ? 'white' : 'black'
                  }}
                  labelStyle={{ color: currentTheme === 'dark' ? 'white' : 'black' }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => <span style={{ color: currentTheme === 'dark' ? '#ffffff' : '#374151' }}>{value}</span>}
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="url(#overviewIncomeGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="url(#overviewExpenseGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Breakdown of your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : sanitizedCategoryData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#1a1a1a"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomPieTooltip />}
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
                  formatter={(value, entry) => {
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
          </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
          <CardDescription>How your spending has changed over time</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : sanitizedMonthlyData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className="h-80">
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
                <defs>
                  <linearGradient id="overviewTrendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme === 'dark' ? '#6b7280' : '#374151'} opacity={0.3} />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#6b7280', strokeWidth: 1 }}
                  tickLine={{ stroke: '#6b7280' }}
                  tick={{ fill: currentTheme === 'dark' ? '#9ca3af' : '#374151', fontSize: 12 }}
                />
                <YAxis
                  axisLine={{ stroke: '#6b7280', strokeWidth: 1 }}
                  tickLine={{ stroke: '#6b7280' }}
                  tick={{ fill: currentTheme === 'dark' ? '#9ca3af' : '#374151', fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (value === undefined || value === null || isNaN(value)) return `${currencySymbol}0`;
                    return `${currencySymbol}${Math.round(value)}`;
                  }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                  ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                />
                <Tooltip
                  cursor={{ fill: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                  formatter={(value) => [`${currencySymbol}${value}`, undefined]}
                  contentStyle={{
                    backgroundColor: currentTheme === 'dark' ? '#1f2937' : 'white',
                    border: `1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.375rem',
                    padding: '0.75rem',
                    color: currentTheme === 'dark' ? 'white' : 'black'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ stroke: '#6366f1', strokeWidth: 2, r: 4, fill: '#3730a3' }}
                  activeDot={{ stroke: '#6366f1', strokeWidth: 2, r: 6, fill: '#3730a3' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

