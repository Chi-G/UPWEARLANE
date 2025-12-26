'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Product } from '@/types';

export default function NewArrivalsCarousel({
    newArrivals,
}: {
    newArrivals: Product[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const itemsPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 4,
    };

    const totalSlides = Math.ceil(newArrivals?.length / itemsPerView?.desktop);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    return (
        <section className="bg-background py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 flex items-center justify-between lg:mb-16">
                    <div>
                        <h2 className="font-heading text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                            New Arrivals
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl">
                            Latest innovations in wearable technology and smart
                            fashion
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="hidden items-center space-x-2 lg:flex">
                        <button
                            onClick={goToPrevious}
                            className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-12 items-center justify-center rounded-full border"
                            aria-label="Previous slide"
                        >
                            <Icon name="ChevronLeftIcon" size={20} />
                        </button>
                        <button
                            onClick={goToNext}
                            className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-12 items-center justify-center rounded-full border"
                            aria-label="Next slide"
                        >
                            <Icon name="ChevronRightIcon" size={20} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    <div
                        className="ease-smooth flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {Array.from({ length: totalSlides })?.map(
                            (_, slideIndex: number) => (
                                <div
                                    key={slideIndex}
                                    className="grid w-full flex-shrink-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
                                >
                                    {newArrivals
                                        ?.slice(
                                            slideIndex * itemsPerView?.desktop,
                                            (slideIndex + 1) *
                                                itemsPerView?.desktop,
                                        )
                                        ?.map((product: any) => (
                                            <div
                                                key={product?.id}
                                                className="bg-card border-border shadow-gold hover:shadow-gold-md transition-smooth hover-lift group flex h-full flex-col overflow-hidden rounded-xl border"
                                            >
                                                {/* Product Image */}
                                                <div className="relative aspect-[3/4] overflow-hidden">
                                                    <AppImage
                                                        src={product?.image}
                                                        alt={product?.alt}
                                                        width={400}
                                                        height={400}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />

                                                    {/* New Badge */}
                                                    <div className="bg-success text-success-foreground absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium">
                                                        <Icon
                                                            name="SparklesIcon"
                                                            size={14}
                                                            className="mr-1 inline"
                                                        />
                                                        New
                                                    </div>

                                                    {/* Launch Date */}
                                                    <div className="bg-background/90 text-foreground absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs font-medium">
                                                        {product?.launchDate}
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
                                                                    {
                                                                        product?.name
                                                                    }
                                                                </h3>
                                                            </Link>
                                                            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                                                                {
                                                                    product?.description
                                                                }
                                                            </p>
                                                        </div>

                                                        {/* Features */}
                                                        <div className="flex flex-wrap gap-1">
                                                            {product?.features
                                                                ?.slice(0, 2)
                                                                ?.map(
                                                                    (
                                                                        feature: string,
                                                                        index: number,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-accent text-accent-foreground rounded-md px-2 py-1 text-xs"
                                                                        >
                                                                            {
                                                                                feature
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                            {product?.features
                                                                ?.length >
                                                                2 && (
                                                                <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs">
                                                                    +
                                                                    {product
                                                                        ?.features
                                                                        ?.length -
                                                                        2}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-heading text-foreground text-xl font-bold">
                                                                $
                                                                {product?.price}
                                                            </span>
                                                            {product?.preOrder && (
                                                                <span className="text-primary text-sm font-medium">
                                                                    Pre-order
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Action Button */}
                                                        <Link
                                                            href={`/product-detail?id=${product?.id}`}
                                                            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth press-effect mt-auto inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 font-medium"
                                                        >
                                                            <Icon
                                                                name="EyeIcon"
                                                                size={16}
                                                                className="mr-2"
                                                            />
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="mt-8 flex items-center justify-center space-x-2">
                    {Array.from({ length: totalSlides })?.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-smooth h-3 w-3 rounded-full ${
                                index === currentIndex
                                    ? 'bg-primary'
                                    : 'bg-muted hover:bg-muted-foreground'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="mt-8 flex items-center justify-center space-x-4 lg:hidden">
                    <button
                        onClick={goToPrevious}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-12 items-center justify-center rounded-full border"
                        aria-label="Previous slide"
                    >
                        <Icon name="ChevronLeftIcon" size={20} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-12 items-center justify-center rounded-full border"
                        aria-label="Next slide"
                    >
                        <Icon name="ChevronRightIcon" size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

NewArrivalsCarousel.propTypes = {
    newArrivals: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            name: PropTypes?.string?.isRequired,
            description: PropTypes?.string?.isRequired,
            price: PropTypes?.string?.isRequired,
            image: PropTypes?.string?.isRequired,
            imageAlt: PropTypes?.string?.isRequired,
            launchDate: PropTypes?.string?.isRequired,
            features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
            preOrder: PropTypes?.bool,
        }),
    )?.isRequired,
};
