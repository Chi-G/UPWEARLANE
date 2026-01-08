import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { CartItemCardProps } from '@/types';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CartItemCard({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemCardProps) {
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > 99) return;
        setIsUpdating(true);
        await onUpdateQuantity(item?.id, newQuantity);
        setTimeout(() => setIsUpdating(false), 300);
    };

    const handleRemove = () => {
        setShowRemoveConfirm(false);
        onRemove(item?.id);
    };

    const price = typeof item?.price === 'string' ? parseFloat(item.price) : (item?.price || 0);
    const itemTotal = (price * item?.quantity).toFixed(2);

    return (
        <div className="bg-card border-border transition-smooth hover:shadow-gold-sm relative rounded-lg border p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row md:gap-6">
                {/* Product Image */}
                <div className="w-full flex-shrink-0 sm:w-32 md:w-40">
                    <div className="bg-muted aspect-[3/4] overflow-hidden rounded-lg">
                        <AppImage
                            src={item?.image}
                            alt={item?.alt}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-heading text-foreground line-clamp-2 text-lg font-semibold md:text-xl">
                                {item?.name}
                            </h3>
                            <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                                {item?.category}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowRemoveConfirm(true)}
                            className="touch-target text-muted-foreground hover:text-destructive transition-smooth flex flex-shrink-0 items-center justify-center"
                            aria-label="Remove item"
                        >
                            <Icon name="TrashIcon" size={20} />
                        </button>
                    </div>

                    {/* Variations */}
                    {item?.variations && (
                        <div className="flex flex-wrap gap-3 text-sm">
                            {item?.variations?.color && (
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        Color:
                                    </span>
                                    <span className="text-foreground font-medium">
                                        {item?.variations?.color}
                                    </span>
                                </div>
                            )}
                            {item?.variations?.size && (
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">
                                        Size:
                                    </span>
                                    <span className="text-foreground font-medium">
                                        {item?.variations?.size}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Price and Quantity Controls */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-sm">
                                Quantity:
                            </span>
                            <div className="bg-surface border-border flex items-center gap-2 rounded-lg border">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(item?.quantity - 1)
                                    }
                                    disabled={item?.quantity <= 1 || isUpdating}
                                    className="touch-target text-foreground hover:text-primary transition-smooth flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Decrease quantity"
                                >
                                    <Icon name="MinusIcon" size={16} />
                                </button>
                                <span className="font-data text-foreground min-w-[2ch] text-center text-base font-medium">
                                    {item?.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(item?.quantity + 1)
                                    }
                                    disabled={
                                        item?.quantity >= 99 || isUpdating
                                    }
                                    className="touch-target text-foreground hover:text-primary transition-smooth flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Increase quantity"
                                >
                                    <Icon name="PlusIcon" size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="font-data text-foreground whitespace-nowrap text-xl font-semibold md:text-2xl">
                                ${itemTotal}
                            </span>
                            {item?.quantity > 1 && (
                                <span className="text-muted-foreground text-sm">
                                    (${price.toFixed(2)} each)
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    {item?.stock && item?.stock <= 5 && (
                        <div className="text-warning flex items-center gap-2 text-sm">
                            <Icon name="ExclamationTriangleIcon" size={16} />
                            <span>Only {item?.stock} left in stock</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Remove Confirmation Modal */}
            {showRemoveConfirm && (
                <div className="bg-background/95 absolute inset-0 z-10 flex items-center justify-center rounded-lg p-4 backdrop-blur-sm">
                    <div className="bg-card border-border shadow-gold-lg w-full max-w-sm rounded-lg border p-6">
                        <h4 className="font-heading text-foreground mb-2 text-lg font-semibold">
                            Remove Item?
                        </h4>
                        <p className="text-muted-foreground mb-6 text-sm">
                            Are you sure you want to remove this item from your
                            cart?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRemoveConfirm(false)}
                                className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect h-10 flex-1 rounded-lg border px-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemove}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-smooth press-effect h-10 flex-1 rounded-lg px-4"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

CartItemCard.propTypes = {
    item: PropTypes?.shape({
        id: PropTypes?.string?.isRequired,
        name: PropTypes?.string?.isRequired,
        category: PropTypes?.string?.isRequired,
        price: PropTypes?.number?.isRequired,
        quantity: PropTypes?.number?.isRequired,
        image: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
        variations: PropTypes?.shape({
            color: PropTypes?.string,
            size: PropTypes?.string,
        }),
        stock: PropTypes?.number,
    })?.isRequired,
    onUpdateQuantity: PropTypes?.func?.isRequired,
    onRemove: PropTypes?.func?.isRequired,
};
