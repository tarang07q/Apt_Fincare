import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, ArrowRight, CreditCard, DollarSign, PiggyBank, Tag, Receipt, Clock, Calendar, Filter, Search } from "lucide-react"
import { Card, CardContent } from "../../../components/ui/card"

export default function ExpenseTrackingPage() {
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
            <Link href="/features/expense-tracking" className="text-sm font-medium hover:underline underline-offset-4 text-emerald-600">
              Expense Tracking
            </Link>
            <Link href="/features/analytics" className="text-sm font-medium hover:underline underline-offset-4">
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
                  Expense Tracking
                </h1>
                <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track every dollar with our powerful and intuitive expense tracking system
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
                  <div className="mx-auto font-medium text-gray-600">Expense Tracker</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                      <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Grocery Shopping</div>
                            <div className="text-sm text-gray-500">Today, 2:34 PM</div>
                          </div>
                        </div>
                        <div className="font-bold text-red-600">-$78.45</div>
                      </div>

                      <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <DollarSign className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Salary Deposit</div>
                            <div className="text-sm text-gray-500">Yesterday</div>
                          </div>
                        </div>
                        <div className="font-bold text-green-600">+$2,450.00</div>
                      </div>

                      <div className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium">Restaurant</div>
                            <div className="text-sm text-gray-500">Oct 15, 2023</div>
                          </div>
                        </div>
                        <div className="font-bold text-red-600">-$42.80</div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/2 space-y-6">
                    <div className="p-6 border rounded-lg bg-gray-50">
                      <h3 className="text-lg font-bold mb-4">Add New Transaction</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input type="text" className="w-full p-2 border rounded-md" placeholder="What did you spend on?" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input type="text" className="w-full p-2 border rounded-md" placeholder="0.00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" className="w-full p-2 border rounded-md" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Groceries</option>
                            <option>Dining</option>
                            <option>Transportation</option>
                            <option>Entertainment</option>
                            <option>Utilities</option>
                          </select>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Save Transaction
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Categories</h3>
                  <p className="text-gray-600">
                    Create and customize expense categories that match your unique spending habits and financial goals.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Receipt className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Receipt Scanning</h3>
                  <p className="text-gray-600">
                    Capture receipts with your camera and automatically extract transaction details to save time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
                  <p className="text-gray-600">
                    Quickly find transactions with powerful search and filtering options by date, category, or amount.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-6 text-emerald-700">Ready to Start Tracking Your Expenses?</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                Join thousands of users who are already using FinTrack+ to gain control over their spending and save more money.
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
          <p className="text-sm text-gray-500 md:ml-auto">© 2025 FinTrack+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
