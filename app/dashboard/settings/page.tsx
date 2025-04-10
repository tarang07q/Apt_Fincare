"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { useToast } from "../../../components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../../../components/ui/form"
import { CurrencySelector } from "../../../components/settings/currency-selector"
import { ThemeSelector } from "../../../components/settings/theme-selector"
import { NotificationSettings } from "../../../components/settings/notification-settings"
import { ExportData } from "../../../components/settings/export-data"
import { DeleteAccount } from "../../../components/settings/delete-account"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

const preferencesFormSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  theme: z.enum(["light", "dark", "system"]),
  notifications: z.object({
    budgetAlerts: z.boolean(),
    weeklyReports: z.boolean(),
  }),
})

export default async function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userPreferences, setUserPreferences] = useState(null)
  const [currency, setCurrency] = useState("USD")
  const [theme, setTheme] = useState("system")

  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      currency: "USD",
      theme: "system",
      notifications: {
        budgetAlerts: true,
        weeklyReports: true,
      },
    },
  })

  const session = (await getServerSession(authOptions as any)) as { user?: { id: string } } | null;
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/preferences`)
        if (!response.ok) {
          throw new Error("Failed to fetch user preferences")
        }
        const data = await response.json()
        setUserPreferences(data)

        preferencesForm.reset({
          currency: data.currency || "USD",
          theme: data.theme || "system",
          notifications: {
            budgetAlerts: data.notifications?.budgetAlerts ?? true,
            weeklyReports: data.notifications?.weeklyReports ?? true,
          },
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user preferences",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserPreferences()
  }, [userId, toast, preferencesForm])

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, [theme]);

  const onPreferencesSubmit = async (values: z.infer<typeof preferencesFormSchema>) => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/users/${userId}/preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to update preferences")
      }

      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update preferences",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue="preferences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Form {...preferencesForm}>
                  <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                    <FormField
                      control={preferencesForm.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <CurrencySelector value={field.value} onValueChange={field.onChange} />
                          <FormDescription>Select the currency to use for displaying amounts</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={preferencesForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <ThemeSelector value={field.value} onValueChange={field.onChange} />
                          <FormDescription>Choose your preferred theme</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export or delete your account data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ExportData />
              <DeleteAccount />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

