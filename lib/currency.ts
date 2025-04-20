// Exchange rates relative to USD (as of a recent date)
// In a production app, you would use a real-time currency API
export const exchangeRates: Record<string, number> = {
  USD: 1.0,       // US Dollar
  EUR: 0.92,      // Euro
  GBP: 0.79,      // British Pound
  INR: 83.12,     // Indian Rupee
  JPY: 151.56,    // Japanese Yen
  AUD: 1.52,      // Australian Dollar
  CAD: 1.37,      // Canadian Dollar
  CNY: 7.24,      // Chinese Yuan
  KRW: 1345.78,   // South Korean Won
  AED: 3.67,      // UAE Dirham
  SGD: 1.35,      // Singapore Dollar
  CHF: 0.90,      // Swiss Franc
  MXN: 16.73,     // Mexican Peso
  BRL: 5.05,      // Brazilian Real
  ZAR: 18.31,     // South African Rand
  HKD: 7.82,      // Hong Kong Dollar
  SEK: 10.42,     // Swedish Krona
  NZD: 1.64,      // New Zealand Dollar
  THB: 35.97,     // Thai Baht
  RUB: 91.30,     // Russian Ruble
}

// Convert amount from USD to target currency
export function convertCurrency(amount: number, targetCurrency: string): number {
  if (!targetCurrency || targetCurrency === "USD") {
    return amount
  }

  const rate = exchangeRates[targetCurrency]
  if (!rate) {
    console.warn(`Exchange rate for ${targetCurrency} not found, using USD`)
    return amount
  }

  return amount * rate
}

// Convert amount from source currency to USD
export function convertToUSD(amount: number, sourceCurrency: string): number {
  if (!sourceCurrency || sourceCurrency === "USD") {
    return amount
  }

  const rate = exchangeRates[sourceCurrency]
  if (!rate) {
    console.warn(`Exchange rate for ${sourceCurrency} not found, using USD`)
    return amount
  }

  return amount / rate
}

// Convert amount from one currency to another
export function convertBetweenCurrencies(amount: number, fromCurrency: string, toCurrency: string): number {
  // First convert to USD
  const amountInUSD = convertToUSD(amount, fromCurrency)

  // Then convert from USD to target currency
  return convertCurrency(amountInUSD, toCurrency)
}
