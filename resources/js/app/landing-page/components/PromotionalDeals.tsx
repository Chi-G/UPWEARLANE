'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

interface Deal {
    id: number;
    title: string;
    description: string;
    originalPrice: string;
    discountedPrice: string;
    discount: number;
    image: string;
    imageAlt: string;
    type: string;
    endDate: string;
    features: string[];
    productId: number;
}

interface TimeLeftState {
    [key: number]: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null;
}

export default function PromotionalDeals({ deals }: { deals: Deal[] }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeftState>({});

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()?.getTime();
            const newTimeLeft: TimeLeftState = {};

            deals?.forEach((deal: Deal) => {
                const endTime = new Date(deal.endDate)?.getTime();
                const difference = endTime - now;

                if (difference > 0) {
                    newTimeLeft[deal.id] = {
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor(
                            (difference % (1000 * 60 * 60 * 24)) /
                                (1000 * 60 * 60),
                        ),
                        minutes: Math.floor(
                            (difference % (1000 * 60 * 60)) / (1000 * 60),
                        ),
                        seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    };
                } else {
                    newTimeLeft[deal.id] = null;
                }
            });

            setTimeLeft(newTimeLeft);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [deals]);

    const handleAddToCart = (deal: Deal) => {
        try {
            const existingCart = JSON.parse(
                localStorage.getItem('shopping_cart') || '[]',
            ) as Array<{ id: number; quantity?: number }>;
            const cartItem = {
                id: deal?.id,
                name: deal?.title,
                price: deal?.discountedPrice,
                originalPrice: deal?.originalPrice,
                image: deal?.image,
                imageAlt: deal?.imageAlt,
                quantity: 1,
                isDeal: true,
            };

            const existingItem = existingCart?.find((item) => item?.id === deal?.id);
            let updatedCart;

            if (existingItem) {
                updatedCart = existingCart?.map((item) =>
                    item?.id === deal?.id
                        ? { ...item, quantity: (item?.quantity || 0) + 1 }
                        : item,
                );
            } else {
                updatedCart = [...existingCart, cartItem];
            }

            localStorage.setItem('shopping_cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error('Error adding deal to cart:', error);
        }
    };

    return (
        <section className="from-primary/5 via-background to-accent/10 bg-gradient-to-br py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center lg:mb-16">
                    <h2 className="font-heading text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Limited Time Deals
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                        Exclusive discounts and bundles on premium tech fashion
                        - Don't miss out!
                    </p>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {deals?.map((deal: Deal) => (
                        <div
                            key={deal?.id}
                            className="bg-card border-primary/20 shadow-gold-lg hover:shadow-gold-xl transition-smooth group overflow-hidden rounded-2xl border-2"
                        >
                            <div className="grid h-full grid-cols-1 md:grid-cols-2">
                                {/* Deal Image */}
                                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                                    <AppImage
                                        src={deal?.image}
                                        alt={deal?.imageAlt}
                                        width={800}
                                        height={600}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Discount Badge */}
                                    <div className="bg-destructive text-destructive-foreground shadow-gold absolute left-4 top-4 rounded-lg px-3 py-2">
                                        <span className="text-lg font-bold">
                                            -{deal?.discount}%
                                        </span>
                                    </div>

                                    {/* Deal Type */}
                                    <div className="bg-primary text-primary-foreground absolute right-4 top-4 rounded-md px-3 py-1 text-sm font-medium">
                                        {deal?.type}
                                    </div>
                                </div>

                                {/* Deal Content */}
                                <div className="flex flex-col justify-between p-6 lg:p-8">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-heading text-foreground mb-2 line-clamp-2 text-2xl font-bold md:text-3xl">
                                                {deal?.title}
                                            </h3>
                                            <p className="text-muted-foreground line-clamp-3">
                                                {deal?.description}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center space-x-3">
                                            <span className="font-heading text-primary text-2xl font-bold md:text-3xl">
                                                ${deal?.discountedPrice}
                                            </span>
                                            <span className="text-muted-foreground text-lg line-through">
                                                ${deal?.originalPrice}
                                            </span>
                                            <span className="text-success rounded px-0 py-1 text-xs font-medium">
                                                Save $
                                                {(
                                                    parseFloat(
                                                        deal?.originalPrice,
                                                    ) -
                                                    parseFloat(
                                                        deal?.discountedPrice,
                                                    )
                                                )?.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Countdown Timer */}
                                        {timeLeft?.[deal?.id] && (
                                            <div className="bg-accent/50 rounded-lg p-4">
                                                <div className="text-muted-foreground mb-2 text-sm">
                                                    Deal ends in:
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 text-center">
                                                    <div className="bg-background rounded-md p-2">
                                                        <div className="text-foreground text-lg font-bold">
                                                            {
                                                                timeLeft?.[
                                                                    deal?.id
                                                                ]?.days
                                                            }
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            Days
                                                        </div>
                                                    </div>
                                                    <div className="bg-background rounded-md p-2">
                                                        <div className="text-foreground text-lg font-bold">
                                                            {
                                                                timeLeft?.[
                                                                    deal?.id
                                                                ]?.hours
                                                            }
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            Hours
                                                        </div>
                                                    </div>
                                                    <div className="bg-background rounded-md p-2">
                                                        <div className="text-foreground text-lg font-bold">
                                                            {
                                                                timeLeft?.[
                                                                    deal?.id
                                                                ]?.minutes
                                                            }
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            Min
                                                        </div>
                                                    </div>
                                                    <div className="bg-background rounded-md p-2">
                                                        <div className="text-foreground text-lg font-bold">
                                                            {
                                                                timeLeft?.[
                                                                    deal?.id
                                                                ]?.seconds
                                                            }
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            Sec
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Features */}
                                        <div className="space-y-2">
                                            {deal?.features?.map((feature: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Icon
                                                            name="CheckIcon"
                                                            size={16}
                                                            className="text-success flex-shrink-0"
                                                        />
                                                        <span className="text-foreground text-sm">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                        <button
                                            onClick={() =>
                                                handleAddToCart(deal)
                                            }
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold-sm hover:shadow-gold press-effect flex flex-[2] items-center justify-center rounded-xl px-6 py-2.5 font-semibold transition-all duration-300"
                                        >
                                            <Icon
                                                name="ShoppingCartIcon"
                                                size={18}
                                                className="mr-2"
                                            />
                                            Add to Cart
                                        </button>
                                        <Link
                                            href={`/product-detail?id=${deal?.productId}`}
                                            className="hover:bg-accent text-foreground border-primary/20 hover:border-primary/40 press-effect flex flex-1 items-center justify-center rounded-xl border-2 bg-transparent px-6 py-2.5 font-semibold transition-all duration-300"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Deals */}
                <div className="mt-12 text-center">
                    <Link
                        href="/product-catalog?filter=deals"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect inline-flex items-center rounded-lg px-8 py-3 font-medium"
                    >
                        <Icon name="TagIcon" size={20} className="mr-2" />
                        <span>View All Deals</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

PromotionalDeals.propTypes = {
    deals: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            title: PropTypes?.string?.isRequired,
            description: PropTypes?.string?.isRequired,
            originalPrice: PropTypes?.string?.isRequired,
            discountedPrice: PropTypes?.string?.isRequired,
            discount: PropTypes?.number?.isRequired,
            image: PropTypes?.string?.isRequired,
            imageAlt: PropTypes?.string?.isRequired,
            type: PropTypes?.string?.isRequired,
            endDate: PropTypes?.string?.isRequired,
            features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
            productId: PropTypes?.number?.isRequired,
        }),
    )?.isRequired,
};
