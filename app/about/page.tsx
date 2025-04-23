import Link from "next/link"
import Image from "next/image"
import { Button } from "../../components/ui/button"
import { ArrowLeft, ArrowRight, BarChart3, Calendar, ChartPieIcon, CreditCard, DollarSign, Lock, PiggyBank, Shield, TrendingUp, Wallet, Users, Award, Heart } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 text-emerald-600">
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
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-2">
                Our Story
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                  About FinTrack+
                </h1>
                <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're on a mission to make personal finance management accessible, intuitive, and even enjoyable for everyone.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-16 space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-emerald-700">Our Mission</h2>
                  <p className="text-gray-600 mb-4">
                    At FinTrack+, we believe that financial freedom starts with understanding your money. Our mission is to empower individuals with the tools and insights they need to make informed financial decisions.
                  </p>
                  <p className="text-gray-600">
                    We're dedicated to creating a platform that simplifies complex financial management, making it accessible to everyone regardless of their financial literacy level.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="rounded-full bg-emerald-100 p-6">
                    <Award className="h-24 w-24 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-emerald-700">Our Values</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <span className="font-medium">Simplicity</span> - We believe financial tools should be intuitive and easy to use.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <span className="font-medium">Transparency</span> - We're committed to clear, honest communication with our users.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <span className="font-medium">Security</span> - Your financial data's security is our top priority.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <span className="font-medium">Empowerment</span> - We aim to give you the knowledge and tools to achieve financial freedom.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="rounded-full bg-emerald-100 p-6">
                    <Heart className="h-24 w-24 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-emerald-700">Our Team</h2>
                  <p className="text-gray-600 mb-4">
                    FinTrack+ was created by a team of passionate finance experts and software engineers who saw a need for a more user-friendly approach to personal finance management.
                  </p>
                  <p className="text-gray-600">
                    Our diverse team brings together expertise in financial planning, data analysis, and user experience design to create a platform that's both powerful and accessible.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="rounded-full bg-emerald-100 p-6">
                    <Users className="h-24 w-24 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-6 text-emerald-700">Ready to Take Control of Your Finances?</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                Join thousands of users who are already using FinTrack+ to manage their finances more effectively and work toward their financial goals.
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
