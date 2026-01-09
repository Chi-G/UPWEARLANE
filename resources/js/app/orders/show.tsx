import { Link } from '@inertiajs/react';

interface Address {
    full_name: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number | string;
    total_price: number | string;
}

interface Payment {
    status: string;
    method?: string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total: number | string;
    currency: string;
    created_at: string;
    items: OrderItem[];
    shippingAddress?: Address;
    shipping_address?: Address;
    billingAddress?: Address;
    billing_address?: Address;
    payment?: Payment;
}

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const shippingAddr = order.shippingAddress || order.shipping_address;
    const billingAddr = order.billingAddress || order.billing_address;
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                <Link href="/orders" className="text-primary font-medium mb-6 inline-block">← Back to Orders</Link>
                <h1 className="text-2xl font-bold mb-4 text-foreground">Order #{order.order_number}</h1>
                <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <div>
                            <p className="text-muted-foreground text-sm">Order Date</p>
                            <p className="text-foreground font-semibold text-lg">{new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-muted-foreground text-sm">Total Paid</p>
                            <p className="text-primary font-bold text-lg">{order.currency} {typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Payment Status</span>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{order.payment?.status || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Order Status</span>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{order.status}</span>
                        </div>
                    </div>
                </div>
                {/* Shipping Address */}
                {shippingAddr && (
                    <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                        <h3 className="text-foreground font-semibold mb-4">Shipping Address</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p className="text-foreground font-medium">{shippingAddr.full_name}</p>
                            <p>{shippingAddr.address_line1}</p>
                            <p>{shippingAddr.city}, {shippingAddr.state} {shippingAddr.postal_code}</p>
                            <p>{shippingAddr.country}</p>
                        </div>
                    </div>
                )}
                {/* Billing Address */}
                {billingAddr && (
                    <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                        <h3 className="text-foreground font-semibold mb-4">Billing Address</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p className="text-foreground font-medium">{billingAddr.full_name}</p>
                            <p>{billingAddr.address_line1}</p>
                            <p>{billingAddr.city}, {billingAddr.state} {billingAddr.postal_code}</p>
                            <p>{billingAddr.country}</p>
                        </div>
                    </div>
                )}
                {/* Order Items */}
                <div className="bg-surface border-border rounded-xl border p-6 mb-6">
                    <h3 className="text-foreground font-semibold mb-4">Order Items</h3>
                    <div className="space-y-3">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                                <div>
                                    <p className="text-foreground font-medium text-sm">{item.product_name}</p>
                                    <p className="text-muted-foreground text-xs">Qty: {item.quantity} × {order.currency} {typeof item.unit_price === 'number' ? item.unit_price.toFixed(2) : parseFloat(item.unit_price).toFixed(2)}</p>
                                </div>
                                <p className="text-foreground font-semibold">{order.currency} {typeof item.total_price === 'number' ? item.total_price.toFixed(2) : parseFloat(item.total_price).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
