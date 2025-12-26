import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function AdvertisementBanner({ advertisements }: { advertisements: any[] }) {
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
    <section className="py-8 md:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-gold-lg h-[400px] lg:h-[450px]">
          {/* Advertisement Content */}
          <div className="h-full relative">
            {advertisements?.map((ad: any, index: number) => (
              <div
                key={ad?.id}
                className={`absolute inset-0 transition-opacity duration-1000 h-full ${
                  index === currentAd ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Left: Content & Atmospheric Background */}
                  <div className="hidden lg:flex relative p-8 md:p-12 lg:p-16 flex-col justify-center overflow-hidden h-full">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0 scale-110">
                      <AppImage
                        src={ad?.backgroundImage}
                        alt={ad?.backgroundImageAlt}
                        className="w-full h-full object-cover blur-xl opacity-30 grayscale-[0.5]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-transparent" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 space-y-6">
                      <div className="space-y-4">
                        {ad?.badge && (
                          <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold tracking-wide border border-primary/20">
                            {ad?.badge}
                          </span>
                        )}
                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                          {ad?.title}
                        </h3>
                        <p className="text-lg text-muted-foreground max-w-md">
                          {ad?.description}
                        </p>
                      </div>

                      {/* Offer & CTA */}
                      <div className="space-y-6">
                        {ad?.offer && (
                          <div className="flex items-baseline space-x-3">
                            <span className="text-3xl font-heading font-bold text-primary">
                              {ad?.offer}
                            </span>
                            {ad?.originalPrice && (
                              <span className="text-xl text-muted-foreground line-through opacity-70">
                                {ad?.originalPrice}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            href={ad?.ctaLink}
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-gold-sm transition-all duration-300 press-effect"
                          >
                            <span>{ad?.ctaText}</span>
                            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                          </Link>
                          {ad?.secondaryCtaText && (
                            <Link
                              href={ad?.secondaryCtaLink}
                              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent hover:bg-accent/10 text-foreground border-2 border-primary/10 hover:border-primary/30 font-semibold rounded-xl transition-all duration-300 press-effect"
                            >
                              <span>{ad?.secondaryCtaText}</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Full-Bleed Product Image */}
                  <div className="relative bg-background overflow-hidden h-full border-t lg:border-t-0 lg:border-l border-border/50">
                    {ad?.productImage && (
                      <AppImage
                        src={ad?.productImage}
                        alt={ad?.productImageAlt}
                        fill
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          {advertisements?.length > 1 && (
            <div className="absolute bottom-6 right-8 z-20 flex items-center space-x-6 bg-background/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5">
              {/* Dots Indicator */}
              <div className="flex items-center space-x-2">
                {advertisements?.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToAd(index)}
                    className={`w-3 h-3 rounded-full transition-smooth ${
                      index === currentAd
                        ? 'bg-primary' :'bg-background/50 hover:bg-background/70'
                    }`}
                    aria-label={`Go to advertisement ${index + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="w-8 h-8 flex items-center justify-center bg-background/80 hover:bg-background text-foreground rounded-full transition-smooth press-effect"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={16} />
              </button>
            </div>
          )}

          {/* Progress Bar */}
          {advertisements?.length > 1 && isPlaying && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-background/20">
              <div
                className="h-full bg-primary transition-all duration-5000 ease-linear"
                style={{
                  width: `${((currentAd + 1) / advertisements?.length) * 100}%`
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
    })
  )?.isRequired,
};