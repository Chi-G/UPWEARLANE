import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import { Product, CurrencyCode } from '@/types';
import { convertPrice, getSelectedCurrency, getCurrencySymbols } from '@/utils/currency';

export default function FeaturedProducts({
    products,
}: {
    products: Product[];
}) {
    const [selectedCategory] = useState<string>('All');
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('NGN');
    const [currencySymbol, setCurrencySymbol] = useState('₦');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const updateCurrency = () => {
            const currency = getSelectedCurrency();
            const symbols = getCurrencySymbols();
            setSelectedCurrency(currency);
            setCurrencySymbol(symbols[currency]);
        };

        updateCurrency();
        window.addEventListener('currency-changed', updateCurrency);
        // Simulate loading for 4 seconds
        const timer = setTimeout(() => setIsLoading(false), 4000);
        return () => {
            window.removeEventListener('currency-changed', updateCurrency);
            clearTimeout(timer);
        };
    }, []);

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter(
                  (product) => product.category === selectedCategory,
              );

    return (
        <section className="bg-background py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center lg:mb-16">
                    <h2 className="font-heading text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Featured Products
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
                        Discover our handpicked selection of cutting-edge
                        wearable technology and high-tech fashion essentials
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                    {isLoading
                        ? [...Array(4)].map((_, i) => (
                              <div key={i} className="flex flex-col space-y-3">
                                  <Skeleton className="h-[250px] w-full rounded-xl" />
                                  <div className="space-y-2">
                                      <Skeleton className="h-4 w-full" />
                                      <Skeleton className="h-4 w-3/4" />
                                  </div>
                              </div>
                          ))
                        : filteredProducts?.map((product) => (
                              <div
                                  key={product?.id}
                                  className="bg-card border-border shadow-gold hover:shadow-gold-md transition-smooth hover-lift group flex flex-col overflow-hidden rounded-xl border sm:h-full"
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
                                      {product?.isNew && (
                                          <div className="bg-primary text-primary-foreground absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium">
                                              New
                                          </div>
                                      )}
                                      {product?.discount && (
                                          <div className="bg-destructive text-destructive-foreground absolute right-3 top-3 rounded-md px-1.5 py-0.5 text-[10px] font-medium md:px-2 md:py-1 md:text-xs">
                                              -{product?.discount}%
                                          </div>
                                      )}

                                      {/* Quick Actions */}
                                      <div className="bg-background/80 transition-smooth absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                          <Link
                                              href={`/product-detail/${product?.id}`}
                                              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth press-effect rounded-lg px-6 py-2 font-medium"
                                          >
                                              View Details
                                          </Link>
                                      </div>
                                  </div>

                                  {/* Product Info */}
                                  <div className="flex flex-col space-y-1.5 p-2 md:space-y-3 md:p-6 lg:flex-1">
                                      <div className="flex flex-col space-y-1.5 md:space-y-3 lg:flex-1">
                                          <div>
                                              <h3 className="font-heading text-foreground group-hover:text-primary transition-smooth line-clamp-2 text-xs font-semibold md:text-lg lg:text-xl">
                                                  {product?.name}
                                              </h3>
                                              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] md:mt-1 md:line-clamp-2 md:text-sm">
                                                  {product?.description}
                                              </p>
                                          </div>

                                          {/* Rating */}
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
                                              <span className="text-muted-foreground text-[10px] md:text-sm">
                                                  ({product?.reviewCount})
                                              </span>
                                          </div>

                                          {/* Price */}
                                          <div className="flex items-center justify-between">
                                              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                                                  {product?.originalPrice && (
                                                      <span className="text-muted-foreground text-[10px] line-through md:text-sm">
                                                          {currencySymbol}{convertPrice(
                                                              typeof product.originalPrice === 'string'
                                                                  ? parseFloat(product.originalPrice)
                                                                  : product.originalPrice,
                                                              (product.currency || 'NGN') as CurrencyCode,
                                                              selectedCurrency
                                                          ).toFixed(2)}
                                                      </span>
                                                  )}
                                                  <span className="font-heading text-foreground text-sm font-bold md:text-xl">
                                                      {currencySymbol}{convertPrice(
                                                          typeof product.price === 'string'
                                                              ? parseFloat(product.price)
                                                              : product.price,
                                                          (product.currency || 'NGN') as CurrencyCode,
                                                          selectedCurrency
                                                      ).toFixed(2)}
                                                  </span>
                                              </div>
                                          </div>

                                          {/* Colors */}
                                          {product?.colors &&
                                              product?.colors?.length > 0 && (
                                                  <div className="flex items-center space-x-2 pt-3 lg:mt-auto">
                                                      <span className="text-muted-foreground text-sm">
                                                          Colors:
                                                      </span>
                                                      <div className="flex space-x-1">
                                                          {product?.colors
                                                              ?.slice(0, 4)
                                                              ?.map(
                                                                  (
                                                                      color,
                                                                      index: number,
                                                                  ) => {
                                                                      const bgColor =
                                                                          typeof color ===
                                                                          'string'
                                                                              ? color
                                                                              : color?.hex;
                                                                      const colorName =
                                                                          typeof color ===
                                                                          'string'
                                                                              ? color
                                                                              : color?.name;
                                                                      return (
                                                                          <div
                                                                              key={
                                                                                  index
                                                                              }
                                                                              className="border-border h-3 w-3 rounded-full border md:h-4 md:w-4"
                                                                              style={{
                                                                                  backgroundColor:
                                                                                      bgColor,
                                                                              }}
                                                                              title={
                                                                                  colorName
                                                                              }
                                                                          />
                                                                      );
                                                                  },
                                                              )}
                                                          {product?.colors?.length >
                                                              4 && (
                                                              <span className="text-muted-foreground text-xs">
                                                                  +
                                                                  {product?.colors
                                                                      ?.length - 4}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </div>
                                              )}
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/product-catalog?filter=featured"
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect inline-flex items-center rounded-lg border px-8 py-3 font-medium"
                    >
                        <span>View All Featured</span>
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

FeaturedProducts.propTypes = {
    products: PropTypes?.arrayOf(
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
            isNew: PropTypes?.bool,
            discount: PropTypes?.number,
            colors: PropTypes?.arrayOf(PropTypes?.string),
        }),
    )?.isRequired,
};
