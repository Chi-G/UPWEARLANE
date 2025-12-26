import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Currency {
  code: string;
  symbol: string; 
  name: string;
  region: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', region: 'USA' },
  { code: 'GBP', symbol: '£', name: 'British Pound', region: 'UK' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', region: 'Canada' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', region: 'Nigeria' },
];

export default function CurrencyRegionSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selected_currency');
    if (savedCurrency) {
      const currency = CURRENCIES?.find((c) => c?.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        className="flex items-center space-x-2 h-10 px-3 bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect"
        aria-label="Select currency and region"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="font-data text-sm font-medium">{selectedCurrency?.symbol}</span>
        <span className="hidden sm:inline text-sm font-medium">{selectedCurrency?.code}</span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-64 bottom-full mb-2 md:top-full md:mt-2 md:bottom-auto md:mb-0 bg-popover border border-border rounded-lg shadow-gold-md overflow-hidden z-50 animate-fade-in">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-caption font-medium text-muted-foreground uppercase tracking-wider">
              Select Currency & Region
            </div>
            <div className="space-y-1">
              {CURRENCIES?.map((currency) => (
                <button
                  key={currency?.code}
                  onClick={() => handleCurrencyChange(currency)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-smooth ${
                    selectedCurrency?.code === currency?.code
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50 text-popover-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-data text-base font-medium">{currency?.symbol}</span>
                    <div>
                      <div className="text-sm font-medium">{currency?.code}</div>
                      <div className="text-xs text-muted-foreground">{currency?.region}</div>
                    </div>
                  </div>
                  {selectedCurrency?.code === currency?.code && (
                    <Icon name="CheckIcon" size={16} className="text-primary" />
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