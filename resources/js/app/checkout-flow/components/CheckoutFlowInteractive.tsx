import {
    OrderDetails,
    PaymentInfo,
    ShippingAddress,
    ShippingMethod,
} from '@/types';
import { useState } from 'react';
import CheckoutProgress from './CheckoutProgress';
import OrderConfirmation from './OrderConfirmation';
import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import ShippingForm from './ShippingForm';
import ShippingOptions from './ShippingOptions';

const CHECKOUT_STEPS = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' },
];

export default function CheckoutFlowInteractive() {
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingAddress, setShippingAddress] =
        useState<ShippingAddress | null>(() => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('checkout_shipping_address');
                if (saved) {
                    try {
                        return JSON.parse(saved);
                    } catch (error) {
                        console.error('Error parsing saved address:', error);
                        return null;
                    }
                }
            }
            return null;
        });
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(
        null,
    );
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [shippingCost, setShippingCost] = useState(0);

    const handleShippingComplete = (data: ShippingAddress) => {
        setShippingAddress(data);
        localStorage.setItem('checkout_shipping_address', JSON.stringify(data));
        setCurrentStep(1);
    };

    const handleShippingSelect = (data: ShippingMethod) => {
        setShippingMethod(data);
        setShippingCost(data?.cost);
        setCurrentStep(2);
    };

    const handlePaymentComplete = (data: PaymentInfo) => {
        setPaymentInfo(data);
        setCurrentStep(3);

        try {
            localStorage.removeItem('shopping_cart');
            localStorage.removeItem('checkout_shipping_address');
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleBackToShipping = () => {
        setCurrentStep(0);
    };

    const handleBackToDelivery = () => {
        setCurrentStep(1);
    };

    const orderDetails: OrderDetails = {
        shippingAddress,
        shipping: shippingMethod,
        payment: paymentInfo,
    };

    return (
        <div className="bg-background mt-20 min-h-screen">
            <CheckoutProgress
                currentStep={currentStep}
                steps={CHECKOUT_STEPS}
            />

            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-background border-border rounded-lg border p-4 md:p-6 lg:p-8">
                            {currentStep === 0 && (
                                <ShippingForm
                                    onShippingComplete={handleShippingComplete}
                                    initialData={shippingAddress || undefined}
                                />
                            )}

                            {currentStep === 1 && (
                                <ShippingOptions
                                    key={shippingAddress?.country}
                                    shippingAddress={shippingAddress!}
                                    onShippingSelect={handleShippingSelect}
                                    onBack={handleBackToShipping}
                                />
                            )}

                            {currentStep === 2 && (
                                <PaymentForm
                                    onPaymentComplete={handlePaymentComplete}
                                    onBack={handleBackToDelivery}
                                    totalAmount={0}
                                />
                            )}

                            {currentStep === 3 && (
                                <OrderConfirmation
                                    orderDetails={orderDetails}
                                /> 
                            )}
                        </div>
                    </div>

                    {currentStep < 3 && (
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <OrderSummary shippingCost={shippingCost} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
