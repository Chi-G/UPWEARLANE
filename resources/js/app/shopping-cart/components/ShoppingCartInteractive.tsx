import { CartItem, PromoCode, ShoppingCartInteractiveProps } from '@/types';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import EmptyCart from './EmptyCart';
import OrderSummary from './OrderSummary';
import PromoCodeSection from './PromoCodeSection';

const VALID_PROMO_CODES: Record<string, PromoCode> = {
    SAVE10: {
        code: 'SAVE10',
        description: '10% off your entire order',
        type: 'percentage',
        value: 10,
        minOrder: 0,
    },
    TECH20: {
        code: 'TECH20',
        description: '$20 off orders over $100',
        type: 'fixed',
        value: 20,
        minOrder: 100,
    },
    FREESHIP: {
        code: 'FREESHIP',
        description: 'Free shipping on all orders',
        type: 'shipping',
        value: 0,
        minOrder: 0,
    },
};

export default function ShoppingCartInteractive({
    initialCartData,
}: ShoppingCartInteractiveProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartData);
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('shopping_cart');
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    setCartItems(parsedCart);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCart();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem(
                    'shopping_cart',
                    JSON.stringify(cartItems),
                );
                window.dispatchEvent(new Event('cart-updated'));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        }
    }, [cartItems, isLoading]);

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        setCartItems((prev) =>
            prev?.map((item) =>
                item?.id === itemId ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    const handleRemoveItem = (itemId: string) => {
        setCartItems((prev) => prev?.filter((item) => item?.id !== itemId));
    };

    const handleApplyPromo = (code: string | null) => {
        if (!code) {
            setAppliedPromo(null);
            return { success: true };
        }

        const promo = VALID_PROMO_CODES?.[code];
        if (!promo) {
            return {
                success: false,
                message: 'Invalid promo code. Please check and try again.',
            };
        }

        const subtotal = cartItems?.reduce(
            (sum, item) => sum + item?.price * item?.quantity,
            0,
        );
        if (subtotal < promo?.minOrder) {
            return {
                success: false,
                message: `This promo requires a minimum order of $${promo?.minOrder?.toFixed(2)}`,
            };
        }

        setAppliedPromo(promo);
        return { success: true };
    };

    const calculateTotals = () => {
        const subtotal = cartItems?.reduce(
            (sum, item) => sum + item?.price * item?.quantity,
            0,
        );

        let discount = 0;
        if (appliedPromo) {
            if (appliedPromo?.type === 'percentage') {
                discount = (subtotal * appliedPromo?.value) / 100;
            } else if (appliedPromo?.type === 'fixed') {
                discount = appliedPromo?.value;
            }
        }

        const tax = (subtotal - discount) * 0.08;
        const total = subtotal - discount + tax;

        return {
            subtotal,
            discount,
            tax,
            total,
            itemCount: cartItems?.reduce(
                (sum, item) => sum + item?.quantity,
                0,
            ),
        };
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
                    <p className="text-muted-foreground">
                        Loading your cart...
                    </p>
                </div>
            </div>
        );
    }

    if (cartItems?.length === 0) {
        return <EmptyCart />;
    }

    const totals = calculateTotals();

    return (
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="space-y-4 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
                        Shopping Cart ({totals?.itemCount}{' '}
                        {totals?.itemCount === 1 ? 'item' : 'items'})
                    </h2>
                </div>

                <div className="space-y-4">
                    {cartItems?.map((item) => (
                        <CartItemCard
                            key={item?.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>

                {/* Promo Code Section - Mobile */}
                <div className="lg:hidden">
                    <PromoCodeSection
                        onApplyPromo={handleApplyPromo}
                        appliedPromo={appliedPromo}
                    />
                </div>
            </div>
            {/* Order Summary Section */}
            <div className="space-y-6">
                {/* Promo Code Section - Desktop */}
                <div className="hidden lg:block">
                    <PromoCodeSection
                        onApplyPromo={handleApplyPromo}
                        appliedPromo={appliedPromo}
                    />
                </div>

                <OrderSummary
                    subtotal={totals?.subtotal}
                    discount={totals?.discount}
                    tax={totals?.tax}
                    total={totals?.total}
                    itemCount={totals?.itemCount}
                />
            </div>
        </div>
    );
}

ShoppingCartInteractive.propTypes = {
    initialCartData: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.string?.isRequired,
            name: PropTypes?.string?.isRequired,
            category: PropTypes?.string?.isRequired,
            price: PropTypes?.number?.isRequired,
            quantity: PropTypes?.number?.isRequired,
            image: PropTypes?.string?.isRequired,
            alt: PropTypes?.string?.isRequired,
            variations: PropTypes?.shape({
                color: PropTypes?.string,
                size: PropTypes?.string,
            }),
            stock: PropTypes?.number,
        }),
    )?.isRequired,
};
