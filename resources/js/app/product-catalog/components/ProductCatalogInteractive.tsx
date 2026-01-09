import { useEffect, useState } from 'react';

import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/hooks/useCart';
import {
    CatalogFilters,
    Product,
    ProductCatalogInteractiveProps,
} from '@/types';
import { router } from '@inertiajs/react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';

export default function ProductCatalogInteractive({
    initialProducts,
}: ProductCatalogInteractiveProps) {
    const { addToCart } = useCart();
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('catalog_view_mode') || 'grid';
        }
        return 'grid';
    });
    const [sortBy, setSortBy] = useState('relevance');

    const [filters, setFilters] = useState<CatalogFilters>(() => {
        let initialCategories: string[] = [];
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const categoryParam = params.get('category');
            if (categoryParam) {
                initialCategories = [categoryParam];
            }
        }
        return {
            categories: initialCategories,
            priceRange: null,
            colors: [],
            brands: [],
        };
    });

    const [productFilter] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return params.get('filter');
        }
        return null;
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState(initialProducts);
    // Show loading animation on initial mount for 2s
    const [isLoading, setIsLoading] = useState(true);

    const updateFilters = (newFilters: CatalogFilters) => {
        setIsLoading(true);
        setFilters(newFilters);
    };

    const updateSort = (newSort: string) => {
        setIsLoading(true);
        setSortBy(newSort);
    };

    useEffect(() => {
        // setIsLoading(true) is now handled by change handlers
        const timer = setTimeout(() => {
            let filtered = [...initialProducts];

            // Note: Product type filter (bestsellers/featured) is handled by the backend
            // The backend already filters products when ?filter=bestsellers or ?filter=featured is in URL

            // Apply search query filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter((product) =>
                    product.name.toLowerCase().includes(query)
                );
            }

            // Apply category filter
            if (filters?.categories?.length > 0) {
                filtered = filtered?.filter((product) =>
                    filters?.categories?.some((cat) =>
                        product?.category
                            ?.toLowerCase()
                            ?.includes(cat?.replace(/-/g, ' ')),
                    ),
                );
            }

            // Apply price range filter
            if (filters?.priceRange) {
                const priceRanges: {
                    [key: string]: { min: number; max: number };
                } = {
                    'under-50': { min: 0, max: 50 },
                    '50-100': { min: 50, max: 100 },
                    '100-200': { min: 100, max: 200 },
                    'over-200': { min: 200, max: Infinity },
                };
                const range = priceRanges[filters.priceRange];
                if (range) {
                    filtered = filtered?.filter((product) => {
                        const priceStr = String(product?.price ?? '0').replace(
                            /[^0-9.]/g,
                            '',
                        );
                        const price = parseFloat(priceStr);
                        return price >= range?.min && price < range?.max;
                    });
                }
            }

            // Apply color filter
            if (filters?.colors?.length > 0) {
                filtered = filtered?.filter(
                    (product) =>
                        product?.colors &&
                        product?.colors?.some((color) => {
                            const colorName =
                                typeof color === 'string' ? color : color?.name;
                            return filters?.colors?.includes(colorName);
                        }),
                );
            }

            // Apply brand filter
            if (filters?.brands?.length > 0) {
                filtered = filtered?.filter((product) =>
                    filters?.brands?.some(
                        (brand) =>
                            product?.brand &&
                            product?.brand?.toLowerCase() === brand,
                    ),
                );
            }

            // Apply sorting
            switch (sortBy) {
                case 'price-low':
                    filtered?.sort((a, b) => {
                        const priceA = parseFloat(
                            String(a?.price ?? '0').replace(/[^0-9.]/g, ''),
                        );
                        const priceB = parseFloat(
                            String(b?.price ?? '0').replace(/[^0-9.]/g, ''),
                        );
                        return priceA - priceB;
                    });
                    break;
                case 'price-high':
                    filtered?.sort((a, b) => {
                        const priceA = parseFloat(
                            String(a?.price ?? '0').replace(/[^0-9.]/g, ''),
                        );
                        const priceB = parseFloat(
                            String(b?.price ?? '0').replace(/[^0-9.]/g, ''),
                        );
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
        }, 500); // Reduced delay for snappier feel

        return () => clearTimeout(timer);
    }, [filters, sortBy, initialProducts, searchQuery, productFilter]);

    const clearProductFilter = () => {
        // Navigate to the product catalog without filter to reload from backend
        router.visit('/product-catalog', { preserveScroll: true });
    };

    const handleViewModeChange = (mode: string) => {
        setViewMode(mode);
        localStorage.setItem('catalog_view_mode', mode);
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: `${product.id}-default`,
            name: product.name,
            category: product.category,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            currency: product.currency || 'NGN',
            quantity: 1,
            image: product.image,
            alt: product.alt,
            variations: {},
        }); 
    };

    const handleClearFilters = () => {
        // If there's a product filter (bestsellers/featured), navigate to reload from backend
        if (productFilter) {
            router.visit('/product-catalog', { preserveScroll: true });
            return;
        }

        setIsLoading(true);
        // Clear URL params
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('category');
            url.searchParams.delete('filter');
            window.history.pushState({}, '', url);
        }
        setSearchQuery('');
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
        (filters?.priceRange ? 1 : 0) +
        (productFilter ? 1 : 0);

    const getPageTitle = () => {
        if (productFilter === 'bestsellers') return 'Bestsellers';
        if (productFilter === 'featured') return 'Featured Products';
        if (filters?.categories?.length === 1) {
            return filters.categories[0]
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        return 'Product Catalog';
    };

    return (
        <div className="bg-background min-h-screen pt-20">
            <div className="mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
                {/* Page Header */}
                <div className="mb-8 hidden md:mb-12 md:block">
                    <h1 className="font-heading text-foreground mb-3 text-3xl font-bold md:mb-4 md:text-4xl lg:text-5xl">
                        {getPageTitle()}
                    </h1>
                    <p className="text-muted-foreground max-measure text-base md:text-lg">
                        {productFilter === 'bestsellers'
                            ? 'Our most popular items loved by customers worldwide'
                            : productFilter === 'featured'
                              ? 'Handpicked selection of cutting-edge wearable technology'
                              : 'Discover our collection of high-tech fashion and wearable technology'}
                    </p>
                    {productFilter && (
                        <button
                            onClick={clearProductFilter}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-smooth"
                        >
                            <Icon name="XMarkIcon" size={16} />
                            <span>Clear filter & show all products</span>
                        </button>
                    )}
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
                    {/* Search Bar */}
                    <div className="w-full sm:w-72">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchQuery(value);
                                    setIsLoading(true);

                                    // Clear category filters on search to allow global search
                                    if (value) {
                                        setFilters((prev) => ({
                                            ...prev,
                                            categories: [],
                                        }));
                                    }
                                }}
                                className="bg-surface border-border text-foreground focus-ring transition-smooth h-12 w-full rounded-lg border pl-10 pr-4"
                            />
                            <div className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                                <Icon name="MagnifyingGlassIcon" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-3 sm:w-auto">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 items-center gap-2 rounded-lg border px-4 lg:hidden"
                        >
                            <Icon name="AdjustmentsHorizontalIcon" size={20} />
                            <span className="font-medium">Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="bg-primary text-primary-foreground flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        <div className="flex flex-1 items-center gap-2 sm:flex-initial">
                            <span className="text-muted-foreground whitespace-nowrap text-sm md:text-base">
                                {products?.length} products
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-3 sm:w-auto">
                        {/* Sort Dropdown */}
                        <label htmlFor="sortBy" className="sr-only">
                            Sort products
                        </label>
                        <select
                            id="sortBy"
                            aria-label="Sort products"
                            value={sortBy}
                            onChange={(e) => updateSort(e?.target?.value)}
                            className="bg-surface border-border text-foreground focus-ring transition-smooth h-12 flex-1 rounded-lg border px-4 text-sm sm:flex-initial md:text-base"
                        >
                            <option value="relevance">Sort by Relevance</option>
                            <option value="price-low">
                                Price: Low to High
                            </option>
                            <option value="price-high">
                                Price: High to Low
                            </option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="bg-surface border-border hidden items-center gap-1 rounded-lg border p-1 sm:flex">
                            <button
                                onClick={() => handleViewModeChange('grid')}
                                className={`touch-target transition-smooth flex h-10 w-10 items-center justify-center rounded ${
                                    viewMode === 'grid'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-accent'
                                }`}
                                aria-label="Grid view"
                            >
                                <Icon name="Squares2X2Icon" size={20} />
                            </button>
                            <button
                                onClick={() => handleViewModeChange('list')}
                                className={`touch-target transition-smooth flex h-10 w-10 items-center justify-center rounded ${
                                    viewMode === 'list'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-accent'
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
                        onFilterChange={updateFilters}
                        onClearFilters={handleClearFilters}
                        isMobileOpen={isFilterOpen}
                        onMobileClose={() => setIsFilterOpen(false)}
                    />

                    {/* Products Grid/List */}
                    <div className="min-w-0 flex-1">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
                                    <p className="text-muted-foreground text-sm md:text-base">
                                        Loading products...
                                    </p>
                                </div>
                            </div>
                        ) : products?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Icon
                                    name="MagnifyingGlassIcon"
                                    size={64}
                                    className="text-muted mb-4"
                                />
                                <h3 className="font-heading text-foreground mb-2 text-xl font-semibold md:text-2xl">
                                    No products found
                                </h3>
                                <p className="text-muted-foreground max-measure mb-6 text-sm md:text-base">
                                    Try adjusting your filters or search
                                    criteria
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth press-effect h-12 rounded-lg px-6 font-medium"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'
                                        : 'space-y-4 md:space-y-6'
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
