import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ProductCard({
    product,
    viewMode,
    onAddToCart,
}: {
    product: Product;
    viewMode: string;
    onAddToCart: (product: Product) => void;
}) {
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
                className="bg-card hover:bg-accent/50 border-border transition-smooth hover-lift group flex flex-col gap-4 rounded-lg border p-4 sm:flex-row md:gap-6 md:p-6"
            >
                <div className="w-full flex-shrink-0 sm:w-48 md:w-64">
                    <div className="bg-muted aspect-[3/4] overflow-hidden rounded-lg">
                        <AppImage
                            src={product?.image}
                            alt={product?.alt}
                            width={400}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="space-y-2 md:space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-heading text-foreground group-hover:text-primary transition-smooth line-clamp-2 text-lg font-semibold md:text-xl lg:text-2xl">
                                    {product?.name}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                                    {product?.category}
                                </p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`touch-target transition-smooth press-effect flex h-10 w-10 items-center justify-center rounded-lg border-2 md:h-12 md:w-12 ${
                                    isSelected
                                        ? 'bg-primary border-primary text-primary-foreground'
                                        : 'bg-background border-border text-foreground hover:border-primary'
                                } disabled:cursor-not-allowed disabled:opacity-50`}
                                aria-label={
                                    isSelected
                                        ? 'Remove from cart'
                                        : 'Add to cart'
                                }
                            >
                                <Icon
                                    name={
                                        isSelected
                                            ? 'CheckIcon'
                                            : 'ShoppingCartIcon'
                                    }
                                    size={20}
                                    className={isAdding ? 'animate-pulse' : ''}
                                />
                            </button>
                        </div>

                        <p className="text-muted-foreground line-clamp-3 text-sm md:text-base">
                            {product?.description}
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)]?.map((_, i: number) => (
                                    <Icon
                                        key={i}
                                        name="StarIcon"
                                        size={16}
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
                            </div>
                            <span className="text-muted-foreground text-xs md:text-sm">
                                ({product?.reviews} reviews)
                            </span>
                        </div>

                        {product?.colors && product?.colors?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground text-xs md:text-sm">
                                    Colors:
                                </span>
                                <div className="flex gap-1.5">
                                    {product?.colors?.map(
                                        (color, index: number) => {
                                            const bgColor =
                                                typeof color === 'string'
                                                    ? color
                                                    : color?.hex;
                                            const colorName =
                                                typeof color === 'string'
                                                    ? color
                                                    : color?.name;
                                            return (
                                                <div
                                                    key={index}
                                                    className="border-border h-5 w-5 rounded-full border-2 md:h-6 md:w-6"
                                                    style={{
                                                        backgroundColor:
                                                            bgColor,
                                                    }}
                                                    title={colorName}
                                                />
                                            );
                                        },
                                    )}
                                    {product?.colors?.length > 5 && (
                                        <span className="text-muted-foreground text-xs">
                                            +{product?.colors?.length - 5}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                        <div className="flex items-baseline gap-2">
                            <span className="font-data text-foreground whitespace-nowrap text-2xl font-semibold md:text-3xl">
                                {product?.price}
                            </span>
                            {product?.originalPrice && (
                                <span className="font-data text-muted-foreground whitespace-nowrap text-base line-through md:text-lg">
                                    {product?.originalPrice}
                                </span>
                            )}
                        </div>
                        {product?.discount && (
                            <span className="bg-primary/10 text-primary whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium md:text-sm">
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
            className="bg-card hover:bg-accent/50 border-border transition-smooth hover-lift group flex w-full min-w-0 flex-col overflow-hidden rounded-lg border"
        >
            <div className="bg-muted relative aspect-[3/4] overflow-hidden">
                <AppImage
                    src={product?.image}
                    alt={product?.alt}
                    className="transition-smooth h-full w-full object-cover group-hover:scale-105"
                />
                {product?.discount && (
                    <div className="bg-primary text-primary-foreground shadow-gold absolute right-3 top-3 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium md:text-sm">
                        {product?.discount}% OFF
                    </div>
                )}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`touch-target transition-smooth press-effect absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg border-2 backdrop-blur-sm md:h-12 md:w-12 ${
                        isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background/90 border-border text-foreground hover:border-primary'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    aria-label={isSelected ? 'Remove from cart' : 'Add to cart'}
                >
                    <Icon
                        name={isSelected ? 'CheckIcon' : 'ShoppingCartIcon'}
                        size={20}
                        className={isAdding ? 'animate-pulse' : ''}
                    />
                </button>
            </div>
                <div className="space-y-2 p-3 md:space-y-3 md:p-6">
                <div>
                    <p className="text-muted-foreground mb-1 text-[10px] md:text-sm">
                        {product?.category}
                    </p>
                    <h3 className="font-heading text-foreground group-hover:text-primary transition-smooth line-clamp-2 text-sm font-semibold md:text-lg lg:text-xl">
                        {product?.name}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)]?.map((_, i: number) => (
                            <Icon
                                key={i}
                                name="StarIcon"
                                size={12}
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
                    </div>
                    <span className="text-muted-foreground text-xs">
                        ({product?.reviews})
                    </span>
                </div>

                {product?.colors && product?.colors?.length > 0 && (
                    <div className="flex gap-1.5">
                        {product?.colors
                            ?.slice(0, 4)
                            ?.map((color, index: number) => {
                                const bgColor =
                                    typeof color === 'string'
                                        ? color
                                        : color?.hex;
                                const colorName =
                                    typeof color === 'string'
                                        ? color
                                        : color?.name;
                                return (
                                    <div
                                        key={index}
                                        className="border-border h-4 w-4 rounded-full border-2 md:h-5 md:w-5"
                                        style={{ backgroundColor: bgColor }}
                                        title={colorName}
                                    />
                                );
                            })}
                        {product?.colors?.length > 4 && (
                            <span className="text-muted-foreground self-center text-xs">
                                +{product?.colors?.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="border-border flex items-center justify-between border-t pt-3">
                    <div className="flex items-baseline gap-1.5 md:gap-2">
                        <span className="font-data text-foreground whitespace-nowrap text-lg font-semibold md:text-2xl">
                            {product?.price}
                        </span>
                        {product?.originalPrice && (
                            <span className="font-data text-muted-foreground whitespace-nowrap text-xs line-through">
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
                }),
            ]),
        ),
    })?.isRequired,
    viewMode: PropTypes?.oneOf(['grid', 'list'])?.isRequired,
    onAddToCart: PropTypes?.func?.isRequired,
};
