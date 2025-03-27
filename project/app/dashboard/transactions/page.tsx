"use client"

import { useState } from "react"
import { Download, Filter, PlusCircle, Search } from "lucide-react"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Sample transaction data
const allTransactions = [
  {
    id: "t1",
    name: "Haldirams",
    amount: -4.50,
    date: "2023-07-05",
    formattedDate: "Jul 5, 2023",
    category: "Food & Drink",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "☕",
  },
  {
    id: "t2",
    name: "Amazon",
    amount: -29.99,
    date: "2023-07-04",
    formattedDate: "Jul 4, 2023",
    category: "Shopping",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🛒",
  },
  {
    id: "t3",
    name: "Salary Deposit",
    amount: 2500.00,
    date: "2023-07-01",
    formattedDate: "Jul 1, 2023",
    category: "Income",
    account: "Chase Checking",
    status: "completed",
    type: "credit",
    icon: "💰",
  },
  {
    id: "t4",
    name: "Local Taxi",
    amount: -12.50,
    date: "2023-06-30",
    formattedDate: "Jun 30, 2023",
    category: "Transportation",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🚗",
  },
  {
    id: "t5",
    name: "Pirated site",
    amount: -15.99,
    date: "2023-06-28",
    formattedDate: "Jun 28, 2023",
    category: "Entertainment",
    account: "Wells Fargo Savings",
    status: "completed",
    type: "debit",
    icon: "🎬",
  },
  {
    id: "t6",
    name: "Grocery Store",
    amount: -65.42,
    date: "2023-06-25",
    formattedDate: "Jun 25, 2023",
    category: "Food & Drink",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🛒",
  },
  {
    id: "t7",
    name: "Gas Station",
    amount: -35.50,
    date: "2023-06-23",
    formattedDate: "Jun 23, 2023",
    category: "Transportation",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "⛽",
  },
  {
    id: "t8",
    name: "Rent Payment",
    amount: -1200.00,
    date: "2023-06-01",
    formattedDate: "Jun 1, 2023",
    category: "Housing",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🏠",
  },
  {
    id: "t9",
    name: "Dividend Payment",
    amount: 75.25,
    date: "2023-05-28",
    formattedDate: "May 28, 2023",
    category: "Income",
    account: "Vanguard Investment",
    status: "completed",
    type: "credit",
    icon: "📈",
  },
  {
    id: "t10",
    name: "Phone Bill",
    amount: -85.00,
    date: "2023-05-15",
    formattedDate: "May 15, 2023",
    category: "Utilities",
    account: "Wells Fargo Savings",
    status: "completed",
    type: "debit",
    icon: "📱",
  },
  {
    id: "t11",
    name: "Gym Membership",
    amount: -50.00,
    date: "2023-05-10",
    formattedDate: "May 10, 2023",
    category: "Health & Fitness",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🏋️",
  },
  {
    id: "t12",
    name: "Bonus Payment",
    amount: 500.00,
    date: "2023-05-05",
    formattedDate: "May 5, 2023",
    category: "Income",
    account: "Chase Checking",
    status: "completed",
    type: "credit",
    icon: "💰",
  },
  {
    id: "t13",
    name: "Electric Bill",
    amount: -75.42,
    date: "2023-05-02",
    formattedDate: "May 2, 2023",
    category: "Utilities",
    account: "Wells Fargo Savings",
    status: "completed",
    type: "debit",
    icon: "⚡",
  },
  {
    id: "t14",
    name: "Mess",
    amount: -85.20,
    date: "2023-04-28",
    formattedDate: "Apr 28, 2023",
    category: "Food & Drink",
    account: "Chase Checking",
    status: "completed",
    type: "debit",
    icon: "🍽️",
  },
  {
    id: "t15",
    name: "Salary Deposit",
    amount: 2500.00,
    date: "2023-04-15",
    formattedDate: "Apr 15, 2023",
    category: "Income",
    account: "Chase Checking",
    status: "completed",
    type: "credit",
    icon: "💰",
  },
    {
    id: "t16",
    name: "Dividend Deposit",
    amount: 500.00,
    date: "2023-04-15",
    formattedDate: "Apr 15, 2023",
    category: "Income",
    account: "Chase Checking",
    status: "completed",
    type: "credit",
    icon: "💰",
  },
]
// Extract unique categories and accounts for filters

const categories = [...new Set(allTransactions.map(t => t.category))].sort()
const accounts = [...new Set(allTransactions.map(t => t.account))].sort()

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(allTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [newTransaction, setNewTransaction] = useState({ name: "", amount: "", category: "", account: "", type: "debit" })

  const handleAddTransaction = () => {
    const date = new Date().toISOString().split("T")[0]
    const formattedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    const icon = newTransaction.type === "credit" ? "💰" : "💸" // Dynamically set icon based on type
    const newEntry = {
      id: `t${transactions.length + 1}`,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date,
      formattedDate,
      status: "completed",
      icon, // Use the dynamically set icon
    }
    setTransactions([newEntry, ...transactions])
    setNewTransaction({ name: "", amount: "", category: "", account: "", type: "debit" })
  }

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
    const matchesAccount = selectedAccount === "all" || transaction.account === selectedAccount
    const matchesType = selectedType === "all" || transaction.type === selectedType
    
    return matchesSearch && matchesCategory && matchesAccount && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="Transactions" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {accounts.map(account => (
                <SelectItem key={account} value={account}>{account}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="credit">Income</SelectItem>
              <SelectItem value="debit">Expense</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">Transaction</div>
              <div>Date</div>
              <div>Category</div>
              <div>Account</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map(transaction => (
                  <div key={transaction.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-lg">{transaction.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">{transaction.formattedDate}</div>
                    <div className="flex items-center text-sm">{transaction.category}</div>
                    <div className="flex items-center text-sm">{transaction.account}</div>
                    <div className={cn(
                      "flex items-center justify-end text-sm font-medium",
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {transaction.amount > 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No transactions found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Transaction Name" 
            value={newTransaction.name} 
            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })} 
          />
          <Input 
            placeholder="Amount" 
            type="number" 
            value={newTransaction.amount} 
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} 
          />
          <Select 
            value={newTransaction.category} 
            onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={newTransaction.account} 
            onValueChange={(value) => setNewTransaction({ ...newTransaction, account: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map(account => (
                <SelectItem key={account} value={account}>{account}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={newTransaction.type} 
            onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Income</SelectItem>
              <SelectItem value="debit">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddTransaction}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}