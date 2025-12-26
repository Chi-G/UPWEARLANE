import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';

export default function OrderSummary({ subtotal, discount, tax, total, itemCount }: { subtotal: number, discount: number, tax: number, total: number, itemCount: number }) {
  const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });

  useEffect(() => {
    const loadCurrency = () => {
      const savedCode = localStorage.getItem('selected_currency') || 'USD';
      const currencies: Record<string, { symbol: string, code: string }> = {
        USD: { symbol: '$', code: 'USD' },
        GBP: { symbol: '£', code: 'GBP' },
        CAD: { symbol: 'C$', code: 'CAD' },
        NGN: { symbol: '₦', code: 'NGN' },
      };
      const currencyInfo = currencies[savedCode] || currencies.USD;
      setCurrency(currencyInfo);
    };

    loadCurrency();
    window.addEventListener('currency-changed', loadCurrency);
    return () => window.removeEventListener('currency-changed', loadCurrency);
  }, []);

  const formatPrice = (amount: number): string => {
    return `${currency?.symbol}${amount?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 sticky top-24">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-6">
        Order Summary
      </h2>
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-data font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-data font-medium text-success">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="font-data font-medium text-foreground">
            {formatPrice(tax)}
          </span>
        </div>

        {/* Shipping Note */}
        <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg">
          <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Shipping costs will be calculated at checkout based on your location
          </p>
        </div>
      </div>
      {/* Total */}
      <div className="pt-4 border-t border-border mb-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-semibold text-foreground">
            Total
          </span>
          <span className="font-data text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
            {formatPrice(total)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Final amount in {currency?.code}
        </p>
      </div>
      {/* Checkout Button */}
      <Link
        href="/checkout-flow"
        className="w-full h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect flex items-center justify-center gap-2 mb-3"
      >
        <span>Proceed to Checkout</span>
        <Icon name="ArrowRightIcon" size={20} />
      </Link>
      {/* Continue Shopping */}
      <Link
        href="/product-catalog"
        className="w-full h-12 px-8 bg-surface hover:bg-accent text-foreground font-medium rounded-lg border border-border transition-smooth press-effect flex items-center justify-center gap-2"
      >
        <Icon name="ArrowLeftIcon" size={20} />
        <span>Continue Shopping</span>
      </Link>
      {/* Trust Signals */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Icon name="ShieldCheckIcon" size={20} className="text-success" />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Icon name="TruckIcon" size={20} className="text-primary" />
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Icon name="ArrowPathIcon" size={20} className="text-primary" />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  subtotal: PropTypes?.number?.isRequired,
  discount: PropTypes?.number?.isRequired,
  tax: PropTypes?.number?.isRequired,
  total: PropTypes?.number?.isRequired,
  itemCount: PropTypes?.number?.isRequired,
};