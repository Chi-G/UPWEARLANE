'use client';

import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

import { Product } from '@/types';

export default function NewArrivalsCarousel({ newArrivals }: { newArrivals: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
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
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              New Arrivals
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Latest innovations in wearable technology and smart fashion
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-accent text-foreground border border-border rounded-full transition-smooth press-effect"
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-accent text-foreground border border-border rounded-full transition-smooth press-effect"
              aria-label="Next slide"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-smooth"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {Array.from({ length: totalSlides })?.map((_, slideIndex: number) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
              >
                {newArrivals?.slice(slideIndex * itemsPerView?.desktop, (slideIndex + 1) * itemsPerView?.desktop)?.map((product: any) => (
                    <div
                      key={product?.id}
                      className="group bg-card border border-border rounded-xl overflow-hidden shadow-gold hover:shadow-gold-md transition-smooth hover-lift h-full flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <AppImage
                          src={product?.image}
                          alt={product?.alt}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* New Badge */}
                        <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
                          <Icon name="SparklesIcon" size={14} className="inline mr-1" />
                          New
                        </div>

                        {/* Launch Date */}
                        <div className="absolute bottom-3 left-3 bg-background/90 text-foreground px-2 py-1 rounded-md text-xs font-medium">
                          {product?.launchDate}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <div className="flex-1 flex flex-col space-y-3">
                          <div>
                            <Link
                              href={`/product-detail?id=${product?.id}`}
                              className="block group-hover:text-primary transition-smooth"
                            >
                              <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground line-clamp-2">
                                {product?.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {product?.description}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1">
                            {product?.features?.slice(0, 2)?.map((feature: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
                              >
                                {feature}
                              </span>
                            ))}
                            {product?.features?.length > 2 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                +{product?.features?.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-heading font-bold text-foreground">
                              ${product?.price}
                            </span>
                            {product?.preOrder && (
                              <span className="text-sm font-medium text-primary">
                                Pre-order
                              </span>
                            )}
                          </div>

                          {/* Action Button */}
                          <Link
                            href={`/product-detail?id=${product?.id}`}
                            className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-smooth press-effect mt-auto"
                          >
                            <Icon name="EyeIcon" size={16} className="mr-2" />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {Array.from({ length: totalSlides })?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentIndex
                  ? 'bg-primary' :'bg-muted hover:bg-muted-foreground'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center justify-center space-x-4 mt-8">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-accent text-foreground border border-border rounded-full transition-smooth press-effect"
            aria-label="Previous slide"
          >
            <Icon name="ChevronLeftIcon" size={20} />
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 flex items-center justify-center bg-surface hover:bg-accent text-foreground border border-border rounded-full transition-smooth press-effect"
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
    })
  )?.isRequired,
};