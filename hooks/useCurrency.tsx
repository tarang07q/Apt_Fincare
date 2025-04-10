import { useMemo } from "react";

// Define a mapping of currency symbols
const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CNY: "¥",
  KRW: "₩",
  // Add more currencies as needed
};

export const useCurrency = (currency: string = "USD") => {
  const formatCurrency = useMemo(() => {
    return (amount: number | undefined | null) => {
      if (typeof amount !== "number" || isNaN(amount)) return `${currencySymbols[currency] || currency}0.00`;
      const symbol = currencySymbols[currency] || currency;
      return `${symbol}${amount.toFixed(2)}`;
    };
  }, [currency]);

  return { formatCurrency };
};
