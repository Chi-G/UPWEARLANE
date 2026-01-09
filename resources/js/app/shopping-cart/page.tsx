import Header from '@/components/common/Header';
import { usePage } from '@inertiajs/react';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
    title: 'Shopping Cart - UpWearLane',
    description:
        'Review your selected tech fashion items, apply promo codes, and proceed to secure checkout with worldwide shipping options.',
};

interface CartSettings {
    pageTitle: string;
    pageDescription: string;
    freeShippingThreshold: number;
    defaultShippingCost: number;
    taxRate: number;
    trustSignals: Array<{ icon: string; text: string; color: string }>;
}

interface PromoCode {
    code: string;
    description: string;
    type: 'percentage' | 'fixed' | 'shipping';
    value: number;
    minOrder: number;
}

interface ShoppingCartPageProps {
    cartSettings?: CartSettings;
    availablePromoCodes?: PromoCode[];
    [key: string]: unknown; 
}

export default function ShoppingCartPage() {
    const { cartSettings, availablePromoCodes } = usePage<ShoppingCartPageProps>().props;

    const pageTitle = cartSettings?.pageTitle || 'Your Shopping Cart';
    const pageDescription = cartSettings?.pageDescription || 'Review your selected items and proceed to checkout. Free shipping on orders over $100.';

    return (
        <div className="bg-background min-h-screen">
            <Header />

            <main className="mx-auto px-4 py-8 sm:px-8 md:py-12">
                <div className="mb-8 mt-20">
                    <h1 className="font-heading text-foreground mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
                        {pageTitle}
                    </h1>
                    <p className="text-muted-foreground max-w-3xl text-base md:text-lg">
                        {pageDescription}
                    </p>
                </div>

                <ShoppingCartInteractive 
                    cartSettings={cartSettings}
                    availablePromoCodes={availablePromoCodes}
                />
            </main>
        </div>
    );
}
