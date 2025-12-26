import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function FeaturedProducts({ products }: { products: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our handpicked selection of cutting-edge wearable technology and high-tech fashion essentials
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts?.map((product: any) => (
            <div
              key={product?.id}
              className="group bg-card border border-border rounded-xl overflow-hidden shadow-gold hover:shadow-gold-md transition-smooth hover-lift sm:h-full flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <AppImage
                  src={product?.image}
                  alt={product?.imageAlt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product?.isNew && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                    New
                  </div>
                )}
                {product?.discount && (
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
                    -{product?.discount}%
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Link
                    href={`/product-detail?id=${product?.id}`}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-smooth press-effect"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 md:p-6 lg:flex-1 flex flex-col">
                <div className="lg:flex-1 flex flex-col space-y-3">
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                      {product?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {product?.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="StarIcon"
                          size={16}
                          variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                          className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product?.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product?.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product?.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-heading font-bold text-foreground">
                        ${product?.price}
                      </span>
                    </div>
                  </div>

                  {/* Colors */}
                  {product?.colors && product?.colors?.length > 0 && (
                    <div className="flex items-center space-x-2 lg:mt-auto pt-3">
                      <span className="text-sm text-muted-foreground">Colors:</span>
                      <div className="flex space-x-1">
                        {product?.colors?.slice(0, 4)?.map((color: string, index: number) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                        {product?.colors?.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{product?.colors?.length - 4}
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
        <div className="text-center mt-12">
          <Link
            href="/product-catalog"
            className="inline-flex items-center px-8 py-3 bg-surface hover:bg-accent text-foreground border border-border font-medium rounded-lg transition-smooth press-effect"
          >
            <span>View All Products</span>
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
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
      imageAlt: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      isNew: PropTypes?.bool,
      discount: PropTypes?.number,
      colors: PropTypes?.arrayOf(PropTypes?.string),
    })
  )?.isRequired,
};