import { CurrencyCode } from '@/types';

// Get conversion rates from shared Inertia props or fallback
export const getConversionRates = (): Record<CurrencyCode, number> => {
    if (typeof window === 'undefined') {
        return { USD: 1, GBP: 0.79, CAD: 1.36, NGN: 1650 };
    }

    try {
        const page = (window as Window & { page?: { props?: { currencyRates?: Record<string, { rate: number }> } } }).page || {};
        const currencyRates = page.props?.currencyRates || {};
        const rates: Record<string, number> = {};
        Object.keys(currencyRates).forEach(code => {
            rates[code] = currencyRates[code].rate;
        });
        return {
            USD: rates.USD || 1,
            GBP: rates.GBP || 0.79,
            CAD: rates.CAD || 1.36,
            NGN: rates.NGN || 1650,
        };
    } catch {
        return { USD: 1, GBP: 0.79, CAD: 1.36, NGN: 1650 };
    }
};

// Get currency symbols
export const getCurrencySymbols = (): Record<CurrencyCode, string> => {
    if (typeof window === 'undefined') {
        return { USD: '$', GBP: '£', CAD: 'C$', NGN: '₦' };
    }

    try {
        const page = (window as Window & { page?: { props?: { currencyRates?: Record<string, { symbol: string }> } } }).page || {};
        const currencyRates = page.props?.currencyRates || {};
        const symbols: Record<string, string> = {};
        Object.keys(currencyRates).forEach(code => {
            symbols[code] = currencyRates[code].symbol;
        });
        return {
            USD: symbols.USD || '$',
            GBP: symbols.GBP || '£',
            CAD: symbols.CAD || 'C$',
            NGN: symbols.NGN || '₦',
        };
    } catch {
        return { USD: '$', GBP: '£', CAD: 'C$', NGN: '₦' };
    }
};

// Convert price from one currency to another
export const convertPrice = (basePrice: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number => {
    const rates = getConversionRates();
    const priceInUSD = basePrice / rates[fromCurrency];
    return priceInUSD * rates[toCurrency];
};

// Get selected currency from localStorage
export const getSelectedCurrency = (): CurrencyCode => {
    if (typeof window === 'undefined') return 'NGN';
    return (localStorage.getItem('selected_currency') || 'NGN') as CurrencyCode;
};

// Format price with currency symbol
export const formatPrice = (price: number, currency: CurrencyCode): string => {
    const symbols = getCurrencySymbols();
    const symbol = symbols[currency] || '₦';
    return `${symbol}${price.toFixed(2)}`;
};
