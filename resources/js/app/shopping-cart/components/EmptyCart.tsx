import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
            <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full md:h-32 md:w-32">
                <Icon
                    name="ShoppingCartIcon"
                    size={48}
                    className="text-muted-foreground"
                />
            </div>

            <h2 className="font-heading text-foreground mb-3 text-center text-2xl font-semibold md:text-3xl">
                Your Cart is Empty
            </h2>

            <p className="text-muted-foreground mb-8 max-w-md text-center text-base md:text-lg">
                Looks like you haven't added any items to your cart yet. Start
                shopping to discover our amazing tech fashion collection!
            </p>

            <Link
                href="/product-catalog"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect flex h-12 items-center gap-2 rounded-lg px-8 font-medium"
            >
                <Icon name="ShoppingBagIcon" size={20} />
                <span>Start Shopping</span>
            </Link>

            <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center p-4 text-center">
                    <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon
                            name="SparklesIcon"
                            size={24}
                            className="text-primary"
                        />
                    </div>
                    <h3 className="font-heading text-foreground mb-1 text-base font-semibold">
                        Premium Quality
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        High-tech fashion with cutting-edge materials
                    </p>
                </div>

                <div className="flex flex-col items-center p-4 text-center">
                    <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon
                            name="TruckIcon"
                            size={24}
                            className="text-primary"
                        />
                    </div>
                    <h3 className="font-heading text-foreground mb-1 text-base font-semibold">
                        Fast Shipping
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Worldwide delivery with trusted carriers
                    </p>
                </div>

                <div className="flex flex-col items-center p-4 text-center">
                    <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon
                            name="ShieldCheckIcon"
                            size={24}
                            className="text-primary"
                        />
                    </div>
                    <h3 className="font-heading text-foreground mb-1 text-base font-semibold">
                        Secure Payment
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Multiple payment options including crypto
                    </p>
                </div>
            </div>
        </div>
    );
}
