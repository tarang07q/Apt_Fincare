"use client"

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

// Sample bank accounts data
const initialBankAccounts = [
  {
    id: "b1",
    name: "Chase Checking",
    balance: 4750.55,
    accountNumber: "****4567",
    type: "checking",
    institution: "Chase Bank",
  },
  {
    id: "b2",
    name: "Wells Fargo Savings",
    balance: 8250.33,
    accountNumber: "****7890",
    type: "savings",
    institution: "Wells Fargo",
  },
  {
    id: "b3",
    name: "Vanguard Investment",
    balance: 12500.00,
    accountNumber: "****2345",
    type: "investment",
    institution: "Vanguard",
  },
]

const TransferFunds = () => {
  const [bankAccounts, setBankAccounts] = useState(initialBankAccounts)
  const [transferDetails, setTransferDetails] = useState({ fromAccount: "", toAccount: "", amount: "" })

  const handleTransferFunds = () => {
    const amount = parseFloat(transferDetails.amount)
    if (transferDetails.fromAccount && transferDetails.toAccount && amount > 0 && transferDetails.fromAccount !== transferDetails.toAccount) {
      setBankAccounts(prevAccounts => prevAccounts.map(account => {
        if (account.name === transferDetails.fromAccount) {
          return { ...account, balance: account.balance - amount }
        }
        if (account.name === transferDetails.toAccount) {
          return { ...account, balance: account.balance + amount }
        }
        return account
      }))
      setTransferDetails({ fromAccount: "", toAccount: "", amount: "" })
    } else {
      alert("Invalid transfer details")
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-8 pt-6">
      <Header title="Transfer Funds" />
      <Card>
        <CardHeader>
          <CardTitle>Transfer Funds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select 
            value={transferDetails.fromAccount} 
            onValueChange={(value) => setTransferDetails({ ...transferDetails, fromAccount: value })}>
            <SelectTrigger>
              <SelectValue placeholder="From Account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map(account => (
                <SelectItem key={account.id} value={account.name}>{account.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={transferDetails.toAccount} 
            onValueChange={(value) => setTransferDetails({ ...transferDetails, toAccount: value })}>
            <SelectTrigger>
              <SelectValue placeholder="To Account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map(account => (
                <SelectItem key={account.id} value={account.name}>{account.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input 
            placeholder="Amount" 
            type="number" 
            value={transferDetails.amount} 
            onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })} 
          />
          <Button onClick={handleTransferFunds}>
            Transfer Funds
          </Button>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Account Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {bankAccounts.map(account => (
              <li key={account.id} className="flex justify-between py-2">
                <span>{account.name}</span>
                <span>${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransferFunds