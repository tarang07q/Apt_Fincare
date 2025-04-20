"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "./button"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { ThreeDIcon } from "./3d-icon"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

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
]

export function NotificationBell() {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

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
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "budget":
        return "💰"
      case "transaction":
        return "💳"
      case "account":
        return "🔐"
      default:
        return "📣"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-muted/80 transition-colors">
          <div className="relative">
            <ThreeDIcon
              icon="solar:bell-bold-duotone"
              size={26}
              color={theme === 'dark' ? '#f3f4f6' : '#374151'}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center shadow-md border-2 border-background animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden">
        <div className="bg-primary/5 p-3 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThreeDIcon icon="solar:bell-bold-duotone" size={18} color="#10b981" />
              <span className="font-semibold">Notifications</span>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto py-1 px-2 text-xs text-primary hover:bg-primary/10 hover:text-primary"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <ThreeDIcon icon="solar:bell-sleep-bold-duotone" size={32} color="#9ca3af" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 border-b last:border-b-0 ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full justify-between">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <span className="font-medium">{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(notification.date)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <div className="p-2 bg-muted/10 border-t">
          <Button variant="ghost" size="sm" className="w-full justify-center text-sm font-medium hover:bg-primary/10" asChild>
            <Link href="/dashboard/notifications" onClick={() => setIsOpen(false)}>
              View all notifications
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
