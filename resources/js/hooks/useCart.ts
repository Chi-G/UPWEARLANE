import { CartItem, CurrencyCode } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'shopping_cart';

// Get conversion rates from Inertia shared props
const getConversionRates = (): Record<CurrencyCode, number> => {
    if (typeof window === 'undefined') {
        // Fallback for SSR
        return { USD: 1, GBP: 0.79, CAD: 1.36, NGN: 1650 };
    }

    try {
        // Access shared Inertia props from window
        const page = (window as Window & { page?: { props?: { currencyRates?: Record<string, { rate: number }> } } }).page || {};
        const currencyRates = page.props?.currencyRates || {};
        
        // Convert to simple rate mapping
        const rates: Record<string, number> = {};
        Object.keys(currencyRates).forEach(code => {
            rates[code] = currencyRates[code].rate;
        });
        
        // Return with fallback
        return {
            USD: rates.USD || 1,
            GBP: rates.GBP || 0.79,
            CAD: rates.CAD || 1.36,
            NGN: rates.NGN || 1650,
        };
    } catch {
        // Fallback rates if something goes wrong
        return { USD: 1, GBP: 0.79, CAD: 1.36, NGN: 1650 };
    }
};

// Convert price from one currency to another
const convertPrice = (basePrice: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number => {
    const rates = getConversionRates();
    const priceInUSD = basePrice / rates[fromCurrency];
    return priceInUSD * rates[toCurrency];
};

export function useCart() {
    // Initial state from localStorage if available (sync init for SSR safety)
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [subtotal, setSubtotal] = useState(0);

    const loadCart = () => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsedItems = JSON.parse(stored) as CartItem[];
                // Upgrade old cart items: add currency field if missing
                const upgradedItems = parsedItems.map(item => ({
                    ...item,
                    currency: item.currency || 'NGN', // Default to NGN for old items
                }));

                // Save upgraded items back if any were missing currency
                const needsUpgrade = parsedItems.some(item => !item.currency);
                if (needsUpgrade) {
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(upgradedItems));
                }

                setItems(upgradedItems);
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        } finally {
            setIsInitialized(true);
        }
    };

    useEffect(() => {
        loadCart();

        // Listen for storage changes (other tabs)
        const handleStorage = (e: StorageEvent) => {
            if (e.key === CART_STORAGE_KEY) {
                loadCart();
            }
        };

        // Listen for custom event (same tab components)
        const handleCustomEvent = () => loadCart();

        window.addEventListener('storage', handleStorage);
        window.addEventListener('cart-updated', handleCustomEvent);
 
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('cart-updated', handleCustomEvent);
        };
    }, []);

    // Calculate subtotal with dynamic currency conversion
    useEffect(() => {
        const calculateSubtotal = () => {
            const selectedCurrency = (localStorage.getItem('selected_currency') || 'NGN') as CurrencyCode;

            const total = items.reduce((sum, item) => {
                const itemBaseCurrency = (item.currency || 'NGN') as CurrencyCode;
                const basePrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0);
                const convertedPrice = convertPrice(basePrice, itemBaseCurrency, selectedCurrency);
                return sum + (convertedPrice * item.quantity);
            }, 0);

            setSubtotal(total);
        };

        calculateSubtotal();

        // Recalculate when currency changes
        window.addEventListener('currency-changed', calculateSubtotal);
        return () => window.removeEventListener('currency-changed', calculateSubtotal);
    }, [items]);

    const saveItems = (newItems: CartItem[]) => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
            setItems(newItems);
            // Dispatch event for other components
            window.dispatchEvent(new Event('cart-updated'));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    };

    const addToCart = (product: CartItem) => {
        const currentItems = [...items];
        const existingIndex = currentItems.findIndex(
            (item) =>
                item.id === product.id &&
                item.variations?.color === product.variations?.color &&
                item.variations?.size === product.variations?.size
        );

        if (existingIndex >= 0) {
            currentItems[existingIndex].quantity += product.quantity;
            toast.success('Cart Updated', {
                description: `${product.name} quantity increased`,
            });
        } else {
            currentItems.push(product);
            toast.success('Added to Cart', {
                description: `${product.name} has been added to your cart`,
            });
        }

        saveItems(currentItems);
    };

    const removeFromCart = (itemId: string) => {
        const removedItem = items.find((item) => item.id === itemId);
        const newItems = items.filter((item) => item.id !== itemId);
        saveItems(newItems);
        if (removedItem) {
            toast.info('Removed from Cart', {
                description: `${removedItem.name} has been removed`,
            });
        }
    };

    const updateQuantity = (itemId: string, newQty: number) => {
        if (newQty < 1) return;
        const newItems = items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQty } : item
        );
        saveItems(newItems);
    };

    const clearCart = () => {
        localStorage.removeItem(CART_STORAGE_KEY);
        setItems([]);
        window.dispatchEvent(new Event('cart-updated'));
    };

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        count,
        subtotal,
        isInitialized,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
}
