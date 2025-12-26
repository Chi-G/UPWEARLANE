import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { FilterSidebarProps, CatalogFilters } from '@/types';

export default function FilterSidebar({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobileOpen,
  onMobileClose 
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    colors: true,
    brands: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (range: string) => {
    onFilterChange({ ...filters, priceRange: range });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
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
    <div className="h-full flex flex-col bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-6 border-b border-border">
        <h2 className="font-heading text-xl font-semibold text-foreground">Filters</h2>
        <button
          onClick={onMobileClose}
          className="touch-target flex items-center justify-center text-foreground hover:text-primary transition-smooth"
          aria-label="Close filters"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-heading text-base md:text-lg font-semibold text-foreground">
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
              {categories?.map(category => (
                <label
                  key={category?.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters?.categories?.includes(category?.id)}
                      onChange={() => handleCategoryChange(category?.id)}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                    <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-smooth">
                      {category?.label}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {category?.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3 pt-6 border-t border-border">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-heading text-base md:text-lg font-semibold text-foreground">
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
              {priceRanges?.map(range => (
                <label
                  key={range?.id}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters?.priceRange === range?.id}
                    onChange={() => handlePriceChange(range?.id)}
                    className="w-5 h-5 border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  <span className="ml-3 text-sm md:text-base text-foreground group-hover:text-primary transition-smooth">
                    {range?.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="space-y-3 pt-6 border-t border-border">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-heading text-base md:text-lg font-semibold text-foreground">
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
              {colors?.map(color => (
                <button
                  key={color?.name}
                  onClick={() => handleColorChange(color?.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-smooth press-effect ${
                    filters?.colors?.includes(color?.name)
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                  aria-label={`Filter by ${color?.name}`}
                >
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-border"
                    style={{ backgroundColor: color?.hex }}
                  />
                  <span className="text-xs text-foreground">{color?.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="space-y-3 pt-6 border-t border-border">
          <button
            onClick={() => toggleSection('brands')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-heading text-base md:text-lg font-semibold text-foreground">
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
              {brands?.map(brand => (
                <label
                  key={brand?.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters?.brands?.includes(brand?.id)}
                      onChange={() => handleBrandChange(brand?.id)}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                    <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-smooth">
                      {brand?.label}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {brand?.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="p-4 md:p-6 border-t border-border">
        <button
          onClick={onClearFilters}
          className="w-full h-12 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-lg transition-smooth press-effect"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-lg border border-border overflow-hidden shadow-gold-sm">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-drawer-backdrop backdrop-dark lg:hidden"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-drawer lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}