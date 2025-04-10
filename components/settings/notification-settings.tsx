"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Loader2, Save } from "lucide-react"

export function NotificationSettings() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    monthlyReports: false,
    transactionAlerts: true,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    if (!session?.user?.id) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/users/${session.user.id}/notifications`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error("Failed to update notification settings")
      }

      toast({
        title: "Settings updated",
        description: "Your notification settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update notification settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="budget-alerts" className="flex flex-col space-y-1">
            <span>Budget Alerts</span>
            <span className="font-normal text-sm text-muted-foreground">
              Receive alerts when you're approaching your budget limits
            </span>
          </Label>
          <Switch
            id="budget-alerts"
            checked={settings.budgetAlerts}
            onCheckedChange={() => handleToggle("budgetAlerts")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="weekly-reports" className="flex flex-col space-y-1">
            <span>Weekly Reports</span>
            <span className="font-normal text-sm text-muted-foreground">
              Receive weekly summary of your financial activity
            </span>
          </Label>
          <Switch
            id="weekly-reports"
            checked={settings.weeklyReports}
            onCheckedChange={() => handleToggle("weeklyReports")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="monthly-reports" className="flex flex-col space-y-1">
            <span>Monthly Reports</span>
            <span className="font-normal text-sm text-muted-foreground">
              Receive monthly detailed financial reports
            </span>
          </Label>
          <Switch
            id="monthly-reports"
            checked={settings.monthlyReports}
            onCheckedChange={() => handleToggle("monthlyReports")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="transaction-alerts" className="flex flex-col space-y-1">
            <span>Transaction Alerts</span>
            <span className="font-normal text-sm text-muted-foreground">Receive alerts for new transactions</span>
          </Label>
          <Switch
            id="transaction-alerts"
            checked={settings.transactionAlerts}
            onCheckedChange={() => handleToggle("transactionAlerts")}
          />
        </div>
      </div>

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </>
        )}
      </Button>
    </div>
  )
}

