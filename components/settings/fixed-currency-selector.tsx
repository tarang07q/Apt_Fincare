"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useCurrencyContext } from "../../components/currency-provider"

const currencies = [
  { code: "USD", name: "US Dollar ($)", symbol: "$" },
  { code: "EUR", name: "Euro (€)", symbol: "€" },
  { code: "GBP", name: "British Pound (£)", symbol: "£" },
  { code: "JPY", name: "Japanese Yen (¥)", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan (¥)", symbol: "¥" },
  { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  { code: "CAD", name: "Canadian Dollar ($)", symbol: "$" },
  { code: "AUD", name: "Australian Dollar ($)", symbol: "$" },
  { code: "AED", name: "UAE Dirham (د.إ)", symbol: "د.إ" },
  { code: "SGD", name: "Singapore Dollar ($)", symbol: "$" },
  { code: "CHF", name: "Swiss Franc (Fr)", symbol: "Fr" },
  { code: "MXN", name: "Mexican Peso ($)", symbol: "$" },
  { code: "BRL", name: "Brazilian Real (R$)", symbol: "R$" },
  { code: "ZAR", name: "South African Rand (R)", symbol: "R" },
  { code: "HKD", name: "Hong Kong Dollar ($)", symbol: "$" },
  { code: "SEK", name: "Swedish Krona (kr)", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar ($)", symbol: "$" },
  { code: "THB", name: "Thai Baht (฿)", symbol: "฿" },
  { code: "KRW", name: "South Korean Won (₩)", symbol: "₩" },
  { code: "RUB", name: "Russian Ruble (₽)", symbol: "₽" },
]

export function FixedCurrencySelector() {
  const { currency, setCurrency } = useCurrencyContext()
  const [selectedCurrency, setSelectedCurrency] = useState(currency || "USD")
  
  // Initialize with the current currency from context
  useEffect(() => {
    if (currency && currency !== selectedCurrency) {
      setSelectedCurrency(currency)
    }
  }, [currency])
  
  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    console.log("Currency changed to:", value)
    
    // Update local state
    setSelectedCurrency(value)
    
    // Update global context
    setCurrency(value)
    
    // Update localStorage directly
    try {
      localStorage.setItem("currency", value)
      console.log("Currency saved to localStorage:", value)
    } catch (error) {
      console.error("Failed to save currency to localStorage:", error)
    }
    
    // Force a page refresh to ensure all components update
    // window.location.reload()
  }
  
  return (
    <div className="space-y-2">
      <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              <div className="flex items-center">
                <span className="mr-2">{curr.symbol}</span>
                {curr.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
