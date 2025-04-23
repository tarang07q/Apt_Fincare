import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, ArrowRight, BarChart3, PieChart, PiggyBank, TrendingUp, LineChart, Calendar, Download, Share2 } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"

export default function AnalyticsPage() {
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
            <Link href="/features/analytics" className="text-sm font-medium hover:underline underline-offset-4 text-emerald-600">
              Analytics
            </Link>
            <Link href="/features/budgeting" className="text-sm font-medium hover:underline underline-offset-4">
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
                  Smart Analytics
                </h1>
                <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Gain powerful insights into your spending habits with beautiful, interactive visualizations
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
                  <div className="mx-auto font-medium text-gray-600">Financial Analytics Dashboard</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800">Monthly Overview</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      October 2023
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Spending by Category */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-4">Spending by Category</h4>
                    <div className="flex justify-center">
                      <div className="relative w-48 h-48">
                        {/* Simulated pie chart */}
                        <div className="absolute inset-0 rounded-full border-8 border-emerald-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">$2,450</div>
                            <div className="text-xs text-gray-500">Total Spent</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 mr-2"></div>
                        <span className="text-sm">Housing (35%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                        <span className="text-sm">Food (25%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 mr-2"></div>
                        <span className="text-sm">Transport (20%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 mr-2"></div>
                        <span className="text-sm">Other (20%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Income vs Expenses */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-4">Income vs Expenses</h4>
                    <div className="h-48 flex items-end justify-around gap-4 pb-4">
                      {/* Simulated bar chart */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-emerald-500 rounded-t-md" style={{ height: '120px' }}></div>
                        <div className="mt-2 text-sm font-medium">Income</div>
                        <div className="text-sm text-emerald-600">$4,250</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-red-500 rounded-t-md" style={{ height: '70px' }}></div>
                        <div className="mt-2 text-sm font-medium">Expenses</div>
                        <div className="text-sm text-red-600">$2,450</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 bg-blue-500 rounded-t-md" style={{ height: '50px' }}></div>
                        <div className="mt-2 text-sm font-medium">Savings</div>
                        <div className="text-sm text-blue-600">$1,800</div>
                      </div>
                    </div>
                  </div>

                  {/* Spending Trends */}
                  <div className="border rounded-lg p-4 md:col-span-2">
                    <h4 className="font-medium mb-4">Spending Trends (Last 6 Months)</h4>
                    <div className="h-48 relative">
                      {/* Simulated line chart */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
                      <div className="absolute top-0 left-0 bottom-0 w-px bg-gray-200"></div>

                      <svg className="w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
                        {/* Income line */}
                        <path d="M0,120 L100,100 L200,110 L300,90 L400,70 L500,50 L600,30" fill="none" stroke="#10b981" strokeWidth="3" />

                        {/* Expense line */}
                        <path d="M0,130 L100,120 L200,140 L300,110 L400,100 L500,90 L600,80" fill="none" stroke="#ef4444" strokeWidth="3" />
                      </svg>

                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                        <div>May</div>
                        <div>Jun</div>
                        <div>Jul</div>
                        <div>Aug</div>
                        <div>Sep</div>
                        <div>Oct</div>
                      </div>

                      <div className="absolute top-2 right-2 flex items-center gap-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-emerald-500 mr-1 rounded-full"></div>
                          <span className="text-xs">Income</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 mr-1 rounded-full"></div>
                          <span className="text-xs">Expenses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Key Analytics Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <PieChart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Spending Breakdown</h3>
                  <p className="text-gray-600">
                    Visualize where your money goes with detailed category breakdowns and interactive pie charts.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trend Analysis</h3>
                  <p className="text-gray-600">
                    Track your financial progress over time with beautiful trend lines and historical comparisons.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Income vs Expenses</h3>
                  <p className="text-gray-600">
                    Compare your income and expenses to identify saving opportunities and optimize your budget.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-6 text-emerald-700">Ready to Gain Financial Insights?</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                Join thousands of users who are already using FinTrack+ to visualize their finances and make smarter decisions.
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
