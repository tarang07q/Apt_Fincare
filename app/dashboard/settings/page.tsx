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
import { FixedCurrencySelector } from "../../../components/settings/fixed-currency-selector"
import { ThemeSelector } from "../../../components/settings/theme-selector"
import { NotificationSettings } from "../../../components/settings/notification-settings"
import { ExportData } from "../../../components/settings/export-data"
import { DeleteAccount } from "../../../components/settings/delete-account"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import { useCurrencyContext } from "../../../components/currency-provider"

const preferencesFormSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  theme: z.enum(["light", "dark", "system"]),
  notifications: z.object({
    budgetAlerts: z.boolean(),
    weeklyReports: z.boolean(),
  }),
})

export default function SettingsPage() {
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setTheme, theme } = useTheme()
  const { currency, setCurrency } = useCurrencyContext()

  // Local state for form values
  const [selectedTheme, setSelectedTheme] = useState(theme || "light")
  const [selectedCurrency, setSelectedCurrency] = useState(currency || "USD")

  // Get the tab from URL query parameters
  const tabParam = searchParams.get('tab')

  // Debug current currency and theme
  useEffect(() => {
    console.log("Settings page - Current currency:", currency)
    console.log("Settings page - Current theme:", theme)
  }, [currency, theme])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userPreferences, setUserPreferences] = useState(null)

  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      currency: currency || "USD",
      theme: theme || "system",
      notifications: {
        budgetAlerts: true,
        weeklyReports: true,
      },
    },
  })

  // Check if user is authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const userId = session?.user?.id

  useEffect(() => {
    let isMounted = true;

    const fetchUserPreferences = async () => {
      if (!userId) {
        if (isMounted) setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/users/${userId}/preferences`)
        if (!response.ok) {
          throw new Error("Failed to fetch user preferences")
        }
        const data = await response.json()

        if (isMounted) {
          setUserPreferences(data)

          // Use the current theme and currency from providers as fallbacks
          preferencesForm.reset({
            currency: data.currency || currency || "USD",
            theme: data.theme || theme || "system",
            notifications: {
              budgetAlerts: data.notifications?.budgetAlerts ?? true,
              weeklyReports: data.notifications?.weeklyReports ?? true,
            },
          })
        }
      } catch (error) {
        if (isMounted) {
          // If there's an error, still initialize the form with current theme and currency
          preferencesForm.reset({
            currency: currency || "USD",
            theme: theme || "system",
            notifications: {
              budgetAlerts: true,
              weeklyReports: true,
            },
          })

          toast({
            title: "Error",
            description: "Failed to load user preferences",
            variant: "destructive",
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchUserPreferences()

    return () => {
      isMounted = false;
    };
  }, [userId, toast, preferencesForm, currency, theme])

  // Theme and currency are now handled by their respective providers

  const onPreferencesSubmit = async (values: z.infer<typeof preferencesFormSchema>) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to update preferences",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      // Update theme in provider
      console.log("Saving preferences - Theme:", values.theme)
      console.log("Saving preferences - Currency:", values.currency)

      // Update theme in provider and localStorage
      setTheme(values.theme)
      localStorage.setItem("theme", values.theme)

      // Update currency in provider and localStorage
      setCurrency(values.currency)
      localStorage.setItem("currency", values.currency)

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

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authenticated, don't render anything (redirect happens in useEffect)
  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue={tabParam === 'notifications' ? 'notifications' : tabParam === 'data' ? 'data' : 'preferences'} className="space-y-4">
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
                          <FixedCurrencySelector
                            onChange={(value) => {
                              // Only update the form value, not the actual currency yet
                              field.onChange(value);
                              console.log("Currency selected (not saved yet):", value);
                            }}
                          />
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
                          <ThemeSelector
                            value={field.value}
                            onValueChange={(value) => {
                              // Only update the form value, not the actual theme yet
                              field.onChange(value);
                              console.log("Theme selected (not saved yet):", value);
                            }}
                          />
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

