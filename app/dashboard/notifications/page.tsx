"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { ThreeDIcon } from "../../../components/ui/3d-icon"
import { Loader2 } from "lucide-react"

export default function NotificationsPage() {
  const { data: session, status } = useSession()
  const { theme } = useTheme()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/notifications")
        if (!res.ok) throw new Error("Failed to fetch notifications")
        const data = await res.json()
        // Ensure date fields are Date objects
        const notificationsWithDates = data.notifications.map((n: any) => ({
          ...n,
          date: new Date(n.date),
        }))
        setNotifications(notificationsWithDates)
      } catch (error) {
        setNotifications([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    // Optionally, update on server:
    await fetch(`/api/notifications/${id}/read`, { method: "POST" })
  }

  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    )
    // Optionally, update on server:
    await fetch(`/api/notifications/mark-all-read`, { method: "POST" })
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