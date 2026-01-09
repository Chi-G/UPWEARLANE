import Icon from '@/components/ui/AppIcon';
import { PaymentFormProps, CartItem, CurrencyCode, Currency } from '@/types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get conversion rates
const getConversionRates = (): Record<CurrencyCode, number> => {
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

// Convert price from USD to selected currency
const convertPrice = (usdPrice: number, toCurrency: CurrencyCode): number => {
    const rates = getConversionRates();
    return usdPrice * rates[toCurrency];
};

const PAYMENT_METHODS = [
    {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: 'CreditCardIcon',
        description: 'Visa, Mastercard, Amex',
    },
    {
        id: 'crypto',
        name: 'Cryptocurrency',
        icon: 'CurrencyDollarIcon',
        description: 'Bitcoin, Ethereum, USDT',
    },
];

const CRYPTO_OPTIONS = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        icon: '₿',
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'Ξ',
    },
    {
        id: 'usdc',
        name: 'USDC Coin',
        symbol: 'USDC',
        icon: '$',
    },
];

function PaymentForm({
    onBack,
}: Omit<PaymentFormProps, 'onPaymentComplete'>) {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [displayCurrency, setDisplayCurrency] = useState<Currency>({
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        region: 'USA',
    });
    const [usdTotal, setUsdTotal] = useState(0);
    const [displayTotal, setDisplayTotal] = useState(0);

    useEffect(() => {
        // Load cart
        try {
            const cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
            setCartItems(cart);

            // Load display currency
            const savedCode = (localStorage.getItem('selected_currency') || 'USD') as CurrencyCode;
            const currencies: Record<CurrencyCode, Currency> = {
                NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', region: 'Nigeria' },
                USD: { code: 'USD', symbol: '$', name: 'US Dollar', region: 'USA' },
                GBP: { code: 'GBP', symbol: '£', name: 'British Pound', region: 'UK' },
                CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', region: 'Canada' },
            };
            setDisplayCurrency(currencies[savedCode] || currencies.USD);

            // Calculate totals
            const shippingMethod = JSON.parse(
                localStorage.getItem('checkout_shipping_method') || '{}'
            );
            const shippingCost = parseFloat(shippingMethod.cost) || 0;

            const subtotal = cart.reduce((sum: number, item: CartItem) => {
                const usdPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                return sum + (usdPrice * item.quantity);
            }, 0);
            const tax = subtotal * 0.1;
            const totalUsd = subtotal + shippingCost + tax;

            setUsdTotal(totalUsd);
            setDisplayTotal(convertPrice(totalUsd, savedCode));
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Get shipping and delivery info from localStorage
            const shippingAddress = JSON.parse(
                localStorage.getItem('checkout_shipping_address') || '{}'
            );
            const shippingMethod = JSON.parse(
                localStorage.getItem('checkout_shipping_method') || '{}'
            );

            if (!shippingAddress.fullName || !shippingMethod.id) {
                setError('Missing shipping information. Please go back and complete the previous steps.');
                setIsProcessing(false);
                return;
            }

            // Calculate totals - all items are stored in USD base price
            const subtotal = cartItems.reduce((sum, item) => {
                const usdPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                return sum + (usdPrice * item.quantity);
            }, 0);
            const shippingCost = parseFloat(shippingMethod.cost) || 0;
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + shippingCost + tax;

            // Both card and crypto payments use Stripe Checkout (redirect)
            const paymentMethod = selectedMethod === 'crypto' ? selectedCrypto : 'card';

            console.log('Creating checkout session with:', {
                paymentMethod,
                itemCount: cartItems.length,
                total,
            });

            const { data } = await axios.post('/payments/create-checkout-session', {
                items: cartItems.map(item => ({
                    id: String(item.id),
                    name: item.name,
                    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                    quantity: item.quantity,
                    currency: 'USD', // All items are in USD base currency
                })),
                shipping_address: shippingAddress,
                shipping_method: shippingMethod,
                currency: 'USD', // Send USD as base currency to backend
                subtotal: subtotal,
                shipping_cost: shippingCost,
                tax: tax,
                total: total,
                payment_method: paymentMethod,
            });

            if (data.success && data.checkout_url) {
                // Redirect to Stripe Checkout
                window.location.href = data.checkout_url;
                return;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }

        } catch (err: unknown) {
            console.error('Payment error:', err);

            let errorMessage = 'An error occurred during payment';

            if (err && typeof err === 'object' && 'response' in err) {
                const response = (err as { response?: { data?: { error?: string; errors?: Record<string, string[]>; message?: string } } }).response;

                // Handle Laravel validation errors
                if (response?.data?.errors) {
                    const validationErrors = Object.values(response.data.errors).flat();
                    errorMessage = validationErrors.join(', ');
                } else if (response?.data?.error) {
                    errorMessage = response.data.error;
                } else if (response?.data?.message) {
                    errorMessage = response.data.message;
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-heading text-foreground text-lg font-semibold md:text-xl">
                    Payment Method
                </h3>
                <button
                    type="button"
                    onClick={onBack}
                    className="text-primary hover:text-primary/80 transition-smooth flex items-center space-x-2 text-sm"
                >
                    <Icon name="ArrowLeftIcon" size={16} />
                    <span>Back</span>
                </button>
            </div>

            {error && (
                <div className="bg-destructive/10 border-destructive text-destructive rounded-lg border p-4">
                    <div className="flex items-start space-x-2">
                        <Icon name="ExclamationCircleIcon" size={20} className="flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Payment Error</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-3">
                {PAYMENT_METHODS.map((method) => (
                    <label
                        key={method.id}
                        className={`transition-smooth flex cursor-pointer items-center rounded-lg border-2 p-4 ${
                            selectedMethod === method.id
                                ? 'border-primary bg-accent'
                                : 'border-border bg-background hover:border-primary/50'
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="text-primary focus:ring-primary h-5 w-5 focus:ring-offset-0"
                        />
                        <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-2">
                                <Icon
                                    name={method.icon}
                                    size={20}
                                    className="text-foreground"
                                />
                                <span className="text-foreground text-sm font-medium md:text-base">
                                    {method.name}
                                </span>
                            </div>
                            <p className="text-muted-foreground mt-0.5 text-xs">
                                {method.description}
                            </p>
                        </div>
                    </label>
                ))}
            </div>

            {selectedMethod === 'card' && (
                <div className="bg-accent/50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                        <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground text-xs">
                            You will be redirected to Stripe's secure checkout page to complete your payment.
                        </p>
                    </div>
                </div>
            )}

            {selectedMethod === 'crypto' && (
                <div className="bg-surface border-border space-y-4 rounded-lg border p-4 md:p-6">
                    <p className="text-muted-foreground text-sm mb-4">
                        Select your preferred cryptocurrency for payment
                    </p>
                    <div className="space-y-3">
                        {CRYPTO_OPTIONS.map((crypto) => (
                            <label
                                key={crypto.id}
                                className={`transition-smooth flex cursor-pointer items-center rounded-lg border-2 p-4 ${
                                    selectedCrypto === crypto.id
                                        ? 'border-primary bg-accent'
                                        : 'border-border bg-background hover:border-primary/50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="crypto"
                                    value={crypto.id}
                                    checked={selectedCrypto === crypto.id}
                                    onChange={(e) => setSelectedCrypto(e.target.value)}
                                    className="text-primary focus:ring-primary h-5 w-5 focus:ring-offset-0"
                                />
                                <div className="ml-3 flex items-center space-x-3">
                                    <span className="text-2xl">
                                        {crypto.icon}
                                    </span>
                                    <div>
                                        <p className="text-foreground text-sm font-medium md:text-base">
                                            {crypto.name}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {crypto.symbol}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="bg-accent/50 rounded-lg p-4 mt-4">
                        <div className="flex items-start space-x-2">
                            <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-muted-foreground text-xs">
                                You will be redirected to Stripe's secure checkout page to complete your crypto payment.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Amount Display */}
            <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Total Amount:</span>
                    <span className="text-foreground font-bold text-lg">
                        {displayCurrency.symbol}{displayTotal.toFixed(2)} {displayCurrency.code}
                    </span>
                </div>
                {displayCurrency.code !== 'USD' && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stripe will process:</span>
                        <span className="text-muted-foreground font-medium">
                            ${usdTotal.toFixed(2)} USD
                        </span>
                    </div>
                )}
                <p className="text-muted-foreground text-xs mt-2">
                    {displayCurrency.code !== 'USD'
                        ? 'Your payment will be processed in USD by Stripe. Exchange rates are applied automatically.'
                        : 'Your payment will be processed securely by Stripe.'}
                </p>
            </div>

            <div className="bg-accent flex items-center space-x-2 rounded-lg p-4">
                <Icon
                    name="ShieldCheckIcon"
                    size={20}
                    className="text-primary flex-shrink-0"
                />
                <p className="text-muted-foreground text-xs md:text-sm">
                    Your payment information is encrypted and secure. Powered by Stripe.
                </p>
            </div>

            <button
                type="submit"
                disabled={isProcessing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 w-full rounded-lg px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center space-x-2">
                        <Icon
                            name="ArrowPathIcon"
                            size={20}
                            className="animate-spin"
                        />
                        <span>Redirecting to Stripe...</span>
                    </span>
                ) : (
                    'Continue to Stripe Checkout'
                )}
            </button>
        </form>
    );
}

export default PaymentForm;
