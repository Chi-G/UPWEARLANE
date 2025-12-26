import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
      <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-muted rounded-full mb-6">
        <Icon name="ShoppingCartIcon" size={48} className="text-muted-foreground" />
      </div>
      
      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
        Your Cart is Empty
      </h2>
      
      <p className="text-base md:text-lg text-muted-foreground mb-8 text-center max-w-md">
        Looks like you haven't added any items to your cart yet. Start shopping to discover our amazing tech fashion collection!
      </p>
      
      <Link
        href="/product-catalog"
        className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect flex items-center gap-2"
      >
        <Icon name="ShoppingBagIcon" size={20} />
        <span>Start Shopping</span>
      </Link>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
        <div className="flex flex-col items-center text-center p-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
            <Icon name="SparklesIcon" size={24} className="text-primary" />
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground mb-1">
            Premium Quality
          </h3>
          <p className="text-sm text-muted-foreground">
            High-tech fashion with cutting-edge materials
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
            <Icon name="TruckIcon" size={24} className="text-primary" />
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground mb-1">
            Fast Shipping
          </h3>
          <p className="text-sm text-muted-foreground">
            Worldwide delivery with trusted carriers
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
            <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
          </div>
          <h3 className="font-heading text-base font-semibold text-foreground mb-1">
            Secure Payment
          </h3>
          <p className="text-sm text-muted-foreground">
            Multiple payment options including crypto
          </p>
        </div>
      </div>
    </div>
  );
}