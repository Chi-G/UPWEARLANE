import Icon from '@/components/ui/AppIcon';
import { useEffect, useRef, useState } from 'react';

import { Currency } from '@/types';

const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', region: 'USA' },
    { code: 'GBP', symbol: '£', name: 'British Pound', region: 'UK' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', region: 'Canada' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', region: 'Nigeria' },
];

export default function CurrencyRegionSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selected_currency');
            if (saved) {
                return (
                    CURRENCIES.find((c) => c.code === saved) || CURRENCIES[0]
                );
            }
        }
        return CURRENCIES[0];
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const handleCurrencyChange = (currency: Currency) => {
        setSelectedCurrency(currency);
        localStorage.setItem('selected_currency', currency?.code);
        localStorage.setItem('selected_region', currency?.region);
        setIsOpen(false);
        window.dispatchEvent(new Event('currency-changed'));
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-10 items-center space-x-2 rounded-lg border px-3"
                aria-label="Select currency and region"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="font-data text-sm font-medium">
                    {selectedCurrency?.symbol}
                </span>
                <span className="hidden text-sm font-medium sm:inline">
                    {selectedCurrency?.code}
                </span>
                <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="bg-popover border-border shadow-gold-md animate-fade-in absolute bottom-full right-0 z-50 mb-2 w-64 overflow-hidden rounded-lg border md:bottom-auto md:top-full md:mb-0 md:mt-2">
                    <div className="p-2">
                        <div className="font-caption text-muted-foreground px-3 py-2 text-xs font-medium uppercase tracking-wider">
                            Select Currency & Region
                        </div>
                        <div className="space-y-1">
                            {CURRENCIES?.map((currency) => (
                                <button
                                    key={currency?.code}
                                    onClick={() =>
                                        handleCurrencyChange(currency)
                                    }
                                    className={`transition-smooth flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left ${
                                        selectedCurrency?.code ===
                                        currency?.code
                                            ? 'bg-accent text-accent-foreground'
                                            : 'hover:bg-accent/50 text-popover-foreground'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="font-data text-base font-medium">
                                            {currency?.symbol}
                                        </span>
                                        <div>
                                            <div className="text-sm font-medium">
                                                {currency?.code}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                {currency?.region}
                                            </div>
                                        </div>
                                    </div>
                                    {selectedCurrency?.code ===
                                        currency?.code && (
                                        <Icon
                                            name="CheckIcon"
                                            size={16}
                                            className="text-primary"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
