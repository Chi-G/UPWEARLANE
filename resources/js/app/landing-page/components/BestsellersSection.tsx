import { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function BestsellersSection({ bestsellers }: { bestsellers: any[] }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [items, setItems] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
      const existingItem = existingCart?.find((item: any) => item?.id === product?.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = existingCart?.map((item: any) =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('shopping_cart', JSON.stringify(updatedCart));
      setCartItems(prev => [...prev, product?.id]);
      
      // Dispatch event for cart indicator
      window.dispatchEvent(new Event('cart-updated'));
      
      // Remove from visual state after animation
      setTimeout(() => {
        setCartItems(prev => prev?.filter(id => id !== product?.id));
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Bestsellers
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our most popular tech-infused fashion items loved by customers worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {bestsellers?.map((product) => (
            <div
              key={product?.id}
              className="group bg-card border border-border rounded-xl overflow-hidden shadow-gold hover:shadow-gold-md transition-smooth h-full flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <AppImage
                  src={product?.image}
                  alt={product?.imageAlt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Bestseller Badge */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  <Icon name="FireIcon" size={14} className="inline mr-1" />
                  Bestseller
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={cartItems?.includes(product?.id)}
                    className={`w-10 h-10 rounded-full border-2 border-background bg-background/90 hover:bg-background transition-smooth press-effect ${
                      cartItems?.includes(product?.id) 
                        ? 'text-success' :'text-foreground hover:text-primary'
                    }`}
                    aria-label={`Add ${product?.name} to cart`}
                  >
                    <Icon 
                      name={cartItems?.includes(product?.id) ? "CheckIcon" : "PlusIcon"} 
                      size={20} 
                      className="mx-auto"
                    />
                  </button>
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

                  {/* Rating & Sales */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="StarIcon"
                            size={14}
                            variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                            className={i < Math.floor(product?.rating) ? 'text-primary' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product?.reviewCount})
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product?.soldCount} sold
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
                    {product?.discount && (
                      <span className="text-sm font-medium text-destructive">
                        Save {product?.discount}%
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={cartItems?.includes(product?.id)}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-smooth press-effect mt-auto ${
                      cartItems?.includes(product?.id)
                        ? 'bg-success text-success-foreground'
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    }`}
                  >
                    {cartItems?.includes(product?.id) ? (
                      <span className="flex items-center justify-center">
                        <Icon name="CheckIcon" size={16} className="mr-2" />
                        Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Icon name="ShoppingCartIcon" size={16} className="mr-2" />
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
        <div className="text-center mt-12">
          <Link
            href="/product-catalog?filter=bestsellers"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
          >
            <span>View All Bestsellers</span>
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
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
    })
  )?.isRequired,
};