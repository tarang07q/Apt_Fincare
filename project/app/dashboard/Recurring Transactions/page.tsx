import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/dashboard/header"

// Sample transaction data
const categories = ["Food & Drink", "Shopping", "Income", "Transportation", "Entertainment", "Utilities", "Health & Fitness", "Housing"]
const accounts = ["Chase Checking", "Wells Fargo Savings", "Vanguard Investment"]

const RecurringTransactions = () => {
  const [recurringTransactions, setRecurringTransactions] = useState([])
  const [recurringTransaction, setRecurringTransaction] = useState({ name: "", amount: "", category: "", account: "", type: "debit", frequency: "monthly", startDate: "", endDate: "" })

  const handleAddRecurringTransaction = () => {
    setRecurringTransactions([...recurringTransactions, recurringTransaction])
    setRecurringTransaction({ name: "", amount: "", category: "", account: "", type: "debit", frequency: "monthly", startDate: "", endDate: "" })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="Recurring Transactions" />
      
      {/* Recurring Transaction Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Recurring Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Transaction Name" 
            value={recurringTransaction.name} 
            onChange={(e) => setRecurringTransaction({ ...recurringTransaction, name: e.target.value })} 
          />
          <Input 
            placeholder="Amount" 
            type="number" 
            value={recurringTransaction.amount} 
            onChange={(e) => setRecurringTransaction({ ...recurringTransaction, amount: e.target.value })} 
          />
          <Select 
            value={recurringTransaction.category} 
            onValueChange={(value) => setRecurringTransaction({ ...recurringTransaction, category: value })}>
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
            value={recurringTransaction.account} 
            onValueChange={(value) => setRecurringTransaction({ ...recurringTransaction, account: value })}>
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
            value={recurringTransaction.type} 
            onValueChange={(value) => setRecurringTransaction({ ...recurringTransaction, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Income</SelectItem>
              <SelectItem value="debit">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select 
            value={recurringTransaction.frequency} 
            onValueChange={(value) => setRecurringTransaction({ ...recurringTransaction, frequency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="Start Date" 
            type="date" 
            value={recurringTransaction.startDate} 
            onChange={(e) => setRecurringTransaction({ ...recurringTransaction, startDate: e.target.value })} 
          />
          <Input 
            placeholder="End Date" 
            type="date" 
            value={recurringTransaction.endDate} 
            onChange={(e) => setRecurringTransaction({ ...recurringTransaction, endDate: e.target.value })} 
          />
          <Button onClick={handleAddRecurringTransaction}>
            Add Recurring Transaction
          </Button>
        </CardContent>
      </Card>

      {/* Recurring Transactions List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recurring Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {recurringTransactions.map((rt, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{rt.name} - {rt.frequency}</span>
                <span>${parseFloat(rt.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecurringTransactions