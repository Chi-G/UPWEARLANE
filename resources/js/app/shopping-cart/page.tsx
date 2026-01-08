import Header from '@/components/common/Header';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
    title: 'Shopping Cart - UpWearLane',
    description:
        'Review your selected tech fashion items, apply promo codes, and proceed to secure checkout with worldwide shipping options.',
};

export default function ShoppingCartPage() {
    return (
        <div className="bg-background min-h-screen">
            <Header />

            <main className="mx-auto px-4 py-8 sm:px-8 md:py-12">
                <div className="mb-8 mt-20">
                    <h1 className="font-heading text-foreground mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
                        Your Shopping Cart
                    </h1>
                    <p className="text-muted-foreground max-w-3xl text-base md:text-lg">
                        Review your selected items and proceed to checkout. Free
                        shipping on orders over $100.
                    </p>
                </div>

                <ShoppingCartInteractive />
            </main>
        </div>
    );
}
