'use client';

import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

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
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
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
      const existingCart: any[] = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
      const cartItem = {
        id: deal?.id,
        name: deal?.title,
        price: deal?.discountedPrice,
        originalPrice: deal?.originalPrice,
        image: deal?.image,
        imageAlt: deal?.imageAlt,
        quantity: 1,
        isDeal: true
      };

      const existingItem = existingCart?.find((item: any) => item?.id === deal?.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = existingCart?.map((item: any) =>
          item?.id === deal?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
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
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Limited Time Deals
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Exclusive discounts and bundles on premium tech fashion - Don't miss out!
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {deals?.map((deal: Deal) => (
            <div
              key={deal?.id}
              className="group bg-card border-2 border-primary/20 rounded-2xl overflow-hidden shadow-gold-lg hover:shadow-gold-xl transition-smooth"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Deal Image */}
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <AppImage
                    src={deal?.image}
                    alt={deal?.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-2 rounded-lg shadow-gold">
                    <span className="text-lg font-bold">-{deal?.discount}%</span>
                  </div>

                  {/* Deal Type */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    {deal?.type}
                  </div>
                </div>

                {/* Deal Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 line-clamp-2">
                        {deal?.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {deal?.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-primary">
                        ${deal?.discountedPrice}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ${deal?.originalPrice}
                      </span>
                      <span className="text-xs font-medium text-success px-0 py-1 rounded">
                        Save ${(parseFloat(deal?.originalPrice) - parseFloat(deal?.discountedPrice))?.toFixed(2)}
                      </span>
                    </div>

                    {/* Countdown Timer */}
                    {timeLeft?.[deal?.id] && (
                      <div className="bg-accent/50 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-2">Deal ends in:</div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div className="bg-background rounded-md p-2">
                            <div className="text-lg font-bold text-foreground">
                              {timeLeft?.[deal?.id]?.days}
                            </div>
                            <div className="text-xs text-muted-foreground">Days</div>
                          </div>
                          <div className="bg-background rounded-md p-2">
                            <div className="text-lg font-bold text-foreground">
                              {timeLeft?.[deal?.id]?.hours}
                            </div>
                            <div className="text-xs text-muted-foreground">Hours</div>
                          </div>
                          <div className="bg-background rounded-md p-2">
                            <div className="text-lg font-bold text-foreground">
                              {timeLeft?.[deal?.id]?.minutes}
                            </div>
                            <div className="text-xs text-muted-foreground">Min</div>
                          </div>
                          <div className="bg-background rounded-md p-2">
                            <div className="text-lg font-bold text-foreground">
                              {timeLeft?.[deal?.id]?.seconds}
                            </div>
                            <div className="text-xs text-muted-foreground">Sec</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="space-y-2">
                      {deal?.features?.map((feature: any, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="CheckIcon" size={16} className="text-success flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={() => handleAddToCart(deal)}
                      className="flex-[2] flex items-center justify-center py-2.5 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-gold-sm hover:shadow-gold transition-all duration-300 press-effect"
                    >
                      <Icon name="ShoppingCartIcon" size={18} className="mr-2" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/product-detail?id=${deal?.productId}`}
                      className="flex-1 flex items-center justify-center py-2.5 px-6 bg-transparent hover:bg-accent text-foreground border-2 border-primary/20 hover:border-primary/40 font-semibold rounded-xl transition-all duration-300 press-effect"
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
        <div className="text-center mt-12">
          <Link
            href="/product-catalog?filter=deals"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
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
    })
  )?.isRequired,
};