import { useState } from 'react';
import { Link } from '@inertiajs/react';

import Icon from '@/components/ui/AppIcon';
import { OrderDetails, OrderConfirmationProps } from '@/types';


export default function OrderConfirmation({ orderDetails }: OrderConfirmationProps) {
  const [confirmationData] = useState(() => {
    const timestamp = Date.now();
    return {
      orderNumber: `UWL${timestamp.toString().slice(-8)}`,
      estimatedDelivery: new Date(timestamp + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    };
  });

  const { orderNumber, estimatedDelivery } = confirmationData;

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-success/10 rounded-full">
        <Icon name="CheckCircleIcon" size={48} className="text-success" />
      </div>
 
      <div className="space-y-4">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          Order Confirmed!
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-sm text-muted-foreground">Order Number</span>
          <span className="font-data text-base md:text-lg font-semibold text-foreground">
            {orderNumber}
          </span>
        </div>

        <div className="space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <Icon name="TruckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Shipping Method</p>
              <p className="text-sm text-muted-foreground mt-1">
                {orderDetails?.shipping?.carrier || 'Standard Shipping'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Estimated delivery: {estimatedDelivery}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Shipping Address</p>
              <p className="text-sm text-muted-foreground mt-1">
                {orderDetails?.shippingAddress?.fullName}
                <br />
                {orderDetails?.shippingAddress?.address}
                <br />
                {orderDetails?.shippingAddress?.city}, {orderDetails?.shippingAddress?.state}{' '}
                {orderDetails?.shippingAddress?.postalCode}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="CreditCardIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Payment Method</p>
              <p className="text-sm text-muted-foreground mt-1">
                {orderDetails?.payment?.method === 'card'
                  ? `Card ending in ${orderDetails?.payment?.last4 || '****'}`
                  : orderDetails?.payment?.method === 'crypto'
                  ? `Cryptocurrency (${orderDetails?.payment?.cryptocurrency?.toUpperCase() || 'BTC'})`
                  : orderDetails?.payment?.method === 'google-pay' ?'Google Pay' :'Apple Pay'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-accent rounded-lg p-4 md:p-6">
        <div className="flex items-start space-x-3">
          <Icon name="EnvelopeIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground text-left">
            A confirmation email with order tracking information has been sent to{' '}
            <span className="font-medium text-foreground">
              {orderDetails?.shippingAddress?.email}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/product-catalog"
          className="w-full sm:w-auto h-12 px-8 flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
        >
          Continue Shopping
        </Link>
        <Link
          href="/landing-page"
          className="w-full sm:w-auto h-12 px-8 flex items-center justify-center bg-surface hover:bg-accent text-foreground font-medium rounded-lg border border-border transition-smooth press-effect"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}