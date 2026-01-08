import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Product } from '@/types';

export default function BestsellersSection({
    bestsellers,
}: {
    bestsellers: Product[];
}) {
    const [cartItems, setCartItems] = useState<number[]>([]);

    const handleAddToCart = (product: Product) => {
        try {
            const existingCart = JSON.parse(
                localStorage.getItem('shopping_cart') || '[]',
            ) as Array<{ id: number; quantity?: number }>;
            const existingItem = existingCart?.find(
                (item) => item?.id === product?.id,
            );

            let updatedCart;
            if (existingItem) {
                updatedCart = existingCart?.map((item) =>
                    item?.id === product?.id
                        ? { ...item, quantity: (item?.quantity || 0) + 1 }
                        : item,
                );
            } else {
                updatedCart = [...existingCart, { ...product, quantity: 1 }];
            }

            localStorage.setItem('shopping_cart', JSON.stringify(updatedCart));
            setCartItems((prev) => [...prev, product?.id]);

            // Dispatch event for cart indicator
            window.dispatchEvent(new Event('cart-updated'));

            // Remove from visual state after animation
            setTimeout(() => {
                setCartItems((prev) =>
                    prev?.filter((id) => id !== product?.id),
                );
            }, 1000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <section className="bg-surface py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center lg:mb-16">
                    <h2 className="font-heading text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Bestsellers
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                        Our most popular tech-infused fashion items loved by
                        customers worldwide
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                    {bestsellers?.map((product) => (
                        <div
                            key={product?.id}
                            className="bg-card border-border shadow-gold hover:shadow-gold-md transition-smooth group flex h-full flex-col overflow-hidden rounded-xl border"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <AppImage
                                    src={product?.image}
                                    alt={product?.alt}
                                    width={400}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Bestseller Badge */}
                                <div className="bg-primary text-primary-foreground absolute left-3 top-3 rounded-md px-1.5 py-0.5 text-[10px] font-medium md:px-2 md:py-1 md:text-xs">
                                    <Icon
                                        name="FireIcon"
                                        size={12}
                                        className="mr-0.5 inline md:mr-1 md:size-[14px]"
                                    />
                                    Bestseller
                                </div>

                                {/* Quick Add to Cart */}
                                <div className="absolute right-3 top-3">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={cartItems?.includes(
                                            product?.id,
                                        )}
                                        className={`border-background bg-background/90 hover:bg-background transition-smooth press-effect h-10 w-10 rounded-full border-2 ${
                                            cartItems?.includes(product?.id)
                                                ? 'text-success'
                                                : 'text-foreground hover:text-primary'
                                        }`}
                                        aria-label={`Add ${product?.name} to cart`}
                                    >
                                        <Icon
                                            name={
                                                cartItems?.includes(product?.id)
                                                    ? 'CheckIcon'
                                                    : 'PlusIcon'
                                            }
                                            size={20}
                                            className="mx-auto"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-1 flex-col space-y-1.5 p-2 md:space-y-3 md:p-6">
                                <div className="flex flex-1 flex-col space-y-1.5 md:space-y-3">
                                    <div>
                                        <Link
                                            href={`/product-detail/${product?.id}`}
                                            className="group-hover:text-primary transition-smooth block"
                                        >
                                            <h3 className="font-heading text-foreground line-clamp-2 text-xs font-semibold md:text-lg lg:text-xl">
                                                {product?.name}
                                            </h3>
                                        </Link>
                                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] md:mt-1 md:line-clamp-2 md:text-sm">
                                            {product?.description}
                                        </p>
                                    </div>

                                    {/* Rating & Sales */}
                                    <div className="flex flex-col items-start space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0">
                                        <div className="flex items-center space-x-1">
                                            <div className="flex items-center">
                                                {[...Array(5)]?.map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        name="StarIcon"
                                                        size={10}
                                                        variant={
                                                            i <
                                                            Math.floor(
                                                                product?.rating,
                                                            )
                                                                ? 'solid'
                                                                : 'outline'
                                                        }
                                                        className={
                                                            i <
                                                            Math.floor(
                                                                product?.rating,
                                                            )
                                                                ? 'text-primary'
                                                                : 'text-muted-foreground'
                                                        }
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-muted-foreground text-xs">
                                                ({product?.reviewCount})
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground text-xs">
                                            {product?.soldCount} sold
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                                            {product?.originalPrice && (
                                                <span className="text-muted-foreground text-[10px] line-through md:text-sm">
                                                    ${product?.originalPrice}
                                                </span>
                                            )}
                                            <span className="font-heading text-foreground text-sm font-bold md:text-xl">
                                                ${product?.price}
                                            </span>
                                        </div>
                                        {product?.discount && (
                                            <span className="text-destructive text-[10px] font-medium md:text-sm">
                                                {product?.discount}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={cartItems?.includes(
                                            product?.id,
                                        )}
                                        className={`transition-smooth press-effect mt-auto w-full rounded-lg px-2 py-1.5 text-xs font-medium md:px-4 md:py-2.5 md:text-base ${
                                            cartItems?.includes(product?.id)
                                                ? 'bg-success text-success-foreground'
                                                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                                        }`}
                                    >
                                        {cartItems?.includes(product?.id) ? (
                                            <span className="flex items-center justify-center">
                                                <Icon
                                                    name="CheckIcon"
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Added to Cart
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <Icon
                                                    name="ShoppingCartIcon"
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Add to Cart
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/product-catalog?filter=bestsellers"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect inline-flex items-center rounded-lg px-8 py-3 font-medium"
                    >
                        <span>View All Bestsellers</span>
                        <Icon
                            name="ArrowRightIcon"
                            size={20}
                            className="ml-2"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

BestsellersSection.propTypes = {
    bestsellers: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            name: PropTypes?.string?.isRequired,
            description: PropTypes?.string?.isRequired,
            price: PropTypes?.string?.isRequired,
            originalPrice: PropTypes?.string,
            image: PropTypes?.string?.isRequired,
            alt: PropTypes?.string?.isRequired,
            category: PropTypes?.string?.isRequired,
            rating: PropTypes?.number?.isRequired,
            reviewCount: PropTypes?.number?.isRequired,
            soldCount: PropTypes?.number?.isRequired,
            discount: PropTypes?.number,
        }),
    )?.isRequired,
};
