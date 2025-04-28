import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { ArrowRight, BarChart3, Calendar, ChartPieIcon, CreditCard, DollarSign, Lock, PiggyBank, Shield, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">FinTrack+</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
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
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                  Smart Financial Management
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                    Manage Your Finances with Confidence
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    FinTrack+ helps you track expenses, manage budgets, and achieve your financial goals with powerful
                    analytics and insights. Take control of your financial future today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="/register">
                    <Button className="px-8 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-md">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="px-8 ml-0 mt-2 min-[400px]:ml-4 min-[400px]:mt-0">
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Financial Quote */}
                <div className="mt-8 p-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-md">
                  <p className="italic text-gray-700">"A budget is telling your money where to go instead of wondering where it went."</p>
                  <p className="text-sm text-gray-500 mt-1">— Dave Ramsey</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-white p-6 shadow-xl overflow-hidden">
                  {/* Dashboard Mockup */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-emerald-600 flex items-center px-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mt-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Total Balance</div>
                      <div className="font-bold text-emerald-600">$12,580.45</div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-emerald-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-emerald-600 mb-2" />
                        <div className="text-sm font-medium">Income</div>
                        <div className="text-lg font-bold">$4,250</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <CreditCard className="h-5 w-5 text-red-600 mb-2" />
                        <div className="text-sm font-medium">Expenses</div>
                        <div className="text-lg font-bold">$2,150</div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>Salary</div>
                        </div>
                        <div className="font-medium text-green-600">+$3,500</div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                            <CreditCard className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>Rent</div>
                        </div>
                        <div className="font-medium text-red-600">-$1,200</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                Why Choose FinTrack+
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Financial Journey Made Simple</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've designed FinTrack+ with your financial success in mind
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold">Secure & Private</h3>
                </div>
                <p className="text-gray-600 pl-13">
                  Your financial data is encrypted and protected with the highest security standards. We never share your information with third parties.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold">Flexible Budgeting</h3>
                </div>
                <p className="text-gray-600 pl-13">
                  Create daily, weekly, monthly, or yearly budgets that adapt to your lifestyle and financial goals.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ChartPieIcon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold">Insightful Analytics</h3>
                </div>
                <p className="text-gray-600 pl-13">
                  Gain valuable insights into your spending habits with beautiful, easy-to-understand charts and reports.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold">Multi-Currency Support</h3>
                </div>
                <p className="text-gray-600 pl-13">
                  Track your finances in multiple currencies, perfect for travelers, expats, or international businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                Powerful Features
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to take control of your finances and build a secure financial future
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:shadow-lg">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Wallet className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-gray-600 text-center">
                  Log and categorize your expenses to understand where your money goes. Track spending patterns and identify areas for improvement.
                </p>
                <ul className="text-sm text-gray-600 text-left w-full space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Multiple payment methods
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Custom categories
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Receipt attachments
                  </li>
                </ul>
                <Link href="/features/expense-tracking" className="mt-2">
                  <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:shadow-lg">
                <div className="rounded-full bg-emerald-100 p-3">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Smart Analytics</h3>
                <p className="text-gray-600 text-center">
                  Visualize your spending habits with interactive charts and insights. Make informed decisions based on your financial data.
                </p>
                <ul className="text-sm text-gray-600 text-left w-full space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Monthly spending reports
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Category breakdown
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Trend analysis
                  </li>
                </ul>
                <Link href="/features/analytics" className="mt-2">
                  <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:shadow-lg">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Budget Management</h3>
                <p className="text-gray-600 text-center">
                  Create and manage budgets for different categories. Set goals and track your progress to financial freedom.
                </p>
                <ul className="text-sm text-gray-600 text-left w-full space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Custom budget periods
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Spending alerts
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-emerald-500"></div>
                    Goal tracking
                  </li>
                </ul>
                <Link href="/features/budgeting" className="mt-2">
                  <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-600">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/register">
                <Button className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start Managing Your Finances
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                What Our Users Say
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Thousands</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how FinTrack+ has helped people take control of their financial future
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Testimonial 1 */}
              <div className="flex flex-col space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-500">Small Business Owner</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "FinTrack+ has completely transformed how I manage both my personal and business finances. The insights I get from the analytics have helped me save over $5,000 this year alone."
                </p>
                <div className="flex text-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Financial Advisor</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "I recommend FinTrack+ to all my clients. The budgeting tools are intuitive and the expense tracking makes it easy to identify spending patterns. It's a game-changer for financial planning."
                </p>
                <div className="flex text-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">MP</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Patel</h4>
                    <p className="text-sm text-gray-500">Graduate Student</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "As a student with limited income, FinTrack+ has been essential for managing my finances. The budget alerts keep me on track, and I've finally started building my emergency fund."
                </p>
                <div className="flex text-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Financial Quotes */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-md">
                <p className="italic text-gray-700 text-lg">"The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind."</p>
                <p className="text-sm text-gray-500 mt-2">— T.T. Munger</p>
              </div>
              <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-md">
                <p className="italic text-gray-700 text-lg">"Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest."</p>
                <p className="text-sm text-gray-500 mt-2">— Dave Ramsey</p>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/register">
                <Button className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Join Thousands of Happy Users
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
              Expense Tracking
            </Link>
            <Link href="/features/analytics" className="text-sm font-medium hover:underline underline-offset-4">
              Analytics
            </Link>
            <Link href="/features/budgeting" className="text-sm font-medium hover:underline underline-offset-4">
              Budgeting
            </Link>
          </nav>
          <p className="text-sm text-gray-500 md:ml-auto">© {new Date().getFullYear()} FinTrack+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

