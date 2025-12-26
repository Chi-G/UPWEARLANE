import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function OrderSummary({
    subtotal,
    discount,
    tax,
    total,
    itemCount,
}: {
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    itemCount: number;
}) {
    const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });

    useEffect(() => {
        const loadCurrency = () => {
            const savedCode =
                localStorage.getItem('selected_currency') || 'USD';
            const currencies: Record<string, { symbol: string; code: string }> =
                {
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
        return () =>
            window.removeEventListener('currency-changed', loadCurrency);
    }, []);

    const formatPrice = (amount: number): string => {
        return `${currency?.symbol}${amount?.toFixed(2)}`;
    };

    return (
        <div className="bg-card border-border sticky top-24 rounded-lg border p-4 md:p-6">
            <h2 className="font-heading text-foreground mb-6 text-xl font-semibold md:text-2xl">
                Order Summary
            </h2>
            <div className="mb-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-base">
                    <span className="text-muted-foreground">
                        Subtotal ({itemCount}{' '}
                        {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-data text-foreground font-medium">
                        {formatPrice(subtotal)}
                    </span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                    <div className="flex items-center justify-between text-base">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-data text-success font-medium">
                            -{formatPrice(discount)}
                        </span>
                    </div>
                )}

                {/* Tax */}
                <div className="flex items-center justify-between text-base">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-data text-foreground font-medium">
                        {formatPrice(tax)}
                    </span>
                </div>

                {/* Shipping Note */}
                <div className="bg-accent/50 flex items-start gap-2 rounded-lg p-3">
                    <Icon
                        name="InformationCircleIcon"
                        size={20}
                        className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-muted-foreground text-sm">
                        Shipping costs will be calculated at checkout based on
                        your location
                    </p>
                </div>
            </div>
            {/* Total */}
            <div className="border-border mb-6 border-t pt-4">
                <div className="flex items-center justify-between">
                    <span className="font-heading text-foreground text-lg font-semibold">
                        Total
                    </span>
                    <span className="font-data text-primary whitespace-nowrap text-2xl font-bold md:text-3xl">
                        {formatPrice(total)}
                    </span>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                    Final amount in {currency?.code}
                </p>
            </div>
            {/* Checkout Button */}
            <Link
                href="/checkout-flow"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg px-8 font-medium"
            >
                <span>Proceed to Checkout</span>
                <Icon name="ArrowRightIcon" size={20} />
            </Link>
            {/* Continue Shopping */}
            <Link
                href="/product-catalog"
                className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-full items-center justify-center gap-2 rounded-lg border px-8 font-medium"
            >
                <Icon name="ArrowLeftIcon" size={20} />
                <span>Continue Shopping</span>
            </Link>
            {/* Trust Signals */}
            <div className="border-border mt-6 space-y-3 border-t pt-6">
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <Icon
                        name="ShieldCheckIcon"
                        size={20}
                        className="text-success"
                    />
                    <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <Icon name="TruckIcon" size={20} className="text-primary" />
                    <span>Free shipping on orders over $100</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <Icon
                        name="ArrowPathIcon"
                        size={20}
                        className="text-primary"
                    />
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
