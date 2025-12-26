'use client';

import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';
import Header from '@/components/common/Header';
import HeroBanner from './HeroBanner';
import FeaturedProducts from './FeaturedProducts';
import BestsellersSection from './BestsellersSection';
import NewArrivalsCarousel from './NewArrivalsCarousel';
import PromotionalDeals from './PromotionalDeals';
import AdvertisementBanner from './AdvertisementBanner';
import NewsletterSubscription from './NewsletterSubscription';
import Footer from './Footer';
import PropTypes from 'prop-types';

import { PageData } from '@/types';

export default function LandingPageInteractive({ pageData }: { pageData: PageData }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading UpWearLane...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        <HeroBanner heroData={pageData?.hero} />
        <FeaturedProducts products={pageData?.featuredProducts} />
        <BestsellersSection bestsellers={pageData?.bestsellers} />
        <AdvertisementBanner advertisements={pageData?.advertisements} />
        <NewArrivalsCarousel newArrivals={pageData?.newArrivals} />
        <PromotionalDeals deals={pageData?.promotionalDeals} />
        <NewsletterSubscription newsletterData={pageData?.newsletter} />
      </main>
      <Footer footerData={pageData?.footer} />

      {/* Floating Support Button */}
      <Link
        href="/support"
        className="fixed bottom-8 right-8 z-[100] group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="relative flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-gold-lg hover:shadow-gold-xl transition-all duration-300 transform group-hover:-translate-y-1">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Icon name="LifebuoyIcon" size={20} className="text-white" />
            </div>
            <span className="font-semibold pr-2">Support</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

LandingPageInteractive.propTypes = {
  pageData: PropTypes?.shape({
    hero: PropTypes?.object?.isRequired,
    featuredProducts: PropTypes?.array?.isRequired,
    bestsellers: PropTypes?.array?.isRequired,
    newArrivals: PropTypes?.array?.isRequired,
    promotionalDeals: PropTypes?.array?.isRequired,
    advertisements: PropTypes?.array?.isRequired,
    newsletter: PropTypes?.object?.isRequired,
    footer: PropTypes?.object?.isRequired,
  })?.isRequired,
};