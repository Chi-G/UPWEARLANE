import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { PaymentFormProps } from '@/types';

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
    description: 'Bitcoin, Ethereum',
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: 'DevicePhoneMobileIcon',
    description: 'Fast and secure',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: 'DevicePhoneMobileIcon',
    description: 'Touch ID or Face ID',
  },
];

const CRYPTO_OPTIONS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
];

export default function PaymentForm({ onPaymentComplete, onBack, totalAmount }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  } as Record<string, string>);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value?.replace(/\s/g, '')?.replace(/(\d{4})/g, '$1 ')?.trim();
    } else if (name === 'expiry') {
      formattedValue = value?.replace(/\D/g, '')?.replace(/(\d{2})(\d)/, '$1/$2')?.slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value?.replace(/\D/g, '')?.slice(0, 4);
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (selectedMethod === 'card') {
      if (cardData?.number?.replace(/\s/g, '')?.length < 15) {
        newErrors.number = 'Invalid card number';
      }
      if (cardData?.name?.trim()?.length < 3) {
        newErrors.name = 'Cardholder name is required';
      }
      if (!/^\d{2}\/\d{2}$/?.test(cardData?.expiry)) {
        newErrors.expiry = 'Invalid expiry date';
      }
      if (cardData?.cvv?.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();

    if (selectedMethod === 'card' && !validateCard()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const paymentData = {
        method: selectedMethod,
        ...(selectedMethod === 'card' && {
          last4: cardData?.number?.slice(-4),
          cardType: 'Visa',
        }),
        ...(selectedMethod === 'crypto' && {
          cryptocurrency: selectedCrypto,
        }),
        timestamp: new Date()?.toISOString(),
      };

      onPaymentComplete(paymentData);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
          Payment Method
        </h3>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          <Icon name="ArrowLeftIcon" size={16} />
          <span>Back</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_METHODS?.map((method) => (
          <label
            key={method?.id}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
              selectedMethod === method?.id
                ? 'border-primary bg-accent' :'border-border bg-background hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method?.id}
              checked={selectedMethod === method?.id}
              onChange={(e) => setSelectedMethod(e?.target?.value)}
              className="w-5 h-5 text-primary focus:ring-primary focus:ring-offset-0"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center space-x-2">
                <Icon name={method?.icon as any} size={20} className="text-foreground" />
                <span className="text-sm md:text-base font-medium text-foreground">
                  {method?.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{method?.description}</p>
            </div>
          </label>
        ))}
      </div>
      {selectedMethod === 'card' && (
        <div className="space-y-4 p-4 md:p-6 bg-surface rounded-lg border border-border">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-foreground mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              name="number"
              value={cardData?.number}
              onChange={handleCardChange}
              maxLength={19}
              className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth ${
                errors?.number ? 'border-error' : 'border-border'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors?.number && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                <span>{errors?.number}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="card-name" className="block text-sm font-medium text-foreground mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="card-name"
              name="name"
              value={cardData?.name}
              onChange={handleCardChange}
              className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth ${
                errors?.name ? 'border-error' : 'border-border'
              }`}
              placeholder="John Doe"
            />
            {errors?.name && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                <span>{errors?.name}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="card-expiry" className="block text-sm font-medium text-foreground mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="card-expiry"
                name="expiry"
                value={cardData?.expiry}
                onChange={handleCardChange}
                className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth ${
                  errors?.expiry ? 'border-error' : 'border-border'
                }`}
                placeholder="MM/YY"
              />
              {errors?.expiry && (
                <p className="mt-1 text-xs text-error flex items-center space-x-1">
                  <Icon name="ExclamationCircleIcon" size={14} />
                  <span>{errors?.expiry}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="card-cvv" className="block text-sm font-medium text-foreground mb-2">
                CVV
              </label>
              <input
                type="text"
                id="card-cvv"
                name="cvv"
                value={cardData?.cvv}
                onChange={handleCardChange}
                className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth ${
                  errors?.cvv ? 'border-error' : 'border-border'
                }`}
                placeholder="123"
              />
              {errors?.cvv && (
                <p className="mt-1 text-xs text-error flex items-center space-x-1">
                  <Icon name="ExclamationCircleIcon" size={14} />
                  <span>{errors?.cvv}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {selectedMethod === 'crypto' && (
        <div className="space-y-4 p-4 md:p-6 bg-surface rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Select your preferred cryptocurrency for payment
          </p>
          <div className="space-y-3">
            {CRYPTO_OPTIONS?.map((crypto) => (
              <label
                key={crypto?.id}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                  selectedCrypto === crypto?.id
                    ? 'border-primary bg-accent' :'border-border bg-background hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="crypto"
                  value={crypto?.id}
                  checked={selectedCrypto === crypto?.id}
                  onChange={(e) => setSelectedCrypto(e?.target?.value)}
                  className="w-5 h-5 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <div className="ml-3 flex items-center space-x-3">
                  <span className="text-2xl">{crypto?.icon}</span>
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground">{crypto?.name}</p>
                    <p className="text-xs text-muted-foreground">{crypto?.symbol}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
      {(selectedMethod === 'google-pay' || selectedMethod === 'apple-pay') && (
        <div className="p-6 md:p-8 bg-surface rounded-lg border border-border text-center">
          <Icon
            name="DevicePhoneMobileIcon"
            size={48}
            className="mx-auto text-primary mb-4"
          />
          <p className="text-base text-foreground font-medium mb-2">
            {selectedMethod === 'google-pay' ? 'Google Pay' : 'Apple Pay'} Ready
          </p>
          <p className="text-sm text-muted-foreground">
            Click the button below to complete your payment securely
          </p>
        </div>
      )}
      <div className="flex items-center space-x-2 p-4 bg-accent rounded-lg">
        <Icon name="ShieldCheckIcon" size={20} className="text-primary flex-shrink-0" />
        <p className="text-xs md:text-sm text-muted-foreground">
          Your payment information is encrypted and secure. We support 135+ currencies via Stripe.
        </p>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center space-x-2">
            <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
            <span>Processing Payment...</span>
          </span>
        ) : (
          `Complete Order`
        )}
      </button>
    </form>
  );
}