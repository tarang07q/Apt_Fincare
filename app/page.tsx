import Link from "next/link"
import { Button } from "../components/ui/button"
import { ArrowRight, BarChart3, Lock, PiggyBank, Wallet } from "lucide-react"

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
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Manage Your Finances with Confidence
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    FinTrack+ helps you track expenses, manage budgets, and achieve your financial goals with powerful
                    analytics and insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 w-full max-w-[400px]">
                      <div className="h-8 w-3/4 rounded-md bg-emerald-200/60"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded-md bg-emerald-200/60"></div>
                        <div className="h-4 w-5/6 rounded-md bg-emerald-200/60"></div>
                        <div className="h-4 w-4/6 rounded-md bg-emerald-200/60"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-24 rounded-md bg-emerald-500/70"></div>
                        <div className="h-8 w-24 rounded-md bg-emerald-300/60"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to take control of your finances
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Wallet className="h-12 w-12 text-emerald-600" />
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-sm text-gray-500 text-center">
                  Log and categorize your expenses to understand where your money goes
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-emerald-600" />
                <h3 className="text-xl font-bold">Smart Analytics</h3>
                <p className="text-sm text-gray-500 text-center">
                  Visualize your spending habits with interactive charts and insights
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Lock className="h-12 w-12 text-emerald-600" />
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-sm text-gray-500 text-center">
                  Your financial data is encrypted and securely stored
                </p>
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
          <p className="text-sm text-gray-500 md:ml-auto">© 2023 FinTrack+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

