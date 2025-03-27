"use client"

import { useState } from "react"
import { Bell, Check, Clock, CreditCard, DollarSign, Filter, Shield, Trash2 } from "lucide-react"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample notifications data
const allNotifications = [
  {
    id: "n1",
    title: "New Transaction",
    description: "You have a new transaction of $65.42 at Grocery Store",
    date: "2023-07-05T10:30:00",
    formattedDate: "Today, 10:30 AM",
    type: "transaction",
    isRead: false,
  },
  {
    id: "n2",
    title: "Security Alert",
    description: "Your password was changed successfully",
    date: "2023-07-04T15:45:00",
    formattedDate: "Yesterday, 3:45 PM",
    type: "security",
    isRead: true,
  },
  {
    id: "n3",
    title: "Low Balance Alert",
    description: "Your Chase Checking account balance is below $5,000",
    date: "2023-07-03T09:15:00",
    formattedDate: "Jul 3, 9:15 AM",
    type: "alert",
    isRead: false,
  },
  {
    id: "n4",
    title: "Transfer Complete",
    description: "Your transfer of $250 to Tarang has been completed",
    date: "2023-07-02T14:20:00",
    formattedDate: "Jul 2, 2:20 PM",
    type: "transaction",
    isRead: true,
  },
  {
    id: "n5",
    title: "New Feature Available",
    description: "Check out our new budgeting tools in the Analytics section",
    date: "2023-07-01T11:00:00",
    formattedDate: "Jul 1, 11:00 AM",
    type: "system",
    isRead: false,
  },
  {
    id: "n6",
    title: "Account Statement Ready",
    description: "Your June 2023 statement is now available for download",
    date: "2023-06-30T08:30:00",
    formattedDate: "Jun 30, 8:30 AM",
    type: "system",
    isRead: true,
  },
  {
    id: "n7",
    title: "Suspicious Activity Detected",
    description: "We noticed a login attempt from an unrecognized device",
    date: "2023-06-28T22:15:00",
    formattedDate: "Jun 28, 10:15 PM",
    type: "security",
    isRead: false,
  },
  {
    id: "n8",
    title: "Direct Deposit Received",
    description: "You received a direct deposit of $1,250.00",
    date: "2023-06-25T09:00:00",
    formattedDate: "Jun 25, 9:00 AM",
    type: "transaction",
    isRead: true,
  },
  {
    id: "n9",
    title: "Bank Account Connected",
    description: "Your Wells Fargo Savings account has been successfully connected",
    date: "2023-06-20T14:30:00",
    formattedDate: "Jun 20, 2:30 PM",
    type: "system",
    isRead: true,
  },
  {
    id: "n10",
    title: "Payment Due Soon",
    description: "Your credit card payment of $350 is due in 3 days",
    date: "2023-06-18T10:00:00",
    formattedDate: "Jun 18, 10:00 AM",
    type: "alert",
    isRead: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState("all")
  
  const unreadCount = notifications.filter(n => !n.isRead).length
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab || (activeTab === "unread" && !n.isRead))
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    )
  }
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    )
  }
  
  const clearAll = () => {
    setNotifications([])
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <DollarSign className="h-5 w-5 text-blue-500" />
      case "security":
        return <Shield className="h-5 w-5 text-red-500" />
      case "alert":
        return <Bell className="h-5 w-5 text-orange-500" />
      case "system":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="Notifications" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Your Notifications</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
              {unreadCount} unread
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          
          <Button variant="outline" size="sm" onClick={clearAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="transaction">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" ? "All Notifications" : 
                 activeTab === "unread" ? "Unread Notifications" : 
                 `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Notifications`}
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "flex items-start justify-between p-4 rounded-lg border",
                        notification.isRead ? "bg-white" : "bg-blue-50"
                      )}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            !notification.isRead && "font-semibold"
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.description}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            {notification.formattedDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 px-2 text-blue-500"
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 px-2 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                  <p className="text-gray-500">
                    {activeTab === "all" 
                      ? "You don't have any notifications yet." 
                      : `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}