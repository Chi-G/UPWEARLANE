import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { PromoCodeSectionProps } from '@/types';

export default function PromoCodeSection({ onApplyPromo, appliedPromo }: PromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!promoCode?.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsApplying(true);
    setError('');

    setTimeout(() => {
      const result = onApplyPromo(promoCode?.trim()?.toUpperCase());
      if (result && !result.success) {
        setError(result.message || 'Failed to apply promo code');
      } else if (result?.success) {
        setPromoCode('');
      }
      setIsApplying(false);
    }, 800);
  };

  const handleRemovePromo = () => {
    onApplyPromo(null);
    setPromoCode('');
    setError('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
        Promo Code
      </h3>
      {appliedPromo ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
                <Icon name="CheckIcon" size={16} className="text-white" />
              </div>
              <div>
                <p className="font-data text-sm font-medium text-foreground">
                  {appliedPromo?.code}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appliedPromo?.description}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="touch-target flex items-center justify-center text-muted-foreground hover:text-destructive transition-smooth"
              aria-label="Remove promo code"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount Applied:</span>
            <span className="font-data font-semibold text-success">
              -{appliedPromo?.type === 'percentage' 
                ? `${appliedPromo?.value}%` 
                : `$${appliedPromo?.value?.toFixed(2)}`}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e?.target?.value?.toUpperCase());
                setError('');
              }}
              placeholder="Enter promo code"
              className="flex-1 h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
              disabled={isApplying}
            />
            <button
              onClick={handleApply}
              disabled={isApplying || !promoCode?.trim()}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isApplying ? 'Applying...' : 'Apply'}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            <p className="mb-1">Available promo codes for testing:</p>
            <ul className="space-y-1 pl-4">
              <li>• <span className="font-data">SAVE10</span> - 10% off your order</li>
              <li>• <span className="font-data">TECH20</span> - $20 off orders over $100</li>
              <li>• <span className="font-data">FREESHIP</span> - Free shipping on all orders</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
