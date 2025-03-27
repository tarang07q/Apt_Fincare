"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  Home, 
  LogOut, 
  Settings, 
  User, 
  Wallet,
  PlusCircle
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-blue-500",
  },
  {
    label: "My Banks",
    icon: CreditCard,
    href: "/dashboard/banks",
    color: "text-orange-500",
  },
  {
    label: "Transactions",
    icon: BarChart3,
    href: "/dashboard/transactions",
    color: "text-green-500",
  },
  {
    label: "Transfer Funds",
    icon: DollarSign,
    href: "/dashboard/transfer",
    color: "text-violet-500",
  },
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <h1 className="text-2xl font-bold text-blue-500">APT_BANKING</h1>
        </Link>
        <div className="space-y-1">
          <Button variant="outline" className="w-full justify-start mb-6 bg-blue-50 text-blue-500 border-blue-200">
            <PlusCircle className="mr-2 h-5 w-5" />
            Connect Bank
          </Button>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-blue-500 hover:bg-blue-50/50 rounded-lg transition",
                pathname === route.href ? "text-blue-500 bg-blue-50" : "text-gray-600"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t">
        <Link
          href="/"
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-500 hover:bg-red-50/50 rounded-lg transition text-gray-600"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-red-500" />
            Logout
          </div>
        </Link>
      </div>
    </div>
  )
}