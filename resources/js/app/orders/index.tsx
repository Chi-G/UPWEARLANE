import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import Header from '@/components/common/Header';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number | string;
    total_price: number | string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total: number | string;
    currency: string;
    created_at: string;
    items: OrderItem[];
    payment?: { status: string };
}

interface Props {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function OrdersIndex({ orders }: Props) {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold mb-8 text-foreground">My Orders</h1>
                    {orders.data.length === 0 ? (
                        <div className="bg-surface border-border rounded-xl border p-8 text-center">
                            <Icon name="InboxIcon" size={32} className="text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">You have no orders yet.</p>
                            <Link href="/" className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.data.map(order => (
                                <Link key={order.id} href={`/orders/${order.id}`} className="block bg-surface border-border rounded-xl border p-6 hover:shadow-lg transition-smooth">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-lg text-foreground">Order #{order.order_number}</span>
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{order.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Placed: {new Date(order.created_at).toLocaleString()}</span>
                                        <span className="text-foreground font-bold">{order.currency} {typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {order.items.slice(0, 3).map(item => (
                                            <span key={item.id} className="bg-accent px-2 py-1 rounded text-xs text-muted-foreground">
                                                {item.product_name} × {item.quantity}
                                            </span>
                                        ))}
                                        {order.items.length > 3 && (
                                            <span className="text-xs text-muted-foreground">+{order.items.length - 3} more</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {/* Pagination (simple) */}
                    {orders.last_page > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: orders.last_page }, (_, i) => i + 1).map(page => (
                                <Link
                                    key={page}
                                    href={`?page=${page}`}
                                    className={`px-3 py-1 rounded ${orders.current_page === page ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground border border-border'}`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
