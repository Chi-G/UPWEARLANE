import Icon from '@/components/ui/AppIcon';
import { HeroData } from '@/types';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

// Hardcoded categories for the layout
const CATEGORIES = [
    { name: 'Smart Watches', icon: 'ClockIcon', slug: 'smart-watches' },
    { name: 'Fitness', icon: 'HeartIcon', slug: 'fitness' },
    { name: 'Clothing', icon: 'TagIcon', slug: 'clothing' },
    { name: 'Accessories', icon: 'SparklesIcon', slug: 'accessories' },
    { name: 'AR/VR', icon: 'CubeIcon', slug: 'ar-vr' },
];

export default function HeroBanner({ heroData }: { heroData?: HeroData }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search navigation logic here
        // e.g., router.visit(`/product-catalog?search=${searchQuery}&category=${selectedCategory}`);
        console.log('Search:', searchQuery, selectedCategory);
    };

    return (
        <section 
            className="relative pb-8 pt-24 md:pb-12 md:pt-32 bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: heroData?.backgroundImage ? `url(${heroData.backgroundImage})` : undefined 
            }}
        >
             {/* Overlay for background image readability if image exists, otherwise gradient */}
            <div className={`absolute inset-0 ${heroData?.backgroundImage ? 'bg-background/80 backdrop-blur-[2px]' : 'from-primary/10 via-background to-accent/5 bg-gradient-to-b'}`} />
            
            <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Search Container */}
                <div className="mx-auto max-w-4xl space-y-8 text-center">
                    <div className="space-y-4">
                        {heroData?.badge && (
                            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {heroData.badge}
                            </span>
                        )}
                        <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl lg:text-5xl">
                            {heroData?.title || 'Find Your Next Tech Essential'}
                        </h1>
                        {heroData?.subtitle && (
                            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                                {heroData.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="bg-card shadow-gold-lg flex w-full flex-col overflow-hidden rounded-xl border-2 border-primary/20 sm:flex-row"
                    >
                        {/* Category Select */}
                        <div className="border-b border-gray-200 sm:w-1/3 sm:border-b-0 sm:border-r">
                            <div className="relative h-full">
                                <select
                                    aria-label="Select Category"
                                    value={selectedCategory}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="bg-card text-foreground focus-visible:ring-primary h-full w-full appearance-none px-6 py-4 text-base outline-none transition-colors hover:bg-gray-50/50"
                                > 
                                    <option value="">All Categories</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                    <Icon
                                        name="ChevronDownIcon"
                                        size={16}
                                        className="text-muted-foreground"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative flex-1">
                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                <Icon
                                    name="MagnifyingGlassIcon"
                                    size={20}
                                    className="text-muted-foreground"
                                />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                placeholder="I am looking for..."
                                className="bg-card text-foreground placeholder:text-muted-foreground h-full w-full px-12 py-4 text-base outline-none"
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth press-effect px-8 py-4 font-semibold sm:w-auto"
                        >
                            Search
                        </button>
                    </form>

                    {/* Category Grid */}
                    <div className="mt-8">
                        <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6">
                            {/* Post Ad Button */}
                            <Link
                                href="/post-ad"
                                className="bg-primary hover:bg-primary/90 hover:shadow-gold-md transition-smooth group flex flex-col items-center justify-center space-y-2 rounded-xl border border-transparent p-2 py-4 shadow-lg md:p-6"
                            >
                                <div className="bg-primary-foreground/10 text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14">
                                    <Icon
                                        name="PlusIcon"
                                        size={20}
                                        className="md:h-6 md:w-6"
                                    />
                                </div>
                                <span className="text-primary-foreground text-xs font-medium md:text-sm">
                                    Post Ad
                                </span>
                            </Link>

                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/product-catalog?category=${cat.slug}`}
                                    className="bg-card hover:border-primary/50 hover:shadow-gold-md transition-smooth group flex flex-col items-center justify-center space-y-2 rounded-xl border border-transparent p-2 py-4 md:p-6"
                                >
                                    <div className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground transition-smooth flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14">
                                        <Icon
                                            name={cat.icon}
                                            size={20}
                                            className="md:h-6 md:w-6"
                                        />
                                    </div>
                                    <span className="text-foreground group-hover:text-primary text-xs font-medium md:text-sm">
                                        {cat.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Keeping empty propTypes if needed to satisfy linter or parent, though we are not using heroData anymore.
HeroBanner.propTypes = {
    heroData: PropTypes.any,
};
