import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: string | number;
    originalPrice?: string | number;
    discount?: number;
    rating: number;
    reviews?: number;
    reviewCount?: number;
    image: string;
    alt: string;
    description: string;
    colors?: string[] | { name: string; hex: string }[];
    brand?: string;
    soldCount?: number;
    isNew?: boolean;
    launchDate?: string;
    preOrder?: boolean;
    features?: string[];
}

export interface ProductCatalogInteractiveProps {
    initialProducts: Product[];
}

export interface HeroStats {
    value: string;
    label: string;
}

export interface HeroData {
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    heroImage: string;
    heroImageAlt: string;
    badge: string;
    stats: HeroStats[];
}

export interface Deal {
    id: number;
    title: string;
    description: string;
    originalPrice: string;
    discountedPrice: string;
    discount: number;
    image: string;
    imageAlt: string;
    type: string;
    endDate: string;
    features: string[];
    productId: number;
}

export interface PageData {
    hero: HeroData;
    featuredProducts: Product[];
    bestsellers: Product[];
    newArrivals: Product[];
    promotionalDeals: Deal[];
    advertisements: Advertisement[];
    newsletter: NewsletterData;
    footer: FooterData;
}

export interface Review {
    id: number;
    userName: string;
    userImage: string;
    userImageAlt: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    verified: boolean;
    helpfulCount: number;
}

export interface ProductDetail extends Product {
    price: number;
    originalPrice?: number;
    reviewCount: number;
    isNew?: boolean;
    inStock: boolean;
    images: { url: string; alt: string }[];
    colors: { name: string; hex: string }[];
    sizes: string[];
    features: string[];
    specifications: Record<string, string>;
}

export interface ProductDetailProps {
    product: ProductDetail;
    reviews: Review[];
    relatedProducts: Product[];
}
export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ShippingMethod {
    carrier: string;
    deliveryTime: string;
    cost: number;
}

export interface PaymentInfo {
    method: string;
    last4?: string;
    cardType?: string;
    cryptocurrency?: string;
    timestamp: string;
}

export interface OrderDetails {
    shippingAddress: ShippingAddress | null;
    shipping: ShippingMethod | null;
    payment: PaymentInfo | null;
}

export type CurrencyCode = 'USD' | 'GBP' | 'CAD' | 'NGN';

export interface Currency {
    code: CurrencyCode;
    symbol: string;
    name: string;
    region: string;
}

export interface CatalogFilters {
    categories: string[];
    priceRange: string | null;
    colors: string[];
    brands: string[];
}

export interface FilterSidebarProps {
    filters: CatalogFilters;
    onFilterChange: (filters: CatalogFilters) => void;
    onClearFilters: () => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}
export interface SocialAuthButtonsProps {
    onGoogleAuth: () => void;
    isLoading: boolean;
}

export interface Benefit {
    id: number;
    title: string;
    description: string;
}

export interface BenefitsListProps {
    benefits: Benefit[];
}

export interface AuthenticationFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface AuthenticationFormProps {
    isSignUp: boolean;
    onSubmit: (data: AuthenticationFormData) => void;
    isLoading: boolean;
}
export interface CartItem {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: string;
    alt: string;
    variations?: {
        color?: string;
        size?: string;
    };
    stock?: number;
}

export interface CartItemCardProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => Promise<void> | void;
    onRemove: (id: string) => void;
}

export interface PromoCode {
    code: string;
    description: string;
    type: 'percentage' | 'fixed' | 'shipping';
    value: number;
    minOrder: number;
}

export interface ShoppingCartInteractiveProps {
    initialCartData: CartItem[];
}

export interface PromoCodeSectionProps {
    onApplyPromo: (
        code: string | null,
    ) => { success: boolean; message?: string } | void;
    appliedPromo?: PromoCode | null;
}
export interface ProductInfoProps {
    product: ProductDetail;
}

export interface ProductImageGalleryProps {
    images: {
        url: string;
        alt: string;
    }[];
}
export interface CustomerReviewsProps {
    reviews: Review[];
    productId: number;
}

export interface OrderConfirmationProps {
    orderDetails: OrderDetails;
}

export interface OrderSummaryProps {
    shippingCost: number;
    onCurrencyUpdate?: (currency: Currency) => void;
}

export interface PaymentFormProps {
    onPaymentComplete: (paymentData: PaymentInfo) => void;
    onBack: () => void;
    totalAmount: number;
}

export interface ShippingFormProps {
    onShippingComplete: (shippingData: ShippingAddress) => void;
    initialData?: ShippingAddress;
}

export interface Advertisement {
    id: number;
    title: string;
    description: string;
    backgroundImage: string;
    backgroundImageAlt: string;
    productImage?: string;
    productImageAlt?: string;
    badge?: string;
    offer?: string;
    originalPrice?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

export interface FooterData {
    companyDescription: string;
    socialLinks: { name: string; url: string; icon: string }[];
    quickLinks: { name: string; url: string }[];
    categories: { name: string; url: string }[];
    contact: { address: string; phone: string; email: string };
    trustBadges: string[];
    legalLinks: { name: string; url: string }[];
}

export interface NewsletterData {
    title: string;
    description: string;
    benefits: string[];
    subscriberCount: string;
}
