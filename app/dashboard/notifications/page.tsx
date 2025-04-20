"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { ThreeDIcon } from "../../../components/ui/3d-icon"
import { Loader2 } from "lucide-react"

// Mock notifications for demo purposes
// In a real app, these would come from an API
const mockNotifications = [
  {
    id: "1",
    title: "Budget Alert",
    message: "You've used 85% of your Groceries budget",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: "budget",
  },
  {
    id: "2",
    title: "Transaction Alert",
    message: "New transaction: $45.99 at Amazon",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "transaction",
  },
  {
    id: "3",
    title: "Account Activity",
    message: "New login from Chrome on Windows",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    type: "account",
  },
  {
    id: "4",
    title: "Budget Alert",
    message: "You've used 100% of your Entertainment budget",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    type: "budget",
  },
  {
    id: "5",
    title: "Transaction Alert",
    message: "New transaction: $12.50 at Starbucks",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: true,
    type: "transaction",
  },
  {
    id: "6",
    title: "Weekly Report",
    message: "Your weekly financial summary is ready",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    read: true,
    type: "report",
  },
]

export default function NotificationsPage() {
  const { data: session, status } = useSession()
  const { theme } = useTheme()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    )
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "budget":
        return <ThreeDIcon icon="solar:wallet-money-bold-duotone" size={24} color="#10b981" />
      case "transaction":
        return <ThreeDIcon icon="solar:card-transfer-bold-duotone" size={24} color="#3b82f6" />
      case "account":
        return <ThreeDIcon icon="solar:shield-user-bold-duotone" size={24} color="#8b5cf6" />
      case "report":
        return <ThreeDIcon icon="solar:document-text-bold-duotone" size={24} color="#f59e0b" />
      default:
        return <ThreeDIcon icon="solar:bell-bold-duotone" size={24} color="#6b7280" />
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const unreadCount = notifications.filter(n => !n.read).length

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">View and manage your notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            className="self-start"
          >
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="transaction">Transactions</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThreeDIcon icon="solar:bell-bold-duotone" size={24} color="#10b981" />
                {activeTab === "all" ? "All Notifications" : 
                 activeTab === "unread" ? "Unread Notifications" :
                 activeTab === "budget" ? "Budget Notifications" :
                 activeTab === "transaction" ? "Transaction Notifications" :
                 activeTab === "account" ? "Account Notifications" : "Notifications"}
              </CardTitle>
              <CardDescription>
                {activeTab === "all" ? "View all your notifications" : 
                 activeTab === "unread" ? "View your unread notifications" :
                 activeTab === "budget" ? "Notifications about your budgets" :
                 activeTab === "transaction" ? "Notifications about your transactions" :
                 activeTab === "account" ? "Notifications about your account activity" : "Your notifications"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                  <ThreeDIcon icon="solar:bell-sleep-bold-duotone" size={48} color="#9ca3af" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg ${!notification.read ? 'bg-primary/5' : 'hover:bg-muted/50'} transition-colors cursor-pointer`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
