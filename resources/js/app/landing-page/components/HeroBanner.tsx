import { Link } from '@inertiajs/react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function HeroBanner({ heroData }: { heroData: any }) {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-accent">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src={heroData?.backgroundImage}
          alt={heroData?.backgroundImageAlt}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                {heroData?.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {heroData?.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/product-catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect"
              >
                <span>Shop Now</span>
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </Link>
              <Link
                href="/product-catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-surface hover:bg-accent text-foreground border border-border font-medium rounded-lg transition-smooth press-effect"
              >
                <Icon name="PlayIcon" size={20} className="mr-2" />
                <span>Watch Demo</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {heroData?.stats?.map((stat: any, index: number) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary whitespace-nowrap">
                    {stat?.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-gold-lg">
              <AppImage
                src={heroData?.heroImage}
                alt={heroData?.heroImageAlt}
                width={800}
                height={800}
                priority
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-gold-md">
              <span className="text-sm font-medium">{heroData?.badge}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={24} className="text-muted-foreground" />
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
      })
    )?.isRequired,
  })?.isRequired,
};