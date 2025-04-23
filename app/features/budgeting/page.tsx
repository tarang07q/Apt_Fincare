import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, ArrowRight, PiggyBank, Wallet, Bell, Target, Shield, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"

export default function BudgetingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">FinTrack+</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/features/expense-tracking" className="text-sm font-medium hover:underline underline-offset-4">
              Expense Tracking
            </Link>
            <Link href="/features/analytics" className="text-sm font-medium hover:underline underline-offset-4">
              Analytics
            </Link>
            <Link href="/features/budgeting" className="text-sm font-medium hover:underline underline-offset-4 text-emerald-600">
              Budgeting
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200 opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-100 opacity-10 blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                Feature Spotlight
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                  Budget Management
                </h1>
                <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Set financial goals, create budgets, and stay on track with smart alerts and insights
                </p>
              </div>
            </div>

            {/* Feature Mockup */}
            <div className="mt-16 mx-auto max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500">
                <div className="bg-white p-4 rounded-t-lg flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto font-medium text-gray-600">Budget Dashboard</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-800">Monthly Budgets</h3>
                      <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                        <PiggyBank className="h-4 w-4 mr-2" />
                        New Budget
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Groceries Budget */}
                      <div className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                              <Wallet className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-medium">Groceries</div>
                              <div className="text-sm text-gray-500">Monthly</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">$350 / $500</div>
                            <div className="text-sm text-emerald-600">$150 remaining</div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>70% used</div>
                          <div>10 days left</div>
                        </div>
                      </div>

                      {/* Entertainment Budget */}
                      <div className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                              <Wallet className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium">Entertainment</div>
                              <div className="text-sm text-gray-500">Monthly</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">$180 / $200</div>
                            <div className="text-sm text-amber-600">$20 remaining</div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>90% used</div>
                          <div>10 days left</div>
                        </div>
                      </div>

                      {/* Transportation Budget */}
                      <div className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Wallet className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">Transportation</div>
                              <div className="text-sm text-gray-500">Monthly</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">$120 / $150</div>
                            <div className="text-sm text-emerald-600">$30 remaining</div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>80% used</div>
                          <div>10 days left</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-6">
                    <div className="p-6 border rounded-lg bg-gray-50">
                      <h3 className="text-lg font-bold mb-4">Create New Budget</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
                          <input type="text" className="w-full p-2 border rounded-md" placeholder="e.g., Groceries, Rent, etc." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input type="text" className="w-full p-2 border rounded-md" placeholder="0.00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                            <select className="w-full p-2 border rounded-md" defaultValue="Monthly">
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Groceries</option>
                            <option>Housing</option>
                            <option>Transportation</option>
                            <option>Entertainment</option>
                            <option>Utilities</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="alerts"
                            className="mr-2"
                            defaultChecked={true}
                          />
                          <label htmlFor="alerts" className="text-sm text-gray-700">Enable budget alerts</label>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Create Budget
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center mb-4">
                        <Bell className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="font-bold">Budget Alerts</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start p-3 bg-amber-50 rounded-md">
                          <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-amber-800">Entertainment budget at 90%</div>
                            <div className="text-sm text-amber-700">You've used $180 of your $200 budget with 10 days remaining.</div>
                          </div>
                        </div>
                        <div className="flex items-start p-3 bg-emerald-50 rounded-md">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-emerald-800">Groceries budget on track</div>
                            <div className="text-sm text-emerald-700">You're on track with your grocery spending this month.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Key Budgeting Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Flexible Budget Periods</h3>
                  <p className="text-gray-600">
                    Create daily, weekly, monthly, or yearly budgets to match your financial planning needs.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Alerts</h3>
                  <p className="text-gray-600">
                    Receive timely notifications when you're approaching your budget limits to avoid overspending.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Goal Tracking</h3>
                  <p className="text-gray-600">
                    Set financial goals and track your progress with visual indicators and encouraging feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-6 text-emerald-700">Ready to Take Control of Your Spending?</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                Join thousands of users who are already using FinTrack+ to budget effectively and achieve their financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="px-8 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-md">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="px-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">FinTrack+</span>
          </div>
          <nav className="flex gap-4 md:gap-6 md:ml-auto">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/features/expense-tracking" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
          </nav>
          <p className="text-sm text-gray-500 md:ml-auto">© 2023 FinTrack+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
