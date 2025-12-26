import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function RelatedProducts({ products }: { products: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef?.current) {
      const scrollAmount = 320;
      scrollContainerRef?.current?.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          You May Also Like
        </h2>
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeftIcon" size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRightIcon" size={20} />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products?.map((product: any) => (
          <Link
            key={product?.id}
            href="/product-detail"
            className="flex-shrink-0 w-64 md:w-72 group snap-start"
          >
            <div className="space-y-3">
              <div className="relative aspect-[3/4] bg-surface rounded-xl overflow-hidden">
                <AppImage
                  src={product?.image}
                  alt={product?.imageAlt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product?.isNew && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-success text-white text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {product?.discount && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-error text-white text-xs font-medium rounded-full">
                    -{product?.discount}%
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {product?.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={14}
                      variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                      className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted'}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product?.reviewCount})
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-heading text-xl font-bold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product?.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      isNew: PropTypes?.bool,
      discount: PropTypes?.number,
    })
  )?.isRequired,
};