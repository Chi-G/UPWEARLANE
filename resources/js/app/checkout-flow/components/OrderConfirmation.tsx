import { Link } from '@inertiajs/react';
import { useState } from 'react';

import Icon from '@/components/ui/AppIcon';
import { OrderConfirmationProps } from '@/types';

export default function OrderConfirmation({
    orderDetails,
}: OrderConfirmationProps) {
    const [confirmationData] = useState(() => {
        const timestamp = Date.now();
        return {
            orderNumber: `UWL${timestamp.toString().slice(-8)}`,
            estimatedDelivery: new Date(
                timestamp + 5 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
        };
    });

    const { orderNumber, estimatedDelivery } = confirmationData;

    return (
        <div className="mx-auto max-w-2xl space-y-8 text-center">
            <div className="bg-success/10 inline-flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24">
                <Icon
                    name="CheckCircleIcon"
                    size={48}
                    className="text-success"
                />
            </div>

            <div className="space-y-4">
                <h2 className="font-heading text-foreground text-2xl font-bold md:text-3xl lg:text-4xl">
                    Order Confirmed!
                </h2>
                <p className="text-muted-foreground mx-auto max-w-md text-base md:text-lg">
                    Thank you for your purchase. Your order has been
                    successfully placed and is being processed.
                </p>
            </div>

            <div className="bg-surface border-border space-y-6 rounded-lg border p-6 md:p-8">
                <div className="border-border flex items-center justify-between border-b pb-4">
                    <span className="text-muted-foreground text-sm">
                        Order Number
                    </span>
                    <span className="font-data text-foreground text-base font-semibold md:text-lg">
                        {orderNumber}
                    </span>
                </div>

                <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                        <Icon
                            name="TruckIcon"
                            size={20}
                            className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1">
                            <p className="text-foreground text-sm font-medium">
                                Shipping Method
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {orderDetails?.shipping?.carrier ||
                                    'Standard Shipping'}
                            </p>
                            <p className="text-muted-foreground mt-1 text-xs">
                                Estimated delivery: {estimatedDelivery}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Icon
                            name="MapPinIcon"
                            size={20}
                            className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1">
                            <p className="text-foreground text-sm font-medium">
                                Shipping Address
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {orderDetails?.shippingAddress?.fullName}
                                <br />
                                {orderDetails?.shippingAddress?.address}
                                <br />
                                {orderDetails?.shippingAddress?.city},{' '}
                                {orderDetails?.shippingAddress?.state}{' '}
                                {orderDetails?.shippingAddress?.postalCode}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Icon
                            name="CreditCardIcon"
                            size={20}
                            className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1">
                            <p className="text-foreground text-sm font-medium">
                                Payment Method
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {orderDetails?.payment?.method === 'card'
                                    ? `Card ending in ${orderDetails?.payment?.last4 || '****'}`
                                    : orderDetails?.payment?.method === 'crypto'
                                      ? `Cryptocurrency (${orderDetails?.payment?.cryptocurrency?.toUpperCase() || 'BTC'})`
                                      : orderDetails?.payment?.method ===
                                          'google-pay'
                                        ? 'Google Pay'
                                        : 'Apple Pay'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-accent rounded-lg p-4 md:p-6">
                <div className="flex items-start space-x-3">
                    <Icon
                        name="EnvelopeIcon"
                        size={20}
                        className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-muted-foreground text-left text-sm">
                        A confirmation email with order tracking information has
                        been sent to{' '}
                        <span className="text-foreground font-medium">
                            {orderDetails?.shippingAddress?.email}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                    href="/product-catalog"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect flex h-12 w-full items-center justify-center rounded-lg px-8 font-medium sm:w-auto"
                >
                    Continue Shopping
                </Link>
                <Link
                    href="/landing-page"
                    className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-full items-center justify-center rounded-lg border px-8 font-medium sm:w-auto"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
