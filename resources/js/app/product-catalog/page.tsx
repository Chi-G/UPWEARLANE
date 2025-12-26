import Header from '@/components/common/Header';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata = {
  title: 'Product Catalog - UpWearLane',
  description: 'Browse our collection of high-tech fashion, smart fabrics, and wearable technology accessories with advanced filtering and sorting options.'
};

export default function ProductCatalogPage() {
  const products = [
  {
    id: 1,
    name: 'Smart Fabric Performance Jacket',
    category: 'Apparel',
    price: '$189.99',
    originalPrice: '$249.99',
    discount: 24,
    rating: 4.8,
    reviews: 127,
    image: "/images/products/product-catalog/smart-fabric-performance-jacket.png",
    alt: 'Black high-tech performance jacket with integrated heating elements displayed on mannequin',
    description: 'Temperature-regulating smart jacket with integrated heating elements and moisture-wicking technology for optimal comfort in any weather.',
    colors: ['#000000', '#001F3F', '#4D4D4D'],
    brand: 'techfabric'
  },
  {
    id: 2,
    name: 'LED Fiber Optic Evening Gown',
    category: 'Apparel',
    price: '$349.99',
    originalPrice: '$499.99',
    discount: 30,
    rating: 4.9,
    reviews: 89,
    image: "/images/products/product-catalog/led-fiber-optic-evening-gown.png",
    alt: 'Elegant black evening gown with embedded LED fiber optic lights creating luminous patterns',
    description: 'Stunning evening gown featuring programmable LED fiber optics that create mesmerizing light patterns controlled via smartphone app.',
    colors: ['#000000', '#FFFFFF', '#D4AF37'],
    brand: 'smartwear'
  },
  {
    id: 3,
    name: 'Biometric Fitness Tracking Shirt',
    category: 'Tech Wear',
    price: '$129.99',
    rating: 4.7,
    reviews: 203,
    image: "/images/products/product-catalog/biometric-fitness-tracking-shirt.png",
    alt: 'Athletic man wearing white compression shirt with visible biometric sensors on chest',
    description: 'Advanced compression shirt with embedded biometric sensors that track heart rate, breathing patterns, and muscle activity in real-time.',
    colors: ['#FFFFFF', '#000000', '#E74C3C'],
    brand: 'futurefit'
  },
  {
    id: 4,
    name: 'Solar-Powered Backpack',
    category: 'Accessories',
    price: '$159.99',
    originalPrice: '$199.99',
    discount: 20,
    rating: 4.6,
    reviews: 156,
    image: "/images/products/product-catalog/solar-powered-backpack.png",
    alt: 'Modern black backpack with integrated solar panels on exterior surface',
    description: 'Innovative backpack with integrated solar panels that charge your devices on the go, featuring multiple USB ports and weather-resistant design.',
    colors: ['#000000', '#4D4D4D', '#C0C0C0'],
    brand: 'nexgen'
  },
  {
    id: 5,
    name: 'Haptic Feedback Gaming Gloves',
    category: 'Accessories',
    price: '$89.99',
    rating: 4.5,
    reviews: 94,
    image: "/images/products/product-catalog/haptic-feedback-gaming-gloves.png",
    alt: 'Pair of black gaming gloves with visible haptic feedback sensors on fingertips',
    description: 'Professional gaming gloves with advanced haptic feedback technology providing tactile sensations for immersive VR and gaming experiences.',
    colors: ['#000000', '#E74C3C', '#001F3F'],
    brand: 'techfabric'
  },
  {
    id: 6,
    name: 'Climate-Adaptive Running Shorts',
    category: 'Apparel',
    price: '$79.99',
    originalPrice: '$99.99',
    discount: 20,
    rating: 4.8,
    reviews: 178,
    image: "/images/products/product-catalog/climate-adaptive-running-shorts.png",
    alt: 'Athletic black running shorts with moisture-wicking fabric and reflective details',
    description: 'High-performance running shorts with climate-adaptive fabric that adjusts breathability based on body temperature and environmental conditions.',
    colors: ['#000000', '#001F3F', '#4D4D4D'],
    brand: 'smartwear'
  },
  {
    id: 7,
    name: 'Smart Glasses with AR Display',
    category: 'Accessories',
    price: '$299.99',
    rating: 4.7,
    reviews: 112,
    image: "/images/products/product-catalog/smart-glasses-with-AR-display.png",
    alt: 'Modern black smart glasses with transparent AR display lenses on white surface',
    description: 'Cutting-edge smart glasses featuring augmented reality display, voice control, and seamless smartphone integration for hands-free navigation.',
    colors: ['#000000', '#C0C0C0', '#D4AF37'],
    brand: 'nexgen'
  },
  {
    id: 8,
    name: 'Posture-Correcting Smart Vest',
    category: 'Tech Wear',
    price: '$149.99',
    originalPrice: '$189.99',
    discount: 21,
    rating: 4.6,
    reviews: 145,
    image: "/images/products/product-catalog/posture-correcting-smart-vest.png",
    alt: 'Professional woman wearing white smart vest with posture sensors in modern office',
    description: 'Intelligent vest with posture-monitoring sensors that provide gentle vibration feedback to help maintain proper spinal alignment throughout the day.',
    colors: ['#FFFFFF', '#000000', '#4D4D4D'],
    brand: 'futurefit'
  },
  {
    id: 9,
    name: 'UV-Protective Smart Hat',
    category: 'Accessories',
    price: '$69.99',
    rating: 4.5,
    reviews: 87,
    image: "/images/products/product-catalog/UV-protective-smart-hat.png",
    alt: 'Black wide-brim hat with integrated UV sensors and sun protection technology',
    description: 'Stylish hat with built-in UV sensors that monitor sun exposure and alert you via smartphone when it\'s time to seek shade or reapply sunscreen.',
    colors: ['#000000', '#FFFFFF', '#001F3F'],
    brand: 'smartwear'
  },
  {
    id: 10,
    name: 'Thermal Regulation Leggings',
    category: 'Apparel',
    price: '$119.99',
    originalPrice: '$149.99',
    discount: 20,
    rating: 4.9,
    reviews: 234,
    image: "/images/products/product-catalog/thermal-regulation-leggings.png",
    alt: 'Woman wearing black thermal leggings during outdoor winter workout',
    description: 'Advanced leggings with phase-change materials that actively regulate body temperature, keeping you comfortable during intense workouts or cold weather.',
    colors: ['#000000', '#4D4D4D', '#E74C3C'],
    brand: 'techfabric'
  },
  {
    id: 11,
    name: 'Wireless Charging Belt',
    category: 'Accessories',
    price: '$99.99',
    rating: 4.4,
    reviews: 76,
    image: "/images/products/product-catalog/wireless-charging-belt.png",
    alt: 'Modern black leather belt with integrated wireless charging coil and gold buckle',
    description: 'Fashionable belt with integrated wireless charging technology, allowing you to charge compatible devices simply by placing them near your waist.',
    colors: ['#000000', '#D4AF37', '#4D4D4D'],
    brand: 'nexgen'
  },
  {
    id: 12,
    name: 'Muscle Recovery Compression Sleeves',
    category: 'Tech Wear',
    price: '$79.99',
    originalPrice: '$99.99',
    discount: 20,
    rating: 4.7,
    reviews: 167,
    image: "/images/products/product-catalog/muscle-recovery-compression-sleeves.png",
    alt: 'Athlete wearing black compression sleeves with embedded EMS technology on arms',
    description: 'Compression sleeves with embedded EMS technology that accelerate muscle recovery through targeted electrical stimulation after workouts.',
    colors: ['#000000', '#001F3F', '#E74C3C'],
    brand: 'futurefit'
  }];


  return (
    <>
      <Header />
      <ProductCatalogInteractive initialProducts={products} />
    </>);

}