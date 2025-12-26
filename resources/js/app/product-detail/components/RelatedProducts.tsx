import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Product } from '@/types';

export default function RelatedProducts({ products }: { products: Product[] }) {
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
                <h2 className="font-heading text-foreground text-2xl font-bold md:text-3xl">
                    You May Also Like
                </h2>
                <div className="hidden items-center space-x-2 md:flex">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-10 w-10 items-center justify-center rounded-lg border"
                        aria-label="Scroll left"
                    >
                        <Icon name="ChevronLeftIcon" size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-10 w-10 items-center justify-center rounded-lg border"
                        aria-label="Scroll right"
                    >
                        <Icon name="ChevronRightIcon" size={20} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products?.map((product: Product) => (
                    <Link
                        key={product?.id}
                        href="/product-detail"
                        className="group w-64 flex-shrink-0 snap-start md:w-72"
                    >
                        <div className="space-y-3">
                            <div className="bg-surface relative aspect-[3/4] overflow-hidden rounded-xl">
                                <AppImage
                                    src={product?.image}
                                    alt={product?.imageAlt}
                                    width={400}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {product?.isNew && (
                                    <span className="bg-success absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white">
                                        New
                                    </span>
                                )}
                                {product?.discount && (
                                    <span className="bg-error absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white">
                                        -{product?.discount}%
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-foreground group-hover:text-primary transition-smooth line-clamp-2 font-medium">
                                    {product?.name}
                                </h3>
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)]?.map((_, i) => (
                                        <Icon
                                            key={i}
                                            name="StarIcon"
                                            size={14}
                                            variant={
                                                i < Math.floor(product?.rating)
                                                    ? 'solid'
                                                    : 'outline'
                                            }
                                            className={
                                                i < Math.floor(product?.rating)
                                                    ? 'text-primary'
                                                    : 'text-muted'
                                            }
                                        />
                                    ))}
                                    <span className="text-muted-foreground ml-1 text-xs">
                                        ({product?.reviewCount})
                                    </span>
                                </div>
                                <div className="flex items-baseline space-x-2">
                                    <span className="font-heading text-foreground text-xl font-bold">
                                        ${product?.price?.toFixed(2)}
                                    </span>
                                    {product?.originalPrice && (
                                        <span className="text-muted-foreground text-sm line-through">
                                            $
                                            {product?.originalPrice?.toFixed(2)}
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
        }),
    )?.isRequired,
};
