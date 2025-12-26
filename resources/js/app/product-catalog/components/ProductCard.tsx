import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product } from '@/types';

export default function ProductCard({ product, viewMode, onAddToCart }: { product: Product, viewMode: string, onAddToCart: (product: Product) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsAdding(true);
    setIsSelected(!isSelected);
    
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
    }, 300);
  };

  if (viewMode === 'list') {
    return (
      <Link 
        href={`/product-detail?id=${product?.id}`}
        className="group flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-6 bg-card hover:bg-accent/50 rounded-lg border border-border transition-smooth hover-lift"
      >
        <div className="w-full sm:w-48 md:w-64 flex-shrink-0">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <AppImage
              src={product?.image}
              alt={product?.alt}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {product?.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {product?.category}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`touch-target flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 transition-smooth press-effect ${
                  isSelected
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-foreground hover:border-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isSelected ? 'Remove from cart' : 'Add to cart'}
              >
                <Icon 
                  name={isSelected ? 'CheckIcon' : 'ShoppingCartIcon'} 
                  size={20}
                  className={isAdding ? 'animate-pulse' : ''}
                />
              </button>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
              {product?.description}
            </p>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i: number) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={16}
                    variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                    className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted'}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({product?.reviews} reviews)
              </span>
            </div>
            
            {product?.colors && product?.colors?.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-muted-foreground">Colors:</span>
                <div className="flex gap-1.5">
                  {product?.colors?.map((color, index: number) => {
                    const bgColor = typeof color === 'string' ? color : color?.hex;
                    const colorName = typeof color === 'string' ? color : color?.name;
                    return (
                      <div
                        key={index}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-border"
                        style={{ backgroundColor: bgColor }}
                        title={colorName}
                      />
                    );
                  })}
                  {product?.colors?.length > 5 && (
                    <span className="text-xs text-muted-foreground">+{product?.colors?.length - 5}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-baseline gap-2">
              <span className="font-data text-2xl md:text-3xl font-semibold text-foreground whitespace-nowrap">
                {product?.price}
              </span>
              {product?.originalPrice && (
                <span className="font-data text-base md:text-lg text-muted-foreground line-through whitespace-nowrap">
                  {product?.originalPrice}
                </span>
              )}
            </div>
            {product?.discount && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs md:text-sm font-medium rounded-full whitespace-nowrap">
                {product?.discount}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      href={`/product-detail?id=${product?.id}`}
      className="group flex flex-col bg-card hover:bg-accent/50 rounded-lg border border-border overflow-hidden transition-smooth hover-lift w-full min-w-0"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <AppImage
          src={product?.image}
          alt={product?.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {product?.discount && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary text-primary-foreground text-xs md:text-sm font-medium rounded-full shadow-gold whitespace-nowrap">
            {product?.discount}% OFF
          </div>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`absolute bottom-3 right-3 touch-target flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 backdrop-blur-sm transition-smooth press-effect ${
            isSelected
              ? 'bg-primary border-primary text-primary-foreground'
              : 'bg-background/90 border-border text-foreground hover:border-primary'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={isSelected ? 'Remove from cart' : 'Add to cart'}
        >
          <Icon 
            name={isSelected ? 'CheckIcon' : 'ShoppingCartIcon'} 
            size={20}
            className={isAdding ? 'animate-pulse' : ''}
          />
        </button>
      </div>
      <div className="p-4 md:p-6 space-y-3">
        <div>
          <p className="text-xs md:text-sm text-muted-foreground mb-1">
            {product?.category}
          </p>
          <h3 className="font-heading text-base md:text-lg lg:text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
            {product?.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)]?.map((_, i: number) => (
              <Icon
                key={i}
                name="StarIcon"
                size={14}
                variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviews})
          </span>
        </div>
        
        {product?.colors && product?.colors?.length > 0 && (
          <div className="flex gap-1.5">
            {product?.colors?.slice(0, 4)?.map((color, index: number) => {
              const bgColor = typeof color === 'string' ? color : color?.hex;
              const colorName = typeof color === 'string' ? color : color?.name;
              return (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-2 border-border"
                  style={{ backgroundColor: bgColor }}
                  title={colorName}
                />
              );
            })}
            {product?.colors?.length > 4 && (
              <span className="text-xs text-muted-foreground self-center">+{product?.colors?.length - 4}</span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xl md:text-2xl font-semibold text-foreground whitespace-nowrap">
              {product?.price}
            </span>
            {product?.originalPrice && (
              <span className="font-data text-sm text-muted-foreground line-through whitespace-nowrap">
                {product?.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.string?.isRequired,
    originalPrice: PropTypes?.string,
    discount: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviews: PropTypes?.number?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    colors: PropTypes?.arrayOf(
      PropTypes?.oneOfType([
        PropTypes?.string,
        PropTypes?.shape({
          name: PropTypes?.string?.isRequired,
          hex: PropTypes?.string?.isRequired,
        })
      ])
    ),
  })?.isRequired,
  viewMode: PropTypes?.oneOf(['grid', 'list'])?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
};