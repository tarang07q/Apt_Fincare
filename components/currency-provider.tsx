"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Define a mapping of currency symbols
export const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CNY: "¥",
  KRW: "₩",
  AED: "د.إ",
  SGD: "$",
  CHF: "Fr",
  MXN: "$",
  BRL: "R$",
  ZAR: "R",
  HKD: "$",
  SEK: "kr",
  NZD: "$",
  THB: "฿",
  RUB: "₽",
}

type CurrencyContextType = {
  currency: string
  setCurrency: (currency: string) => void
  currencySymbol: string
  formatCurrency: (amount: number | undefined | null) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Initialize with value from localStorage if available
  const initialCurrency = typeof window !== 'undefined' ? localStorage.getItem("currency") || "USD" : "USD"
  const initialSymbol = currencySymbols[initialCurrency] || "$"

  const [currency, setCurrency] = useState(initialCurrency)
  const [currencySymbol, setCurrencySymbol] = useState(initialSymbol)

  // Initialize from localStorage or user preferences
  useEffect(() => {
    try {
      const storedCurrency = localStorage.getItem("currency")
      console.log("Stored currency from localStorage:", storedCurrency)
      if (storedCurrency && currencySymbols[storedCurrency]) {
        setCurrency(storedCurrency)
        setCurrencySymbol(currencySymbols[storedCurrency] || storedCurrency)
        console.log("Currency set to:", storedCurrency)
      } else {
        console.log("Using default currency: USD")
      }
    } catch (error) {
      console.error("Error reading currency from localStorage:", error)
    }
  }, [])

  // Update localStorage when currency changes
  useEffect(() => {
    try {
      console.log("CurrencyProvider - Currency changed to:", currency)
      localStorage.setItem("currency", currency)
      setCurrencySymbol(currencySymbols[currency] || currency)

      // Force a refresh of any components that depend on currency
      const event = new Event('currencyChanged')
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Error saving currency to localStorage:", error)
    }
  }, [currency])

  const formatCurrency = (amount: number | undefined | null): string => {
    if (typeof amount !== "number" || isNaN(amount)) return `${currencySymbol}0.00`
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrencyContext must be used within a CurrencyProvider")
  }
  return context
}
