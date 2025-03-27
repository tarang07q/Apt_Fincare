"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, CreditCard, DollarSign, PlusCircle, TrendingUp } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample data for charts
const areaChartData = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 9800 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
  { name: "Jul", amount: 4300 },
]

const barChartData = [
  { name: "Food", amount: 400, color: "#f97316" },
  { name: "Shopping", amount: 300, color: "#0ea5e9" },
  { name: "Transport", amount: 200, color: "#14b8a6" },
  { name: "Entertainment", amount: 278, color: "#f59e0b" },
  { name: "Other", amount: 189, color: "#8b5cf6" },
]

const pieChartData = [
  { name: "Checking", value: 5400, color: "#3b82f6" },
  { name: "Savings", value: 8500, color: "#10b981" },
  { name: "Investment", value: 2300, color: "#6366f1" },
]

// Sample transaction data
const recentTransactions = [
  {
    id: "t1",
    name: "Starbucks",
    amount: -4.50,
    date: "Today, 10:30 AM",
    category: "Food & Drink",
    icon: "☕",
  },
  {
    id: "t2",
    name: "Amazon",
    amount: -29.99,
    date: "Yesterday, 2:15 PM",
    category: "Shopping",
    icon: "🛒",
  },
  {
    id: "t3",
    name: "Salary Deposit",
    amount: 2500.00,
    date: "Jul 1, 9:00 AM",
    category: "Income",
    icon: "💰",
  },
  {
    id: "t4",
    name: "Uber",
    amount: -12.50,
    date: "Jun 30, 8:30 PM",
    category: "Transportation",
    icon: "🚗",
  },
  {
    id: "t5",
    name: "Netflix",
    amount: -15.99,
    date: "Jun 28, 12:00 AM",
    category: "Entertainment",
    icon: "🎬",
  },
]

// Sample bank accounts data
const bankAccounts = [
  {
    id: "b1",
    name: "Chase Checking",
    balance: 4750.55,
    accountNumber: "****4567",
    type: "checking",
  },
  {
    id: "b2",
    name: "Wells Fargo Savings",
    balance: 8250.33,
    accountNumber: "****7890",
    type: "savings",
  },
  {
    id: "b3",
    name: "Vanguard Investment",
    balance: 12500.00,
    accountNumber: "****2345",
    type: "investment",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [chartData, setChartData] = useState({
    area: areaChartData,
    bar: barChartData,
    pie: pieChartData
  })
  
  // Simulate data loading and updating
  useEffect(() => {
    // This would normally be an API call to get the latest data
    const timer = setTimeout(() => {
      setChartData({
        area: areaChartData,
        bar: barChartData,
        pie: pieChartData
      })
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="Dashboard" />
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/dashboard/banks"}>
              <PlusCircle className="mr-2 h-4 w-4" />
              View Banks
            </Button>
          </div>
        </div>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$25,500.88</div>
                <p className="text-xs text-gray-500">Across all accounts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,550.00</div>
                <div className="flex items-center pt-1">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-500">+12.5% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spending</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-orange-500"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250.00</div>
                <div className="flex items-center pt-1">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-red-500 rotate-180" />
                  <p className="text-xs text-red-500">-4.3% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accounts</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500">Connected bank accounts</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Balance Overview</CardTitle>
                <CardDescription>
                  Your balance trend over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={chartData.area}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="#93c5fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>
                  Your top spending categories this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData.bar}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {chartData.bar.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Your linked bank accounts and balances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          account.type === "checking" ? "bg-blue-100" : 
                          account.type === "savings" ? "bg-green-100" : "bg-purple-100"
                        )}>
                          <CreditCard className={cn(
                            "h-5 w-5",
                            account.type === "checking" ? "text-blue-500" : 
                            account.type === "savings" ? "text-green-500" : "text-purple-500"
                          )} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-gray-500">{account.accountNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-xs text-gray-500 capitalize">{account.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          <span className="text-lg">{transaction.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.name}</p>
                          <p className="text-xs text-gray-500">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "text-sm font-medium",
                          transaction.amount > 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {transaction.amount > 0 ? "+" : ""}
                          ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Spending Analysis</CardTitle>
                <CardDescription>
                  Your spending patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={chartData.area}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="#93c5fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Distribution</CardTitle>
                <CardDescription>
                  Balance distribution across accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={chartData.pie}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.pie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Category Spending Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of your spending by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Category</div>
                  <div>Amount</div>
                  <div>% of Total</div>
                  <div>vs. Last Month</div>
                </div>
                <div className="divide-y">
                  {barChartData.map((category, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4">
                      <div className="font-medium">{category.name}</div>
                      <div>${category.amount.toLocaleString()}</div>
                      <div>{((category.amount / 1367) * 100).toFixed(1)}%</div>
                      <div className={index % 2 === 0 ? "text-green-500" : "text-red-500"}>
                        {index % 2 === 0 ? "+" : "-"}{Math.floor(Math.random() * 15) + 1}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>
                  How your spending has changed over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {barChartData.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium">${category.amount}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(category.amount / 400) * 100}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Merchants</CardTitle>
                <CardDescription>
                  Where you spend the most money
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-lg">🛒</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Amazon</p>
                        <p className="text-xs text-gray-500">Shopping</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">-$129.99</p>
                      <p className="text-xs text-gray-500">5 transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <span className="text-lg">🍔</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Uber Eats</p>
                        <p className="text-xs text-gray-500">Food & Dining</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">-$95.42</p>
                      <p className="text-xs text-gray-500">8 transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                        <span className="text-lg">⛽</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Shell</p>
                        <p className="text-xs text-gray-500">Transportation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">-$85.50</p>
                      <p className="text-xs text-gray-500">3 transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <span className="text-lg">🎬</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Netflix</p>
                        <p className="text-xs text-gray-500">Entertainment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">-$45.97</p>
                      <p className="text-xs text-gray-500">3 transactions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <span className="text-lg">☕</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Starbucks</p>
                        <p className="text-xs text-gray-500">Food & Dining</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">-$42.75</p>
                      <p className="text-xs text-gray-500">9 transactions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Detailed Financial Reports</h3>
              <p className="text-gray-500 mb-4">View comprehensive reports about your finances</p>
              <Button onClick={() => window.location.href = "/dashboard/reports"}>Go to Reports</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="flex items-center justify-center py-10">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Your Notifications</h3>
              <p className="text-gray-500 mb-4">View all your notifications and alerts</p>
              <Button onClick={() => window.location.href = "/dashboard/notifications"}>Go to Notifications</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}