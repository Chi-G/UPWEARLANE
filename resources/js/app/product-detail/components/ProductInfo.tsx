import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import { ProductInfoProps, CurrencyCode, CartItem } from '@/types';

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState(product?.price);
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const updateCurrency = () => {
      const savedCurrency = (localStorage.getItem('selected_currency') || 'USD') as CurrencyCode;
      const rates: Record<CurrencyCode, number> = { USD: 1, GBP: 0.79, CAD: 1.36, NGN: 1650 };
      const symbols: Record<CurrencyCode, string> = { USD: '$', GBP: '£', CAD: 'C$', NGN: '₦' };

      const convertedPrice = (product?.price as number) * rates[savedCurrency];
      setDisplayPrice(convertedPrice);
      setCurrencySymbol(symbols[savedCurrency]);
    };

    updateCurrency();
    window.addEventListener('currency-changed', updateCurrency);
    return () => window.removeEventListener('currency-changed', updateCurrency);
  }, [product?.price]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem: CartItem = {
      id: `${product?.id}-${selectedSize}-${selectedColor?.name}`,
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || 0,
      quantity: quantity,
      image: product?.images?.[0]?.url || '',
      alt: product?.images?.[0]?.alt || '',
      variations: {
        size: selectedSize,
        color: selectedColor?.name,
      },
    };

    try {
      const cart: CartItem[] = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
      const existingItemIndex = cart?.findIndex((item: CartItem) => item?.id === cartItem?.id);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart?.push(cartItem);
      }

      localStorage.setItem('shopping_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Product Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {product?.category}
          </span>
          {product?.isNew && (
            <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              New Arrival
            </span>
          )}
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={20}
                variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.rating} ({product?.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-baseline space-x-3">
        <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          {currencySymbol}
          {displayPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        {product?.originalPrice && (
          <span className="text-xl text-muted-foreground line-through">
            {currencySymbol}
            {(product?.originalPrice * (displayPrice / product?.price))?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        )}
      </div>
      {/* Description */}
      <p className="text-base md:text-lg text-foreground leading-relaxed">{product?.description}</p>
      {/* Color Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Color: <span className="text-primary">{selectedColor?.name}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {product?.colors?.map((color) => (
            <button
              key={color?.name}
              onClick={() => setSelectedColor(color)}
              className={`w-12 h-12 rounded-full border-2 transition-all press-effect ${
                selectedColor?.name === color?.name
                  ? 'border-primary shadow-gold scale-110'
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ backgroundColor: color?.hex }}
              aria-label={`Select ${color?.name} color`}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Size: {selectedSize && <span className="text-primary">{selectedSize}</span>}
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 md:gap-3">
          {product?.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-12 rounded-lg border-2 text-sm font-medium transition-all press-effect ${
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground shadow-gold'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Icon name="MinusIcon" size={20} />
          </button>
          <span className="font-data text-xl font-medium text-foreground min-w-[3ch] text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
            className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
      </div>
      {/* Stock Status */}
      <div className="flex items-center space-x-2 text-sm">
        <Icon
          name={product?.inStock ? 'CheckCircleIcon' : 'XCircleIcon'}
          size={20}
          variant="solid"
          className={product?.inStock ? 'text-success' : 'text-error'}
        />
        <span className={product?.inStock ? 'text-success' : 'text-error'}>
          {product?.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product?.inStock}
        className="w-full h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium rounded-lg shadow-gold transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Icon name="ShoppingCartIcon" size={24} />
        <span>Add to Cart</span>
      </button>
      {/* Product Features */}
      <div className="pt-6 border-t border-border space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Key Features</h3>
        <ul className="space-y-3">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="CheckIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm md:text-base text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Specifications */}
      <div className="pt-6 border-t border-border space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Specifications</h3>
        <dl className="space-y-3">
          {Object.entries(product?.specifications)?.map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm md:text-base">
              <dt className="text-muted-foreground">{key}</dt>
              <dd className="text-foreground font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    description: PropTypes?.string?.isRequired,
    isNew: PropTypes?.bool,
    inStock: PropTypes?.bool?.isRequired,
    images: PropTypes?.arrayOf(
      PropTypes?.shape({
        url: PropTypes?.string?.isRequired, 
        alt: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        hex: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    sizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    specifications: PropTypes?.object?.isRequired,
  })?.isRequired,
};