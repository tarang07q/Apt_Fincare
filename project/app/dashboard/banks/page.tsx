"use client"

import { useState } from "react"
import { CreditCard, PlusCircle } from "lucide-react"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample bank accounts data
const bankAccounts = [
  {
    id: "b1",
    name: "Chase Checking",
    balance: 4750.55,
    accountNumber: "****4567",
    type: "checking",
    institution: "Chase Bank",
    connected: "Jun 15, 2023",
    transactions: 156,
    details: {
      routingNumber: "021000021",
      accountType: "Personal Checking",
      interestRate: "0.01%",
      availableBalance: 4750.55,
      pendingTransactions: 2,
    }
  },
  {
    id: "b2",
    name: "Wells Fargo Savings",
    balance: 8250.33,
    accountNumber: "****7890",
    type: "savings",
    institution: "Wells Fargo",
    connected: "Jan 10, 2023",
    transactions: 42,
    details: {
      routingNumber: "121042882",
      accountType: "High-Yield Savings",
      interestRate: "0.85%",
      availableBalance: 8250.33,
      pendingTransactions: 0,
    }
  },
  {
    id: "b3",
    name: "Vanguard Investment",
    balance: 12500.00,
    accountNumber: "****2345",
    type: "investment",
    institution: "Vanguard",
    connected: "Mar 22, 2023",
    transactions: 18,
    details: {
      routingNumber: "N/A",
      accountType: "Brokerage Account",
      interestRate: "Variable",
      availableBalance: 12500.00,
      pendingTransactions: 1,
    }
  },
]

export default function BanksPage() {
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="My Banks" />
      
      
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bankAccounts.map((account) => (
          <Card 
            key={account.id} 
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedBank.id === account.id ? "border-blue-500 ring-2 ring-blue-200" : ""
            )}
            onClick={() => setSelectedBank(account)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
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
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 capitalize">
                  {account.type}
                </div>
              </div>
              <CardTitle className="mt-2">{account.name}</CardTitle>
              <CardDescription>{account.institution}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-500 mt-1">Account: {account.accountNumber}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedBank && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">{selectedBank.name} Details</CardTitle>
                <CardDescription>
                  Connected on {selectedBank.connected} • {selectedBank.transactions} transactions
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Refresh</Button>
                <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                  Disconnect
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Institution</p>
                    <p className="font-medium">{selectedBank.institution}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Account Number</p>
                    <p className="font-medium">{selectedBank.accountNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Routing Number</p>
                    <p className="font-medium">{selectedBank.details.routingNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Account Type</p>
                    <p className="font-medium">{selectedBank.details.accountType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Current Balance</p>
                    <p className="font-medium text-blue-500">
                      ${selectedBank.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Available Balance</p>
                    <p className="font-medium">
                      ${selectedBank.details.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Interest Rate</p>
                    <p className="font-medium">{selectedBank.details.interestRate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Pending Transactions</p>
                    <p className="font-medium">{selectedBank.details.pendingTransactions}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                      <div>Date</div>
                      <div>Description</div>
                      <div>Category</div>
                      <div className="text-right">Amount</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="text-sm">Jul 3, 2023</div>
                        <div className="text-sm font-medium">Grocery Store</div>
                        <div className="text-sm">Food & Dining</div>
                        <div className="text-sm font-medium text-right text-red-500">-$65.42</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="text-sm">Jul 1, 2023</div>
                        <div className="text-sm font-medium">Direct Deposit</div>
                        <div className="text-sm">Income</div>
                        <div className="text-sm font-medium text-right text-green-500">+$1,250.00</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="text-sm">Jun 29, 2023</div>
                        <div className="text-sm font-medium">Electric Bill</div>
                        <div className="text-sm">Utilities</div>
                        <div className="text-sm font-medium text-right text-red-500">-$85.75</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="text-sm">Jun 28, 2023</div>
                        <div className="text-sm font-medium">Restaurant</div>
                        <div className="text-sm">Food & Dining</div>
                        <div className="text-sm font-medium text-right text-red-500">-$42.18</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="text-sm">Jun 25, 2023</div>
                        <div className="text-sm font-medium">Gas Station</div>
                        <div className="text-sm">Transportation</div>
                        <div className="text-sm font-medium text-right text-red-500">-$35.50</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-blue-500">View All Transactions</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <div className="text-center py-10">
                  <p className="text-gray-500">View all transactions for this account in the Transactions section</p>
                  <Button className="mt-4">Go to Transactions</Button>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Nickname</h3>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={selectedBank.name}
                        />
                        <Button size="sm">Update</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Refresh Frequency</h3>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Every 6 hours (default)</option>
                        <option>Every 12 hours</option>
                        <option>Daily</option>
                        <option>Manual refresh only</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-6">
                    <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Disconnecting this account will remove all its data from APT_BANKING. This action cannot be undone.
                    </p>
                    <Button variant="destructive">Disconnect Account</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}