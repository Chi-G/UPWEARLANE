import { Skeleton } from '@/components/ui/skeleton';
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
    pagination,
    categories,
    brands,
    initialFilters,
    selectedCurrency,
    priceRanges,
}: ProductCatalogInteractiveProps) {
    const { addToCart } = useCart();
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('catalog_view_mode') || 'grid';
        }
        return 'grid';
    });
    const [sortBy, setSortBy] = useState(initialFilters?.sort || 'relevance');

    const [filters, setFilters] = useState<CatalogFilters>(() => {
        // Safe access to avoid TypeError if initialFilters has properties that are functions (like sort on an array)
        const getVal = (obj: any, key: string) => {
            if (obj && typeof obj[key] !== 'function') return obj[key];
            return undefined;
        };

        return {
            categories: getVal(initialFilters, 'category') ? [initialFilters!.category!] : [],
            priceRange: getVal(initialFilters, 'priceRange') || null,
            colors: getVal(initialFilters, 'colors') ? (initialFilters!.colors as string).split(',') : [],
            brands: getVal(initialFilters, 'brands') ? (initialFilters!.brands as string).split(',') : [],
        };
    });

    const [productFilter] = useState<string | null>(() => {
        const filter = initialFilters && typeof initialFilters.filter !== 'function' ? initialFilters.filter : null;
        return filter || null;
    });

    const currencySymbol = (() => {
        const code = selectedCurrency || (initialFilters as any)?.currency || 'NGN';
        const symbols: Record<string, string> = {
            'NGN': '₦',
            'USD': '$',
            'GBP': '£',
            'CAD': 'C$'
        };
        return symbols[code] || '₦';
    })();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
    const [products, setProducts] = useState(initialProducts);

    // Show loading animation on initial mount for seconds
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
        setProducts(initialProducts);
        setIsLoading(false);
    }, [initialProducts]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            
            // Category
            if (filters?.categories?.length === 1) {
                params.set('category', filters.categories[0]);
            } else {
                params.delete('category');
            }

            // Brands
            if (filters?.brands?.length > 0) {
                params.set('brands', filters.brands.join(','));
            } else {
                params.delete('brands');
            }

            // Colors
            if (filters?.colors?.length > 0) {
                params.set('colors', filters.colors.join(','));
            } else {
                params.delete('colors');
            }

            // Price Range
            if (filters?.priceRange) {
                params.set('priceRange', filters.priceRange);
            } else {
                params.delete('priceRange');
            }

            // Sorting
            params.set('sort', sortBy);

            // Search
            if (searchQuery) {
                params.set('search', searchQuery);
            } else {
                params.delete('search');
            }

            // Keep currency
            const currentCurrency = params.get('currency') || localStorage.getItem('selected_currency') || 'NGN';
            params.set('currency', currentCurrency);

            router.get('/product-catalog', Object.fromEntries(params), {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
            });
        }, 600);

        return () => clearTimeout(timer);
    }, [filters, sortBy, searchQuery]);

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
            price:
                typeof product.price === 'string'
                    ? parseFloat(product.price)
                    : product.price,
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
                            className="text-primary hover:text-primary/80 transition-smooth mt-4 inline-flex items-center gap-2 text-sm"
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
                        categories={categories}
                        brands={brands}
                        currencySymbol={currencySymbol}
                        priceRanges={priceRanges || []}
                        selectedCurrency={selectedCurrency || 'NGN'}
                    />

                    {/* Products Grid/List */}
                    <div className="min-w-0 flex-1">
                        {isLoading ? (
                            <div className="grid grid-cols-2 gap-3 py-20 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col space-y-3"
                                    >
                                        <Skeleton className="h-[125px] w-full rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>
                                    </div>
                                ))}
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
                                        isLoading={isLoading}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {pagination && pagination.lastPage > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {pagination.links.map((link, index) => {
                                    if (!link.url) {
                                        return null;
                                    }

                                    const isActive = link.active;
                                    const isPrevNext =
                                        link.label.includes('Previous') ||
                                        link.label.includes('Next');
                                    const label = link.label
                                        .replace('&laquo;', '«')
                                        .replace('&raquo;', '»')
                                        .replace('Previous', '← Previous')
                                        .replace('Next', 'Next →');

                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                router.visit(link.url as string)
                                            }
                                            disabled={isActive}
                                            className={`rounded-lg px-4 py-2 font-medium transition-all ${
                                                isActive
                                                    ? 'bg-primary text-primary-foreground cursor-default'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                            } ${isPrevNext ? 'px-6' : ''} `}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
