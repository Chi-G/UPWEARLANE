import Icon from '@/components/ui/AppIcon';
import { ShippingAddress, ShippingMethod } from '@/types';
import { useEffect, useState } from 'react';

interface ShippingOptionsProps {
    shippingAddress: ShippingAddress;
    onShippingSelect: (shippingData: ShippingMethod) => void;
    onBack: () => void;
}

interface ShippingCarrier {
    id: string;
    name: string;
    logo: string;
    alt: string;
    deliveryTime: string;
    price: number;
    countries: string[];
}

const SHIPPING_CARRIERS: ShippingCarrier[] = [
    {
        id: 'dhl',
        name: 'DHL Express',
        logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_18ba81e4e-1764635711352.png',
        alt: 'DHL Express red and yellow logo on delivery truck',
        deliveryTime: '2-3 business days',
        price: 45.0,
        countries: ['NG', 'US', 'GB', 'CA'],
    },
    {
        id: 'gig',
        name: 'GIG Logistics',
        logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fd1a74b5-1764918108894.png',
        alt: 'Modern logistics delivery van in urban setting',
        deliveryTime: '3-5 business days',
        price: 25.0,
        countries: ['NG'],
    },
    {
        id: 'guo',
        name: 'GUO Transport',
        logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ed7171df-1765216920940.png',
        alt: 'Large commercial transport truck on highway',
        deliveryTime: '4-6 business days',
        price: 20.0,
        countries: ['NG'],
    },
    {
        id: 'ups',
        name: 'UPS Ground',
        logo: 'https://images.unsplash.com/photo-1719729940952-5c728a3f8a70',
        alt: 'Brown UPS delivery truck parked on residential street',
        deliveryTime: '3-5 business days',
        price: 35.0,
        countries: ['US', 'CA'],
    },
    {
        id: 'fedex',
        name: 'FedEx International',
        logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cfd19a5c-1764700910189.png',
        alt: 'FedEx purple and orange delivery van in commercial area',
        deliveryTime: '2-4 business days',
        price: 50.0,
        countries: ['US', 'GB', 'CA'],
    },
];

export default function ShippingOptions({
    shippingAddress,
    onShippingSelect,
    onBack,
}: ShippingOptionsProps) {
    const availableCarriers = SHIPPING_CARRIERS.filter((carrier) =>
        carrier.countries.includes(shippingAddress?.country || ''),
    );

    const [selectedCarrier, setSelectedCarrier] = useState<string | null>(
        () => {
            return availableCarriers.length > 0
                ? availableCarriers[0].id
                : null;
        },
    );

    const [currency, setCurrency] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCode = (localStorage.getItem('selected_currency') ||
                'USD') as 'USD' | 'GBP' | 'CAD' | 'NGN';
            const currencies = {
                USD: { code: 'USD', symbol: '$' },
                GBP: { code: 'GBP', symbol: '£' },
                CAD: { code: 'CAD', symbol: 'C$' },
                NGN: { code: 'NGN', symbol: '₦' },
            };
            return currencies[savedCode] || currencies.USD;
        }
        return { code: 'USD', symbol: '$' };
    });

    useEffect(() => {
        const handleCurrencyChange = () => {
            const savedCode = (localStorage.getItem('selected_currency') ||
                'USD') as 'USD' | 'GBP' | 'CAD' | 'NGN';
            const currencies = {
                USD: { code: 'USD', symbol: '$' },
                GBP: { code: 'GBP', symbol: '£' },
                CAD: { code: 'CAD', symbol: 'C$' },
                NGN: { code: 'NGN', symbol: '₦' },
            };
            setCurrency(currencies[savedCode] || currencies.USD);
        };

        window.addEventListener('currency-changed', handleCurrencyChange);
        return () =>
            window.removeEventListener(
                'currency-changed',
                handleCurrencyChange,
            );
    }, []);

    const handleContinue = () => {
        const carrier = availableCarriers?.find(
            (c) => c?.id === selectedCarrier,
        );
        if (carrier) {
            onShippingSelect({
                carrier: carrier?.name,
                deliveryTime: carrier?.deliveryTime,
                cost: carrier?.price,
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-heading text-foreground text-lg font-semibold md:text-xl">
                    Select Shipping Method
                </h3>
                <button
                    onClick={onBack}
                    className="text-primary hover:text-primary/80 transition-smooth flex items-center space-x-2 text-sm"
                >
                    <Icon name="ArrowLeftIcon" size={16} />
                    <span>Edit Address</span>
                </button>
            </div>
            <div className="bg-surface border-border rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                    <Icon
                        name="MapPinIcon"
                        size={20}
                        className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="text-foreground text-sm font-medium">
                            {shippingAddress?.fullName}
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {shippingAddress?.address}
                            <br />
                            {shippingAddress?.city}, {shippingAddress?.state}{' '}
                            {shippingAddress?.postalCode}
                            <br />
                            {SHIPPING_CARRIERS?.[0]?.countries?.includes(
                                shippingAddress?.country,
                            )
                                ? shippingAddress?.country === 'NG'
                                    ? 'Nigeria'
                                    : shippingAddress?.country === 'US'
                                      ? 'United States'
                                      : shippingAddress?.country === 'GB'
                                        ? 'United Kingdom'
                                        : 'Canada'
                                : shippingAddress?.country}
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                {availableCarriers?.map((carrier) => (
                    <label
                        key={carrier?.id}
                        className={`transition-smooth flex cursor-pointer items-center rounded-lg border-2 p-4 ${
                            selectedCarrier === carrier?.id
                                ? 'border-primary bg-accent'
                                : 'border-border bg-background hover:border-primary/50'
                        }`}
                    >
                        <input
                            type="radio"
                            name="shipping"
                            value={carrier?.id}
                            checked={selectedCarrier === carrier?.id}
                            onChange={(e) =>
                                setSelectedCarrier(e?.target?.value)
                            }
                            className="text-primary focus:ring-primary h-5 w-5 focus:ring-offset-0"
                        />

                        <div className="ml-4 flex flex-1 items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-muted relative h-10 w-16 flex-shrink-0 overflow-hidden rounded md:h-12 md:w-20">
                                    <img
                                        src={carrier?.logo}
                                        alt={carrier?.alt}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-foreground text-sm font-medium md:text-base">
                                        {carrier?.name}
                                    </p>
                                    <p className="text-muted-foreground mt-0.5 text-xs md:text-sm">
                                        {carrier?.deliveryTime}
                                    </p>
                                </div>
                            </div>
                            <span className="font-data text-foreground ml-4 whitespace-nowrap text-base font-semibold md:text-lg">
                                {currency?.symbol}
                                {carrier?.price?.toFixed(2)}
                            </span>
                        </div>
                    </label>
                ))}
            </div>
            {availableCarriers?.length === 0 && (
                <div className="py-8 text-center">
                    <Icon
                        name="ExclamationTriangleIcon"
                        size={48}
                        className="text-warning mx-auto mb-4"
                    />
                    <p className="text-muted-foreground text-base">
                        No shipping options available for the selected country.
                    </p>
                </div>
            )}
            <button
                onClick={handleContinue}
                disabled={!selectedCarrier}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 w-full rounded-lg px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
                Continue to Payment
            </button>
        </div>
    );
}
