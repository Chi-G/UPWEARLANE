import { useState, useEffect } from 'react';
import { ShippingAddress, ShippingMethod, PaymentInfo, OrderDetails, Currency } from '@/types';
import CheckoutProgress from './CheckoutProgress';
import OrderSummary from './OrderSummary';
import ShippingForm from './ShippingForm';
import ShippingOptions from './ShippingOptions';
import PaymentForm from './PaymentForm';
import OrderConfirmation from './OrderConfirmation';

const CHECKOUT_STEPS = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

export default function CheckoutFlowInteractive() {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$' });

  useEffect(() => {
    const savedAddress = localStorage.getItem('checkout_shipping_address');
    if (savedAddress) {
      try {
        setShippingAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error('Error loading saved address:', error);
      }
    }
  }, []);

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

  const handleCurrencyUpdate = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const orderDetails: OrderDetails = {
    shippingAddress,
    shipping: shippingMethod,
    payment: paymentInfo,
  };

  return (
    <div className="min-h-screen bg-background mt-20">
      <CheckoutProgress currentStep={currentStep} steps={CHECKOUT_STEPS} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg border border-border p-4 md:p-6 lg:p-8">
              {currentStep === 0 && (
                <ShippingForm
                  onShippingComplete={handleShippingComplete}
                  initialData={shippingAddress}
                />
              )}

              {currentStep === 1 && (
                <ShippingOptions
                  shippingAddress={shippingAddress}
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

              {currentStep === 3 && <OrderConfirmation orderDetails={orderDetails} />}
            </div>
          </div>

          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary
                  shippingCost={shippingCost}
                  onCurrencyUpdate={handleCurrencyUpdate}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}