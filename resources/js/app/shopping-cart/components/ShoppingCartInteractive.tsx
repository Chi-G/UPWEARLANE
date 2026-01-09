import { useCart } from '@/hooks/useCart';
import { PromoCode } from '@/types';
import { useState } from 'react';
import CartItemCard from './CartItemCard';
import EmptyCart from './EmptyCart';
import OrderSummary from './OrderSummary';
import PromoCodeSection from './PromoCodeSection';

interface CartSettings {
    pageTitle: string;
    pageDescription: string;
    freeShippingThreshold: number;
    defaultShippingCost: number;
    taxRate: number;
    trustSignals: Array<{ icon: string; text: string; color: string }>;
}

interface ShoppingCartInteractiveProps {
    cartSettings?: CartSettings;
    availablePromoCodes?: PromoCode[];
}

export default function ShoppingCartInteractive({
    cartSettings,
    availablePromoCodes = []
}: ShoppingCartInteractiveProps) {
    const { items: cartItems, updateQuantity, removeFromCart, isInitialized, subtotal: cartSubtotal } = useCart();
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

    // Use settings from database or fallback to defaults
    const freeShippingThreshold = cartSettings?.freeShippingThreshold ?? 100;
    const defaultShippingCost = cartSettings?.defaultShippingCost ?? 15;
    const taxRate = cartSettings?.taxRate ?? 0.08;

    // Initial loading state
    const isLoading = !isInitialized;

    const handleApplyPromo = (code: string | null) => {
        if (!code) {
            setAppliedPromo(null);
            return;
        }

        const normalizedCode = code.toUpperCase();
        const promo = availablePromoCodes.find(p => p.code === normalizedCode);

        if (!promo) {
            return { success: false, message: 'Invalid promo code' };
        }

        if (cartSubtotal < promo.minOrder) {
            return {
                success: false,
                message: `Order must be at least $${promo.minOrder} to use this code`,
            };
        }

        setAppliedPromo(promo);
        return { success: true, message: 'Promo code applied successfully!' };
    };

    const calculateTotals = () => {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cartSubtotal;

        let discount = 0;
        let shipping = subtotal > freeShippingThreshold ? 0 : defaultShippingCost;

        if (appliedPromo) {
            if (appliedPromo.type === 'percentage') {
                discount = subtotal * (appliedPromo.value / 100);
            } else if (appliedPromo.type === 'fixed') {
                discount = appliedPromo.value;
            } else if (appliedPromo.type === 'shipping') {
                shipping = 0;
            }
        }

        // Limit discount
        if (discount > subtotal) discount = subtotal;

        const tax = (subtotal - discount) * taxRate;

        const total = subtotal + tax + shipping - discount;

        return {
            itemCount,
            subtotal,
            tax,
            discount,
            shipping,
            total,
        };
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        updateQuantity(id, quantity);
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    const totals = calculateTotals();

    return (
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="space-y-4 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
                        Shopping Cart ({totals.itemCount}{' '}
                        {totals.itemCount === 1 ? 'item' : 'items'})
                    </h2>
                </div>

                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <CartItemCard
                            key={`${item.id}-${item.variations?.color || ''}-${item.variations?.size || ''}`}
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
                    subtotal={totals.subtotal}
                    discount={totals.discount}
                    tax={totals.tax}
                    total={totals.total}
                    itemCount={totals.itemCount}
                    shippingCost={totals.shipping}
                    trustSignals={cartSettings?.trustSignals}
                />
            </div>
        </div>
    );
}
