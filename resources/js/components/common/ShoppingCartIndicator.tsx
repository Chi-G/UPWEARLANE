import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/hooks/useCart';
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ShoppingCartIndicator() {
    const { count } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);
    const prevCountRef = useRef(count);

    useEffect(() => {
        const prevCount = prevCountRef.current;
        if (count > prevCount) {
            const startAnimation = setTimeout(() => setIsAnimating(true), 0);
            const stopAnimation = setTimeout(() => setIsAnimating(false), 300);
            prevCountRef.current = count;
            return () => {
                clearTimeout(startAnimation);
                clearTimeout(stopAnimation);
            };
        }
        prevCountRef.current = count;
    }, [count]);

    return (
        <Link
            href="/shopping-cart"
            className="touch-target text-foreground hover:text-primary transition-smooth group relative flex items-center justify-center"
            aria-label={`Shopping cart with ${count} items`}
        >
            <Icon
                name="ShoppingCartIcon"
                size={24}
                className="transition-smooth group-hover:scale-110"
            />
            {count > 0 && (
                <span
                    className={`bg-primary text-primary-foreground font-data shadow-gold-sm transition-smooth absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                        isAnimating ? 'scale-125' : 'scale-100'
                    }`}
                    aria-live="polite"
                >
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    );
}
