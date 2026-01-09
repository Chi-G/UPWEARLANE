import Icon from '@/components/ui/AppIcon';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

interface Order {
    id: number;
    order_number: string;
    total: number;
    currency: string;
    status: string;
    items: Array<{
        id: number;
        product_name: string;
        quantity: number;
        unit_price: number;
        total_price: number;
    }>;
    shippingAddress?: {
        full_name: string;
        address_line1: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    shipping_address?: {
        full_name: string;
        address_line1: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
}

interface Payment {
    method: string;
    order_id: number;
    order_number: string;
}

interface Props {
    order: Order;
    payment: Payment;
}

export default function CheckoutSuccess({ order, payment }: Props) {
    // Clear cart on successful payment
    useEffect(() => {
        try {
            localStorage.removeItem('shopping_cart');
            localStorage.removeItem('checkout_shipping_address');
            localStorage.removeItem('checkout_shipping_method');
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }, []);

    // Handle both camelCase and snake_case for shippingAddress
    const shippingAddr = order.shippingAddress || order.shipping_address;

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Success Header */}
                    <div className="bg-accent border-border rounded-xl border p-8 text-center mb-6">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon
                                name="CheckCircleIcon"
                                size={32}
                                className="text-primary"
                            />
                        </div>
                        <h1 className="text-foreground text-2xl font-bold mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-muted-foreground">
                            Thank you for your order. Your payment has been processed
                            successfully.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                            <div>
                                <p className="text-muted-foreground text-sm">Order Number</p>
                                <p className="text-foreground font-semibold text-lg">
                                    {order.order_number}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-muted-foreground text-sm">Total Paid</p>
                                <p className="text-primary font-bold text-lg">
                                    {order.currency} {typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Payment Method</span>
                                <span className="text-foreground font-medium capitalize">
                                    {payment.method}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    {shippingAddr && (
                        <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                            <h3 className="text-foreground font-semibold mb-4">
                                Shipping Address
                            </h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p className="text-foreground font-medium">
                                    {shippingAddr.full_name}
                                </p>
                                <p>{shippingAddr.address_line1}</p>
                                <p>
                                    {shippingAddr.city}, {shippingAddr.state}{' '}
                                    {shippingAddr.postal_code}
                                </p>
                                <p>{shippingAddr.country}</p>
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                        <h3 className="text-foreground font-semibold mb-4">Order Items</h3>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0"
                                >
                                    <div>
                                        <p className="text-foreground font-medium text-sm">
                                            {item.product_name}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Qty: {item.quantity} × {order.currency}{' '}
                                            {typeof item.unit_price === 'number' ? item.unit_price.toFixed(2) : parseFloat(item.unit_price).toFixed(2)}
                                        </p>
                                    </div>
                                    <p className="text-foreground font-semibold">
                                        {order.currency} {typeof item.total_price === 'number' ? item.total_price.toFixed(2) : parseFloat(item.total_price).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => router.visit('/')}
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-lg font-medium transition-smooth"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => router.visit('/orders')}
                            className="flex-1 bg-surface hover:bg-accent border-border border text-foreground h-12 rounded-lg font-medium transition-smooth"
                        >
                            View Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
