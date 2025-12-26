import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';

export default function ShoppingCartIndicator() {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const loadCartCount = () => {
      try {
        const cartStr = localStorage.getItem('shopping_cart');
        const cart = cartStr ? JSON.parse(cartStr) : [];
        const totalItems = cart?.reduce((sum: number, item: any) => sum + (item?.quantity || 1), 0);
        setCartCount(totalItems);
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
      className="relative touch-target flex items-center justify-center text-foreground hover:text-primary transition-smooth group"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <Icon name="ShoppingCartIcon" size={24} className="group-hover:scale-110 transition-smooth" />
      {cartCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-data font-medium rounded-full shadow-gold-sm transition-smooth ${
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