import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ShoppingCartIndicator() {
    const [cartCount, setCartCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const loadCartCount = () => {
            try {
                const cartStr = localStorage.getItem('shopping_cart');
                const cart = cartStr ? JSON.parse(cartStr) : [];
                const totalItems = cart?.reduce((sum: number, item: unknown) => {
                    const qty = (item as { quantity?: number })?.quantity ?? 1;
                    return sum + Number(qty || 0);
                }, 0);
                setCartCount(Number(totalItems || 0));
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartCount(0);
            }
        };

        loadCartCount();

        const handleStorageChange = (e: StorageEvent) => {
            if (e?.key === 'shopping_cart') {
                loadCartCount();
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cart-updated', loadCartCount);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cart-updated', loadCartCount);
        };
    }, []);

    return (
        <Link
            href="/shopping-cart"
            className="touch-target text-foreground hover:text-primary transition-smooth group relative flex items-center justify-center"
            aria-label={`Shopping cart with ${cartCount} items`}
        >
            <Icon
                name="ShoppingCartIcon"
                size={24}
                className="transition-smooth group-hover:scale-110"
            />
            {cartCount > 0 && (
                <span
                    className={`bg-primary text-primary-foreground font-data shadow-gold-sm transition-smooth absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                        isAnimating ? 'scale-125' : 'scale-100'
                    }`}
                    aria-live="polite"
                >
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </Link>
    );
}
