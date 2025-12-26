import AppImage from '@/components/ui/AppImage';
import { CartItem, Currency, CurrencyCode, OrderSummaryProps } from '@/types';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function OrderSummary({
    shippingCost,
    onCurrencyUpdate,
}: OrderSummaryProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>({
        code: 'USD',
        symbol: '$',
    });
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const loadCart = () => {
            try {
                const cart: CartItem[] = JSON.parse(
                    localStorage.getItem('shopping_cart') || '[]',
                );
                setCartItems(cart);

                const total = cart?.reduce((sum, item) => {
                    const price = item?.price || 0;
                    const quantity = item?.quantity || 1;
                    return sum + price * quantity;
                }, 0);
                setSubtotal(total);
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartItems([]);
                setSubtotal(0);
            }
        };

        const loadCurrency = () => {
            const savedCode =
                localStorage.getItem('selected_currency') || 'USD';
            const currencies: Record<CurrencyCode, Currency> = {
                USD: { code: 'USD', symbol: '$' },
                GBP: { code: 'GBP', symbol: '£' },
                CAD: { code: 'CAD', symbol: 'C$' },
                NGN: { code: 'NGN', symbol: '₦' },
            };
            setCurrency(
                currencies[savedCode as CurrencyCode] || currencies.USD,
            );
        };

        loadCart();
        loadCurrency();

        const handleCartUpdate = () => loadCart();
        const handleCurrencyChange = () => loadCurrency();

        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('currency-changed', handleCurrencyChange);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener(
                'currency-changed',
                handleCurrencyChange,
            );
        };
    }, []);

    useEffect(() => {
        if (onCurrencyUpdate) {
            onCurrencyUpdate(currency);
        }
    }, [currency, onCurrencyUpdate]);

    const total = subtotal + shippingCost;

    return (
        <div className="bg-surface border-border space-y-6 rounded-lg border p-4 md:p-6 lg:p-8">
            <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
                Order Summary
            </h2>
            <div className="space-y-4">
                {cartItems?.map((item) => (
                    <div key={item?.id} className="flex items-start space-x-4">
                        <div className="bg-muted relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg md:h-24 md:w-20">
                            <AppImage
                                src={item?.image}
                                alt={item?.alt || `${item?.name} product image`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-foreground line-clamp-2 text-sm font-medium md:text-base">
                                {item?.name}
                            </h3>
                            {item?.variations?.color && (
                                <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                                    Color: {item?.variations?.color}
                                </p>
                            )}
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-muted-foreground text-xs md:text-sm">
                                    Qty: {item?.quantity}
                                </span>
                                <span className="font-data text-foreground text-sm font-medium md:text-base">
                                    {currency?.symbol}
                                    {(item?.price * item?.quantity)?.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-border space-y-3 border-t pt-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-data text-foreground font-medium">
                        {currency?.symbol}
                        {subtotal?.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-data text-foreground font-medium">
                        {shippingCost > 0
                            ? `${currency?.symbol}${shippingCost?.toFixed(2)}`
                            : 'Calculated at next step'}
                    </span>
                </div>
                <div className="border-border flex items-center justify-between border-t pt-3">
                    <span className="text-foreground text-base font-semibold md:text-lg">
                        Total
                    </span>
                    <span className="font-data text-primary text-xl font-bold md:text-2xl">
                        {currency?.symbol}
                        {total?.toFixed(2)}
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
