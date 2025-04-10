"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

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

type CurrencySelectorProps = {
  value: string
  onValueChange: (value: string) => void
}

export function CurrencySelector({ value, onValueChange }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center">
              <span className="mr-2">{currency.symbol}</span>
              {currency.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

