import { Product } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata = {
    title: 'UpWearLane - Premium Tech Fashion & Wearable Technology',
    description:
        'Discover cutting-edge wearable technology and high-tech fashion. Shop smart fabrics, tech-infused clothing, and innovative accessories with global shipping.',
};

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    image: string | null; 
}

interface HeroSettings {
    id: number;
    title: string;
    subtitle: string | null;
    badge: string | null;
    background_image: string | null;
    search_placeholder: string | null;
    featured_title: string;
    featured_description: string | null;
    bestsellers_title: string;
    bestsellers_description: string | null;
    new_arrivals_title: string;
    new_arrivals_description: string | null;
    is_active: boolean;
}

interface PageProps {
    categories: Category[];
    heroSettings: HeroSettings | null;
    featuredProducts: Product[];
    bestsellers: Product[];
    newArrivals: Product[];
    footerData?: {
        companyDescription: string;
        socialLinks: Array<{ name: string; url: string; icon: string }>;
        quickLinks: Array<{ name: string; url: string }>;
        categories: Array<{ name: string; url: string }>;
        contact: { address: string; phone: string; email: string };
        trustBadges: string[];
        legalLinks: Array<{ name: string; url: string }>;
    };
    [key: string]: unknown;
}

export default function LandingPage() {
    const { 
        categories, 
        heroSettings, 
        featuredProducts, 
        bestsellers, 
        newArrivals,
        footerData
    } = usePage<PageProps>().props;

    // Ensure currency parameter is in URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('currency')) {
            const savedCurrency = localStorage.getItem('selected_currency') || 'USD';
            urlParams.set('currency', savedCurrency);
            router.visit(`${window.location.pathname}?${urlParams.toString()}`, {
                preserveState: false,
                preserveScroll: true,
                replace: true,
            });
        }
    }, []);
 
    const pageData = {
        hero: {
            title: heroSettings?.title || 'The Future of Fashion is Here',
            subtitle: heroSettings?.subtitle || 'Discover cutting-edge wearable technology and smart fabrics that seamlessly blend style with innovation',
            backgroundImage: heroSettings?.background_image || '/images/products/hero/hero-bg.png',
            backgroundImageAlt: 'Modern tech fashion store interior with futuristic lighting and digital displays',
            badge: heroSettings?.badge || '',
            searchPlaceholder: heroSettings?.search_placeholder || undefined,
        },

        // Use products from database
        featuredProducts: {
            title: heroSettings?.featured_title || 'Featured Products',
            description: heroSettings?.featured_description || 'Discover our handpicked selection of cutting-edge wearable technology and high-tech fashion essentials',
            items: featuredProducts || [],
        },
        bestsellers: {
            title: heroSettings?.bestsellers_title || 'Bestsellers',
            description: heroSettings?.bestsellers_description || 'Our most popular wearable technology and tech-fashion items loved by customers worldwide',
            items: bestsellers || [],
        },
        newArrivals: {
            title: heroSettings?.new_arrivals_title || 'New Arrivals',
            description: heroSettings?.new_arrivals_description || 'Be the first to explore our latest collection of smart clothing and innovative tech accessories',
            items: newArrivals || [],
        },
        
        // Pass categories from database
        categories: categories || [],

        footer: footerData
            ? {
                  ...footerData,
                  categories:
                      footerData.categories && footerData.categories.length > 0
                          ? footerData.categories
                          : categories?.map((cat) => ({
                                name: cat.name,
                                url: `/product-catalog?category=${cat.slug}`,
                            })) || [],
              }
            : {
                  companyDescription:
                      'UpWearLane is the premier destination for cutting-edge wearable technology and smart fashion. We blend innovation with style to create the future of fashion.',
                  socialLinks: [
                      {
                          name: 'Facebook',
                          url: 'https://facebook.com/upwearlane',
                          icon: 'Facebook',
                      },
                      {
                          name: 'Twitter',
                          url: 'https://twitter.com/upwearlane',
                          icon: 'Twitter',
                      },
                      {
                          name: 'Instagram',
                          url: 'https://instagram.com/upwearlane',
                          icon: 'Instagram',
                      },
                      {
                          name: 'LinkedIn',
                          url: 'https://linkedin.com/company/upwearlane',
                          icon: 'Linkedin',
                      },
                  ],
                  quickLinks: [
                      { name: 'About Us', url: '/about' },
                      { name: 'Product Catalog', url: '/product-catalog' },
                      { name: 'Size Guide', url: '/size-guide' },
                      { name: 'Shipping Info', url: '/shipping' },
                      { name: 'Returns', url: '/returns' },
                      { name: 'Support', url: '/support' },
                  ],
                  categories:
                      categories?.map((cat) => ({
                          name: cat.name,
                          url: `/product-catalog?category=${cat.slug}`,
                      })) || [],
                  contact: {
                      address: 'Abuja, Nigeria',
                      phone: '+234 7065910449',
                      email: 'info@upwearlane.com',
                  },
                  trustBadges: [
                      'SSL Secure',
                      'PCI Compliant',
                      '30-Day Returns',
                      'Global Shipping',
                  ],
                  legalLinks: [
                      { name: 'Privacy Policy', url: '/privacy' },
                      { name: 'Terms of Service', url: '/terms' },
                      { name: 'Cookie Policy', url: '/cookies' },
                  ],
              },
    };

    return <LandingPageInteractive pageData={pageData} />;
}
