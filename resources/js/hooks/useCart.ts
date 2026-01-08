import { CartItem } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'shopping_cart';

export function useCart() {
    // Initial state from localStorage if available (sync init for SSR safety)
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const loadCart = () => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored)); 
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
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
