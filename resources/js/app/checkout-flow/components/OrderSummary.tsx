import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import { OrderSummaryProps, CartItem, Currency, CurrencyCode } from '@/types';

export default function OrderSummary({ shippingCost, onCurrencyUpdate }: OrderSummaryProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$' });
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => { 
    const loadCart = () => {
      try {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
        setCartItems(cart);
        
        const total = cart?.reduce((sum, item) => {
          const price = item?.price || 0;
          const quantity = item?.quantity || 1;
          return sum + (price * quantity);
        }, 0);
        setSubtotal(total);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
        setSubtotal(0);
      }
    };

    const loadCurrency = () => {
      const savedCode = localStorage.getItem('selected_currency') || 'USD';
      const currencies: Record<CurrencyCode, Currency> = {
        USD: { code: 'USD', symbol: '$' },
        GBP: { code: 'GBP', symbol: '£' },
        CAD: { code: 'CAD', symbol: 'C$' },
        NGN: { code: 'NGN', symbol: '₦' },
      };
      setCurrency(currencies[savedCode as CurrencyCode] || currencies.USD);
    };

    loadCart();
    loadCurrency();

    const handleCartUpdate = () => loadCart();
    const handleCurrencyChange = () => loadCurrency();

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('currency-changed', handleCurrencyChange);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('currency-changed', handleCurrencyChange);
    };
  }, []);

  useEffect(() => {
    if (onCurrencyUpdate) {
      onCurrencyUpdate(currency);
    }
  }, [currency, onCurrencyUpdate]);

  const total = subtotal + shippingCost;

  return (
    <div className="bg-surface rounded-lg border border-border p-4 md:p-6 lg:p-8 space-y-6">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
        Order Summary
      </h2>
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-4">
            <div className="relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <AppImage
                src={item?.image}
                alt={item?.alt || `${item?.name} product image`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                {item?.name}
              </h3>
              {item?.variations?.color && (
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Color: {item?.variations?.color}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs md:text-sm text-muted-foreground">
                  Qty: {item?.quantity}
                </span>
                <span className="font-data text-sm md:text-base font-medium text-foreground">
                  {currency?.symbol}{(item?.price * item?.quantity)?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-data font-medium text-foreground">
            {currency?.symbol}{subtotal?.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-data font-medium text-foreground">
            {shippingCost > 0 ? `${currency?.symbol}${shippingCost?.toFixed(2)}` : 'Calculated at next step'}
          </span>
        </div>
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <span className="text-base md:text-lg font-semibold text-foreground">Total</span>
          <span className="font-data text-xl md:text-2xl font-bold text-primary">
            {currency?.symbol}{total?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  shippingCost: PropTypes?.number?.isRequired,
  onCurrencyUpdate: PropTypes?.func,
};