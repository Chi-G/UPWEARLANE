import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { CartItemCardProps } from '@/types';

export default function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
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

  const itemTotal = (item?.price * item?.quantity)?.toFixed(2);

  return (
    <div className="relative bg-card border border-border rounded-lg p-4 md:p-6 transition-smooth hover:shadow-gold-sm">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        {/* Product Image */}
        <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <AppImage
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {item?.category}
              </p>
            </div>
            <button
              onClick={() => setShowRemoveConfirm(true)}
              className="touch-target flex items-center justify-center text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
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
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium text-foreground">{item?.variations?.color}</span>
                </div>
              )}
              {item?.variations?.size && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium text-foreground">{item?.variations?.size}</span>
                </div>
              )}
            </div>
          )}

          {/* Price and Quantity Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                  className="touch-target flex items-center justify-center w-10 h-10 text-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  aria-label="Decrease quantity"
                >
                  <Icon name="MinusIcon" size={16} />
                </button>
                <span className="font-data text-base font-medium text-foreground min-w-[2ch] text-center">
                  {item?.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= 99 || isUpdating}
                  className="touch-target flex items-center justify-center w-10 h-10 text-foreground hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  aria-label="Increase quantity"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-data text-xl md:text-2xl font-semibold text-foreground whitespace-nowrap">
                ${itemTotal}
              </span>
              {item?.quantity > 1 && (
                <span className="text-sm text-muted-foreground">
                  (${item?.price?.toFixed(2)} each)
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          {item?.stock && item?.stock <= 5 && (
            <div className="flex items-center gap-2 text-sm text-warning">
              <Icon name="ExclamationTriangleIcon" size={16} />
              <span>Only {item?.stock} left in stock</span>
            </div>
          )}
        </div>
      </div>
      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 z-10">
          <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full shadow-gold-lg">
            <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
              Remove Item?
            </h4>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="flex-1 h-10 px-4 bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 h-10 px-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-smooth press-effect"
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