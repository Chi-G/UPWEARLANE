import Icon from '@/components/ui/AppIcon';
import { FilterSidebarProps } from '@/types';
import { useState } from 'react';

export default function FilterSidebar({
    filters,
    onFilterChange,
    onClearFilters,
    isMobileOpen,
    onMobileClose,
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        colors: true,
        brands: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCategoryChange = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handlePriceChange = (range: string) => {
        onFilterChange({ ...filters, priceRange: range });
    };

    const handleColorChange = (color: string) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter((c) => c !== color)
            : [...filters.colors, color];
        onFilterChange({ ...filters, colors: newColors });
    };

    const handleBrandChange = (brand: string) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        onFilterChange({ ...filters, brands: newBrands });
    };

    const categories = [
        { id: 'apparel', label: 'Apparel', count: 45 },
        { id: 'accessories', label: 'Accessories', count: 32 },
        { id: 'tech-wear', label: 'Tech Wear', count: 28 },
    ];

    const priceRanges = [
        { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
        { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
        { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
        { id: 'over-200', label: 'Over $200', min: 200, max: Infinity },
    ];

    const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Gold', hex: '#D4AF37' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Navy', hex: '#001F3F' },
        { name: 'Red', hex: '#E74C3C' },
    ];

    const brands = [
        { id: 'techfabric', label: 'TechFabric', count: 18 },
        { id: 'smartwear', label: 'SmartWear', count: 15 },
        { id: 'futurefit', label: 'FutureFit', count: 12 },
        { id: 'nexgen', label: 'NexGen', count: 10 },
    ];

    const sidebarContent = (
        <div className="bg-background flex h-full flex-col">
            {/* Mobile Header */}
            <div className="border-border flex items-center justify-between border-b p-6 lg:hidden">
                <h2 className="font-heading text-foreground text-xl font-semibold">
                    Filters
                </h2>
                <button
                    onClick={onMobileClose}
                    className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                    aria-label="Close filters"
                >
                    <Icon name="XMarkIcon" size={24} />
                </button>
            </div>

            {/* Filters Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
                {/* Category Filter */}
                <div className="space-y-3">
                    <button
                        onClick={() => toggleSection('category')}
                        className="flex w-full items-center justify-between text-left"
                    >
                        <h3 className="font-heading text-foreground text-base font-semibold md:text-lg">
                            Category
                        </h3>
                        <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`transition-transform ${expandedSections?.category ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {expandedSections?.category && (
                        <div className="space-y-2">
                            {categories?.map((category) => (
                                <label
                                    key={category?.id}
                                    className="group flex cursor-pointer items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={filters?.categories?.includes(
                                                category?.id,
                                            )}
                                            onChange={() =>
                                                handleCategoryChange(
                                                    category?.id,
                                                )
                                            }
                                            className="border-border text-primary focus:ring-primary h-5 w-5 rounded focus:ring-2 focus:ring-offset-2"
                                        />
                                        <span className="text-foreground group-hover:text-primary transition-smooth text-sm md:text-base">
                                            {category?.label}
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground text-xs md:text-sm">
                                        {category?.count}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="border-border space-y-3 border-t pt-6">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex w-full items-center justify-between text-left"
                    >
                        <h3 className="font-heading text-foreground text-base font-semibold md:text-lg">
                            Price Range
                        </h3>
                        <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`transition-transform ${expandedSections?.price ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {expandedSections?.price && (
                        <div className="space-y-2">
                            {priceRanges?.map((range) => (
                                <label
                                    key={range?.id}
                                    className="group flex cursor-pointer items-center"
                                >
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        checked={
                                            filters?.priceRange === range?.id
                                        }
                                        onChange={() =>
                                            handlePriceChange(range?.id)
                                        }
                                        className="border-border text-primary focus:ring-primary h-5 w-5 focus:ring-2 focus:ring-offset-2"
                                    />
                                    <span className="text-foreground group-hover:text-primary transition-smooth ml-3 text-sm md:text-base">
                                        {range?.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Color Filter */}
                <div className="border-border space-y-3 border-t pt-6">
                    <button
                        onClick={() => toggleSection('colors')}
                        className="flex w-full items-center justify-between text-left"
                    >
                        <h3 className="font-heading text-foreground text-base font-semibold md:text-lg">
                            Colors
                        </h3>
                        <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`transition-transform ${expandedSections?.colors ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {expandedSections?.colors && (
                        <div className="grid grid-cols-3 gap-3">
                            {colors?.map((color) => (
                                <button
                                    key={color?.name}
                                    onClick={() =>
                                        handleColorChange(color?.name)
                                    }
                                    className={`transition-smooth press-effect flex flex-col items-center gap-2 rounded-lg border-2 p-3 ${
                                        filters?.colors?.includes(color?.name)
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                    aria-label={`Filter by ${color?.name}`}
                                >
                                    <div
                                        className="border-border h-8 w-8 rounded-full border-2 md:h-10 md:w-10"
                                        style={{ backgroundColor: color?.hex }}
                                    />
                                    <span className="text-foreground text-xs">
                                        {color?.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Brand Filter */}
                <div className="border-border space-y-3 border-t pt-6">
                    <button
                        onClick={() => toggleSection('brands')}
                        className="flex w-full items-center justify-between text-left"
                    >
                        <h3 className="font-heading text-foreground text-base font-semibold md:text-lg">
                            Brands
                        </h3>
                        <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`transition-transform ${expandedSections?.brands ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {expandedSections?.brands && (
                        <div className="space-y-2">
                            {brands?.map((brand) => (
                                <label
                                    key={brand?.id}
                                    className="group flex cursor-pointer items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={filters?.brands?.includes(
                                                brand?.id,
                                            )}
                                            onChange={() =>
                                                handleBrandChange(brand?.id)
                                            }
                                            className="border-border text-primary focus:ring-primary h-5 w-5 rounded focus:ring-2 focus:ring-offset-2"
                                        />
                                        <span className="text-foreground group-hover:text-primary transition-smooth text-sm md:text-base">
                                            {brand?.label}
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground text-xs md:text-sm">
                                        {brand?.count}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Clear Filters Button */}
            <div className="border-border border-t p-4 md:p-6">
                <button
                    onClick={onClearFilters}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-smooth press-effect h-12 w-full rounded-lg px-6 font-medium"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden w-80 flex-shrink-0 lg:block">
                <div className="bg-card border-border shadow-gold-sm sticky top-24 overflow-hidden rounded-lg border">
                    {sidebarContent}
                </div>
            </aside>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        onClick={onMobileClose}
                        aria-hidden="true"
                    />
                    <div className="fixed bottom-0 left-0 top-0 z-50 w-80 max-w-[85vw] shadow-2xl lg:hidden">
                        {sidebarContent}
                    </div>
                </>
            )}
        </>
    );
}
