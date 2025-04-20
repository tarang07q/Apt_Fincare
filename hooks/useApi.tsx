"use client"

import { useState, useCallback } from "react"
import { useCurrencyContext } from "../components/currency-provider"

export function useApi() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { currency } = useCurrencyContext()

  // Use useCallback to memoize the function and prevent infinite re-renders
  const fetchWithCurrency = useCallback(async <T,>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    setIsLoading(true)
    setError(null)

    try {
      // Add currency to URL as a query parameter
      const separator = url.includes("?") ? "&" : "?"
      const urlWithCurrency = `${url}${separator}currency=${currency}`

      const response = await fetch(urlWithCurrency, options)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API request failed with status ${response.status}`)
      }

      const data = await response.json()
      return data as T
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [currency]) // Only re-create this function when currency changes

  return {
    fetchWithCurrency,
    isLoading,
    error,
  }
}
