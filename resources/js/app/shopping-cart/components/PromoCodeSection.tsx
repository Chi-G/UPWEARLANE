import Icon from '@/components/ui/AppIcon';
import { PromoCodeSectionProps } from '@/types';
import { useState } from 'react';

export default function PromoCodeSection({
    onApplyPromo,
    appliedPromo,
}: PromoCodeSectionProps) {
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
        <div className="bg-card border-border rounded-lg border p-4 md:p-6">
            <h3 className="font-heading text-foreground mb-4 text-lg font-semibold">
                Promo Code
            </h3>
            {appliedPromo ? (
                <div className="space-y-3">
                    <div className="bg-success/10 border-success/20 flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-success flex h-8 w-8 items-center justify-center rounded-full">
                                <Icon
                                    name="CheckIcon"
                                    size={16}
                                    className="text-white"
                                />
                            </div>
                            <div>
                                <p className="font-data text-foreground text-sm font-medium">
                                    {appliedPromo?.code}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {appliedPromo?.description}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRemovePromo}
                            className="touch-target text-muted-foreground hover:text-destructive transition-smooth flex items-center justify-center"
                            aria-label="Remove promo code"
                        >
                            <Icon name="XMarkIcon" size={20} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Discount Applied:
                        </span>
                        <span className="font-data text-success font-semibold">
                            -
                            {appliedPromo?.type === 'percentage'
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
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 flex-1 rounded-lg border px-4"
                            disabled={isApplying}
                        />
                        <button
                            onClick={handleApply}
                            disabled={isApplying || !promoCode?.trim()}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth press-effect h-12 whitespace-nowrap rounded-lg px-6 font-medium disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isApplying ? 'Applying...' : 'Apply'}
                        </button>
                    </div>

                    {error && (
                        <div className="text-destructive flex items-center gap-2 text-sm">
                            <Icon name="ExclamationCircleIcon" size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="text-muted-foreground text-xs">
                        <p className="mb-1">
                            Available promo codes for testing:
                        </p>
                        <ul className="space-y-1 pl-4">
                            <li>
                                • <span className="font-data">SAVE10</span> -
                                10% off your order
                            </li>
                            <li>
                                • <span className="font-data">TECH20</span> -
                                $20 off orders over $100
                            </li>
                            <li>
                                • <span className="font-data">FREESHIP</span> -
                                Free shipping on all orders
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
