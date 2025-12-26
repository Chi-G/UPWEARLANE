import { useState, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { Product, ProductCatalogInteractiveProps, CatalogFilters } from '@/types';

export default function ProductCatalogInteractive({ initialProducts }: ProductCatalogInteractiveProps) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('catalog_view_mode') || 'grid';
    }
    return 'grid';
  });
  const [sortBy, setSortBy] = useState('relevance');
  
  const [filters, setFilters] = useState<CatalogFilters>({
    categories: [],
    priceRange: null,
    colors: [],
    brands: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...initialProducts];

      // Apply category filter
      if (filters?.categories?.length > 0) {
        filtered = filtered?.filter(product =>
          filters?.categories?.some(cat => 
            product?.category?.toLowerCase()?.includes(cat?.replace('-', ' '))
          )
        );
      }

      // Apply price range filter
      if (filters?.priceRange) {
        const priceRanges: { [key: string]: { min: number, max: number } } = {
          'under-50': { min: 0, max: 50 },
          '50-100': { min: 50, max: 100 },
          '100-200': { min: 100, max: 200 },
          'over-200': { min: 200, max: Infinity },
        };
        const range = priceRanges[filters.priceRange];
        if (range) {
          filtered = filtered?.filter(product => {
            const priceStr = String(product?.price ?? '0').replace(/[^0-9.]/g, '');
            const price = parseFloat(priceStr);
            return price >= range?.min && price < range?.max;
          });
        }
      }

      // Apply color filter
      if (filters?.colors?.length > 0) {
        filtered = filtered?.filter(product =>
          product?.colors && product?.colors?.some(color => {
            const colorName = typeof color === 'string' ? color : color?.name;
            return filters?.colors?.includes(colorName);
          })
        );
      }

      // Apply brand filter
      if (filters?.brands?.length > 0) {
        filtered = filtered?.filter(product =>
          filters?.brands?.some(brand =>
            product?.brand && product?.brand?.toLowerCase() === brand
          )
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered?.sort((a, b) => {
            const priceA = parseFloat(String(a?.price ?? '0').replace(/[^0-9.]/g, ''));
            const priceB = parseFloat(String(b?.price ?? '0').replace(/[^0-9.]/g, ''));
            return priceA - priceB;
          });
          break;
        case 'price-high':
          filtered?.sort((a, b) => {
            const priceA = parseFloat(String(a?.price ?? '0').replace(/[^0-9.]/g, ''));
            const priceB = parseFloat(String(b?.price ?? '0').replace(/[^0-9.]/g, ''));
            return priceB - priceA;
          });
          break;
        case 'rating':
          filtered?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'newest':
          filtered?.sort((a, b) => b?.id - a?.id);
          break;
        default:
          break;
      }

      setProducts(filtered);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filters, sortBy, initialProducts]);

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
    localStorage.setItem('catalog_view_mode', mode);
  };

  interface CartItem extends Product {
    quantity: number;
  }

  const handleAddToCart = (product: Product) => {
    try {
      const cart: CartItem[] = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
      const existingItem = cart?.find((item: CartItem) => item?.id === product?.id);

      if (existingItem) {
        existingItem.quantity = (existingItem?.quantity || 1) + 1;
      } else {
        cart?.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('shopping_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: null,
      colors: [],
      brands: [],
    });
  };

  const activeFilterCount = 
    filters?.categories?.length + 
    filters?.colors?.length + 
    filters?.brands?.length + 
    (filters?.priceRange ? 1 : 0);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Product Catalog
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-measure">
            Discover our collection of high-tech fashion and wearable technology
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 h-12 px-4 bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect"
            >
              <Icon name="AdjustmentsHorizontalIcon" size={20} />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <span className="text-sm md:text-base text-muted-foreground whitespace-nowrap">
                {products?.length} products
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="flex-1 sm:flex-initial h-12 px-4 bg-surface border border-border rounded-lg text-foreground text-sm md:text-base focus-ring transition-smooth"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-surface rounded-lg border border-border">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`touch-target flex items-center justify-center w-10 h-10 rounded transition-smooth ${
                  viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-foreground hover:bg-accent'
                }`}
                aria-label="Grid view"
              >
                <Icon name="Squares2X2Icon" size={20} />
              </button>
              <button
                onClick={() => handleViewModeChange('list')}
                className={`touch-target flex items-center justify-center w-10 h-10 rounded transition-smooth ${
                  viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-foreground hover:bg-accent'
                }`}
                aria-label="List view"
              >
                <Icon name="ListBulletIcon" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            isMobileOpen={isFilterOpen}
            onMobileClose={() => setIsFilterOpen(false)}
          />

          {/* Products Grid/List */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm md:text-base text-muted-foreground">Loading products...</p>
                </div>
              </div>
            ) : products?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Icon name="MagnifyingGlassIcon" size={64} className="text-muted mb-4" />
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6 max-measure">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-smooth press-effect"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6' :'space-y-4 md:space-y-6'
                }
              >
                {products?.map((product) => (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

