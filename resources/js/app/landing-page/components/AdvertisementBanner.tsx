import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Advertisement } from '@/types';

export default function AdvertisementBanner({
    advertisements,
}: {
    advertisements: Advertisement[];
}) {
    const [currentAd, setCurrentAd] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying || advertisements?.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAd((prev) => (prev + 1) % advertisements?.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPlaying, advertisements?.length]);

    const goToAd = (index: number) => {
        setCurrentAd(index);
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 3000);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    if (!advertisements || advertisements?.length === 0) return null;

    return (
        <section className="bg-surface py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="bg-card border-border shadow-gold-lg relative h-[400px] overflow-hidden rounded-2xl border lg:h-[450px]">
                    {/* Advertisement Content */}
                    <div className="relative h-full">
                        {advertisements?.map((ad: any, index: number) => (
                            <div
                                key={ad?.id}
                                className={`absolute inset-0 h-full transition-opacity duration-1000 ${
                                    index === currentAd
                                        ? 'z-10 opacity-100'
                                        : 'z-0 opacity-0'
                                }`}
                            >
                                <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                                    {/* Left: Content & Atmospheric Background */}
                                    <div className="relative hidden h-full flex-col justify-center overflow-hidden p-8 md:p-12 lg:flex lg:p-16">
                                        {/* Background Layer */}
                                        <div className="absolute inset-0 z-0 scale-110">
                                            <AppImage
                                                src={ad?.backgroundImage}
                                                alt={ad?.backgroundImageAlt}
                                                className="h-full w-full object-cover opacity-30 blur-xl grayscale-[0.5]"
                                            />
                                            <div className="from-background via-background/90 absolute inset-0 bg-gradient-to-br to-transparent" />
                                        </div>

                                        {/* Content Layer */}
                                        <div className="relative z-10 space-y-6">
                                            <div className="space-y-4">
                                                {ad?.badge && (
                                                    <span className="bg-primary/20 text-primary border-primary/20 inline-block rounded-full border px-3 py-1 text-sm font-semibold tracking-wide">
                                                        {ad?.badge}
                                                    </span>
                                                )}
                                                <h3 className="font-heading text-foreground text-3xl font-bold leading-tight md:text-4xl">
                                                    {ad?.title}
                                                </h3>
                                                <p className="text-muted-foreground max-w-md text-lg">
                                                    {ad?.description}
                                                </p>
                                            </div>

                                            {/* Offer & CTA */}
                                            <div className="space-y-6">
                                                {ad?.offer && (
                                                    <div className="flex items-baseline space-x-3">
                                                        <span className="font-heading text-primary text-3xl font-bold">
                                                            {ad?.offer}
                                                        </span>
                                                        {ad?.originalPrice && (
                                                            <span className="text-muted-foreground text-xl line-through opacity-70">
                                                                {
                                                                    ad?.originalPrice
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-4 sm:flex-row">
                                                    <Link
                                                        href={ad?.ctaLink}
                                                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold-sm press-effect inline-flex items-center justify-center rounded-xl px-8 py-3.5 font-semibold transition-all duration-300"
                                                    >
                                                        <span>
                                                            {ad?.ctaText}
                                                        </span>
                                                        <Icon
                                                            name="ArrowRightIcon"
                                                            size={20}
                                                            className="ml-2"
                                                        />
                                                    </Link>
                                                    {ad?.secondaryCtaText && (
                                                        <Link
                                                            href={
                                                                ad?.secondaryCtaLink
                                                            }
                                                            className="hover:bg-accent/10 text-foreground border-primary/10 hover:border-primary/30 press-effect inline-flex items-center justify-center rounded-xl border-2 bg-transparent px-8 py-3.5 font-semibold transition-all duration-300"
                                                        >
                                                            <span>
                                                                {
                                                                    ad?.secondaryCtaText
                                                                }
                                                            </span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Full-Bleed Product Image */}
                                    <div className="bg-background border-border/50 relative h-full overflow-hidden border-t lg:border-l lg:border-t-0">
                                        {ad?.productImage && (
                                            <AppImage
                                                src={ad?.productImage}
                                                alt={ad?.productImageAlt}
                                                fill
                                                className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    {advertisements?.length > 1 && (
                        <div className="bg-background/40 absolute bottom-6 right-8 z-20 flex items-center space-x-6 rounded-2xl border border-white/5 px-5 py-3 backdrop-blur-md">
                            {/* Dots Indicator */}
                            <div className="flex items-center space-x-2">
                                {advertisements?.map(
                                    (_: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => goToAd(index)}
                                            className={`transition-smooth h-3 w-3 rounded-full ${
                                                index === currentAd
                                                    ? 'bg-primary'
                                                    : 'bg-background/50 hover:bg-background/70'
                                            }`}
                                            aria-label={`Go to advertisement ${index + 1}`}
                                        />
                                    ),
                                )}
                            </div>

                            {/* Play/Pause Button */}
                            <button
                                onClick={togglePlayPause}
                                className="bg-background/80 hover:bg-background text-foreground transition-smooth press-effect flex h-8 w-8 items-center justify-center rounded-full"
                                aria-label={
                                    isPlaying
                                        ? 'Pause slideshow'
                                        : 'Play slideshow'
                                }
                            >
                                <Icon
                                    name={isPlaying ? 'PauseIcon' : 'PlayIcon'}
                                    size={16}
                                />
                            </button>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {advertisements?.length > 1 && isPlaying && (
                        <div className="bg-background/20 absolute bottom-0 left-0 h-1 w-full">
                            <div
                                className="bg-primary duration-5000 h-full transition-all ease-linear"
                                style={{
                                    width: `${((currentAd + 1) / advertisements?.length) * 100}%`,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

AdvertisementBanner.propTypes = {
    advertisements: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            title: PropTypes?.string?.isRequired,
            description: PropTypes?.string?.isRequired,
            backgroundImage: PropTypes?.string?.isRequired,
            backgroundImageAlt: PropTypes?.string?.isRequired,
            productImage: PropTypes?.string,
            productImageAlt: PropTypes?.string,
            badge: PropTypes?.string,
            offer: PropTypes?.string,
            originalPrice: PropTypes?.string,
            ctaText: PropTypes?.string?.isRequired,
            ctaLink: PropTypes?.string?.isRequired,
            secondaryCtaText: PropTypes?.string,
            secondaryCtaLink: PropTypes?.string,
        }),
    )?.isRequired,
};
