"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Save } from "lucide-react"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

const addressFormSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
})

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "Tarang",
      lastName: "Bhargava",
      email: "dhknhk07@gmail.com",
      phone: "9999999999",
    },
  })

  const addressForm = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: "215 Sannasi C",
      city: "Chennai",
      state: "TN",
      postalCode: "603203",
      country: "India",
    },
  })

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
  }

  function onAddressSubmit(values: z.infer<typeof addressFormSchema>) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Address updated",
        description: "Your address information has been updated successfully.",
      })
    }, 1500)
  }

  function onSecuritySubmit(values: z.infer<typeof securityFormSchema>) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      securityForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header title="Profile" />
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover border-2 border-blue-500"
                />
                <Button size="sm" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M12 11v6" />
                    <path d="M9 14h6" />
                  </svg>
                </Button>
              </div>
              <h3 className="text-xl font-semibold">Tarang Bhargava</h3>
              <p className="text-gray-500">dhknhk07@example.com</p>
              <div className="w-full mt-6 space-y-2">
                <div className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                  <div className="text-sm">
                    <p className="font-medium">Member Since</p>
                    <p className="text-gray-500">January 15, 2025</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                  <div className="text-sm">
                    <p className="font-medium">Account Status</p>
                    <p className="text-green-500">Active</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                  <div className="text-sm">
                    <p className="font-medium">Verification</p>
                    <p className="text-blue-500">Verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>4
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the email address you use to sign in to your account.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Used for account verification and security alerts.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>
                    Update your address details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                      <FormField
                        control={addressForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State / Province</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                          control={addressForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securityForm}>
                    <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                      <FormField
                        control={securityForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              Password must be at least 8 characters long.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Change Password"
                        )}
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Protect your account with 2FA</p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">
                            Chrome on Windows • New York, USA • Started 2 hours ago
                          </p>
                        </div>
                        <div className="text-green-500 text-sm font-medium">Active</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">Mobile App</p>
                          <p className="text-sm text-gray-500">
                            iPhone 13 • New York, USA • Last active 1 day ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}