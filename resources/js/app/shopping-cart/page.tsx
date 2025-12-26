import Header from '@/components/common/Header';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
  title: 'Shopping Cart - UpWearLane',
  description: 'Review your selected tech fashion items, apply promo codes, and proceed to secure checkout with worldwide shipping options.'
};

const mockCartData = [
{
  id: 'cart-1',
  name: 'Neural Interface Smart Jacket',
  category: 'Tech Wear',
  price: 299.99,
  quantity: 1,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd1eaca2-1766034008500.png",
  alt: 'Black futuristic smart jacket with integrated LED panels and touch-sensitive controls on sleeves',
  variations: {
    color: 'Midnight Black',
    size: 'Medium'
  },
  stock: 8
},
{
  id: 'cart-2',
  name: 'Holographic Display Sneakers',
  category: 'Footwear',
  price: 189.99,
  quantity: 2,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c8e68fd4-1765034854374.png",
  alt: 'White high-tech sneakers with holographic display panels on sides showing customizable LED patterns',
  variations: {
    color: 'Arctic White',
    size: 'US 10'
  },
  stock: 3
},
{
  id: 'cart-3',
  name: 'Biometric Fitness Shirt',
  category: 'Apparel',
  price: 149.99,
  quantity: 1,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_181e7eac0-1764649791120.png",
  alt: 'Gray athletic shirt with embedded biometric sensors and moisture-wicking smart fabric technology',
  variations: {
    color: 'Tech Gray',
    size: 'Large'
  },
  stock: 12
}];


export default function ShoppingCartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto px-4 sm:px-8 py-8 md:py-12">
        <div className="mb-8 mt-20">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Your Shopping Cart
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Review your selected items and proceed to checkout. Free shipping on orders over $100.
          </p>
        </div>

        <ShoppingCartInteractive initialCartData={mockCartData} />
      </main>
    </div>);

}