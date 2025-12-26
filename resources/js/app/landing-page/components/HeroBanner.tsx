import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

import { HeroData } from '@/types';

export default function HeroBanner({ heroData }: { heroData: HeroData }) {
    return (
        <section className="from-background via-surface to-accent relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br lg:min-h-[80vh]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <AppImage
                    src={heroData?.backgroundImage}
                    alt={heroData?.backgroundImageAlt}
                    className="h-full w-full object-cover opacity-20"
                />
                <div className="from-background/80 via-background/40 absolute inset-0 bg-gradient-to-r to-transparent" />
            </div>
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Text Content */}
                    <div className="space-y-6 text-center lg:space-y-8 lg:text-left">
                        <div className="space-y-4">
                            <h1 className="font-heading text-foreground text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                {heroData?.title}
                            </h1>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl lg:mx-0 lg:text-2xl">
                                {heroData?.subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <Link
                                href="/product-catalog"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium"
                            >
                                <span>Shop Now</span>
                                <Icon
                                    name="ArrowRightIcon"
                                    size={20}
                                    className="ml-2"
                                />
                            </Link>
                            <Link
                                href="/product-catalog"
                                className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect inline-flex items-center justify-center rounded-lg border px-8 py-4 font-medium"
                            >
                                <Icon
                                    name="PlayIcon"
                                    size={20}
                                    className="mr-2"
                                />
                                <span>Watch Demo</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="border-border grid grid-cols-3 gap-4 border-t pt-8">
                            {heroData?.stats?.map(
                                (stat: { value: string; label: string }, index: number) => (
                                    <div
                                        key={index}
                                        className="text-center lg:text-left"
                                    >
                                        <div className="font-heading text-primary whitespace-nowrap text-2xl font-bold md:text-3xl lg:text-4xl">
                                            {stat?.value}
                                        </div>
                                        <div className="text-muted-foreground text-sm md:text-base">
                                            {stat?.label}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div className="shadow-gold-lg relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[3/4]">
                            <AppImage
                                src={heroData?.heroImage}
                                alt={heroData?.heroImageAlt}
                                width={800}
                                height={800}
                                priority
                                className="h-full w-full object-cover"
                            />
                            <div className="from-background/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <div className="bg-primary text-primary-foreground shadow-gold-md absolute -right-4 -top-4 rounded-full px-4 py-2">
                            <span className="text-sm font-medium">
                                {heroData?.badge}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
                <Icon
                    name="ChevronDownIcon"
                    size={24}
                    className="text-muted-foreground"
                />
            </div>
        </section>
    );
}

HeroBanner.propTypes = {
    heroData: PropTypes?.shape({
        title: PropTypes?.string?.isRequired,
        subtitle: PropTypes?.string?.isRequired,
        backgroundImage: PropTypes?.string?.isRequired,
        backgroundImageAlt: PropTypes?.string?.isRequired,
        heroImage: PropTypes?.string?.isRequired,
        heroImageAlt: PropTypes?.string?.isRequired,
        badge: PropTypes?.string?.isRequired,
        stats: PropTypes?.arrayOf(
            PropTypes?.shape({
                value: PropTypes?.string?.isRequired,
                label: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
    })?.isRequired,
};
