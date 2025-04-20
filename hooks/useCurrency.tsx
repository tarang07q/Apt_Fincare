import { useCurrencyContext } from "../components/currency-provider";

export const useCurrency = () => {
  const { currency, currencySymbol, formatCurrency } = useCurrencyContext();
  return { currency, currencySymbol, formatCurrency };
};
