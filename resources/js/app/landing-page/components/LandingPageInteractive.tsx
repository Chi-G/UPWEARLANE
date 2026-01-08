'use client';

import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import AdvertisementBanner from './AdvertisementBanner';
import BestsellersSection from './BestsellersSection';
import FeaturedProducts from './FeaturedProducts';
import Footer from './Footer';
import HeroBanner from './HeroBanner';
import NewArrivalsCarousel from './NewArrivalsCarousel';
// import NewsletterSubscription from './NewsletterSubscription';
// import PromotionalDeals from './PromotionalDeals';

import { PageData } from '@/types';

export default function LandingPageInteractive({
    pageData,
}: {
    pageData: PageData;
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded) {
        return (
            <div className="bg-background flex min-h-screen items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
                    <p className="text-muted-foreground">
                        UpWearLane...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main className="pt-16 lg:pt-20">
                <HeroBanner heroData={pageData?.hero} categories={pageData?.categories} />
                <FeaturedProducts products={pageData?.featuredProducts} />
                <BestsellersSection bestsellers={pageData?.bestsellers} />
                {/* <AdvertisementBanner
                    advertisements={pageData?.advertisements}
                /> */}
                <NewArrivalsCarousel newArrivals={pageData?.newArrivals} />
                {/* <PromotionalDeals deals={pageData?.promotionalDeals} /> */}
                {/* <NewsletterSubscription newsletterData={pageData?.newsletter} /> */}
            </main>
            <Footer footerData={pageData?.footer} />

            {/* Floating Support Button */}
            <Link
                href="/support"
                className="group fixed bottom-8 right-8 z-[100]"
            >
                <div className="relative">
                    <div className="bg-primary absolute inset-0 opacity-40 blur-lg transition-opacity group-hover:opacity-60" />
                    <div className="bg-primary text-primary-foreground shadow-gold-lg hover:shadow-gold-xl relative flex transform items-center gap-3 rounded-full px-4 py-3 transition-all duration-300 group-hover:-translate-y-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                            <Icon
                                name="LifebuoyIcon"
                                size={20}
                                className="text-white"
                            />
                        </div>
                        <span className="pr-2 font-semibold">Support</span>
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
