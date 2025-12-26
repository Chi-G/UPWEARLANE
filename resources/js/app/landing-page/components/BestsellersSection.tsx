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
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [items, setItems] = useState<any[]>([]);

    const handleAddToCart = (product: any) => {
        try {
            const existingCart = JSON.parse(
                localStorage.getItem('shopping_cart') || '[]',
            );
            const existingItem = existingCart?.find(
                (item: any) => item?.id === product?.id,
            );

            let updatedCart;
            if (existingItem) {
                updatedCart = existingCart?.map((item: any) =>
                    item?.id === product?.id
                        ? { ...item, quantity: item?.quantity + 1 }
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
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
                                <div className="bg-primary text-primary-foreground absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium">
                                    <Icon
                                        name="FireIcon"
                                        size={14}
                                        className="mr-1 inline"
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
                            <div className="flex flex-1 flex-col p-4 md:p-6">
                                <div className="flex flex-1 flex-col space-y-3">
                                    <div>
                                        <Link
                                            href={`/product-detail?id=${product?.id}`}
                                            className="group-hover:text-primary transition-smooth block"
                                        >
                                            <h3 className="font-heading text-foreground line-clamp-2 text-lg font-semibold md:text-xl">
                                                {product?.name}
                                            </h3>
                                        </Link>
                                        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                            {product?.description}
                                        </p>
                                    </div>

                                    {/* Rating & Sales */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                {[...Array(5)]?.map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        name="StarIcon"
                                                        size={14}
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
                                        <div className="flex items-center space-x-2">
                                            {product?.originalPrice && (
                                                <span className="text-muted-foreground text-sm line-through">
                                                    ${product?.originalPrice}
                                                </span>
                                            )}
                                            <span className="font-heading text-foreground text-xl font-bold">
                                                ${product?.price}
                                            </span>
                                        </div>
                                        {product?.discount && (
                                            <span className="text-destructive text-sm font-medium">
                                                Save {product?.discount}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={cartItems?.includes(
                                            product?.id,
                                        )}
                                        className={`transition-smooth press-effect mt-auto w-full rounded-lg px-4 py-2.5 font-medium ${
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
            imageAlt: PropTypes?.string?.isRequired,
            rating: PropTypes?.number?.isRequired,
            reviewCount: PropTypes?.number?.isRequired,
            soldCount: PropTypes?.number?.isRequired,
            discount: PropTypes?.number,
        }),
    )?.isRequired,
};
