import Header from '@/components/common/Header';
import ProductDetailInteractive from './components/ProductDetailInteractive';

export const metadata = {
  title: 'Product Detail - UpWearLane',
  description:
  'Explore detailed product information, specifications, customer reviews, and high-quality images for our tech-infused fashion and wearable technology items.'
};

export default function ProductDetailPage() {
  const productData = {
    id: 1,
    name: 'NeoFlex Smart Jacket',
    category: 'Tech Wear',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 127,
    description: `Experience the future of fashion with the NeoFlex Smart Jacket. This revolutionary piece combines cutting-edge wearable technology with premium materials to create a jacket that adapts to your lifestyle. Featuring integrated heating elements, gesture-controlled music playback, and built-in LED safety lights, this jacket is perfect for the modern urban explorer. The water-resistant nano-fabric keeps you dry while maintaining breathability, and the rechargeable battery provides up to 8 hours of continuous use.`,
    isNew: true,
    inStock: true,
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_107ca21c7-1766363229864.png",
      alt: 'Man wearing black NeoFlex Smart Jacket with LED lights activated in urban setting'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_12a037516-1766416792792.png",
      alt: 'Close-up detail of NeoFlex Smart Jacket control panel and heating zones'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1207b0a84-1766416785673.png",
      alt: 'Side view of NeoFlex Smart Jacket showing sleek design and fit'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_198d6d830-1766416793014.png",
      alt: 'Back view of NeoFlex Smart Jacket with integrated LED safety lights'
    }],

    colors: [
    { name: 'Midnight Black', hex: '#1A1A1A' },
    { name: 'Steel Grey', hex: '#6B7280' },
    { name: 'Navy Blue', hex: '#1E3A8A' }],

    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
    'Integrated heating system with 3 temperature zones',
    'Gesture-controlled music playback via sleeve sensors',
    'Built-in LED safety lights with multiple modes',
    'Water-resistant nano-fabric technology',
    'Rechargeable battery with 8-hour runtime',
    'Smartphone connectivity via Bluetooth 5.0',
    'Machine washable (remove battery pack)',
    'Reflective accents for enhanced visibility'],

    specifications: {
      Material: '65% Polyester, 30% Nylon, 5% Elastane',
      'Battery Capacity': '5000mAh Lithium-ion',
      'Charging Time': '2-3 hours',
      'Water Resistance': 'IPX4 rated',
      Weight: '1.2 kg',
      'Care Instructions': 'Machine wash cold, tumble dry low'
    },
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_107ca21c7-1766363229864.png",
    alt: 'Man wearing black NeoFlex Smart Jacket with LED lights activated in urban setting'
  };

  const reviewsData = [
  {
    id: 1,
    userName: 'Marcus Johnson',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10a538b25-1763292461340.png",
    userImageAlt: 'Professional headshot of Marcus Johnson, African American man in business attire',
    rating: 5,
    title: 'Best tech jacket I have ever owned!',
    comment: `This jacket exceeded all my expectations. The heating system is incredibly effective during cold morning commutes, and the gesture controls work flawlessly. The build quality is outstanding, and it looks just as good at the office as it does on weekend adventures. Worth every penny!`,
    date: '2025-12-15',
    verified: true,
    helpfulCount: 42
  },
  {
    id: 2,
    userName: 'Sarah Chen',
    userImage: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    userImageAlt: 'Portrait of Sarah Chen, Asian woman with long black hair smiling outdoors',
    rating: 4,
    title: 'Great features, minor fit issues',
    comment: `Love the technology integration and the jacket keeps me warm during my bike commutes. The LED lights are a game-changer for safety. Only complaint is that the sizing runs slightly large - I should have ordered a size down. Still highly recommend!`,
    date: '2025-12-10',
    verified: true,
    helpfulCount: 28
  },
  {
    id: 3,
    userName: 'David Martinez',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6bc1b96-1763295423974.png",
    userImageAlt: 'Casual photo of David Martinez, Hispanic man with beard wearing casual clothing',
    rating: 5,
    title: 'Perfect for outdoor enthusiasts',
    comment: `As someone who spends a lot of time hiking and camping, this jacket is perfect. The battery life is impressive, and the water resistance has held up in some pretty heavy rain. The heating zones are positioned perfectly. This is innovation done right!`,
    date: '2025-12-05',
    verified: true,
    helpfulCount: 35
  },
  {
    id: 4,
    userName: 'Emily Thompson',
    userImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10c652490-1763297183972.png",
    userImageAlt: 'Professional portrait of Emily Thompson, Caucasian woman with blonde hair',
    rating: 5,
    title: 'Fashion meets function perfectly',
    comment: `I was skeptical about tech clothing, but this jacket changed my mind completely. It is stylish enough for everyday wear, and the smart features are incredibly useful. The gesture controls took a day to get used to, but now I cannot imagine going back to regular jackets.`,
    date: '2025-11-28',
    verified: true,
    helpfulCount: 19
  }];


  const relatedProductsData = [
  {
    id: 2,
    name: 'ThermoCore Heated Vest',
    category: 'Tech Wear',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 89,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16369ee7d-1765789591054.png",
    alt: 'Black ThermoCore Heated Vest with visible heating elements on mannequin',
    description: 'A versatile heated vest for core warmth in variable conditions.',
    isNew: false,
    discount: 25
  },
  {
    id: 3,
    name: 'SmartFit Performance Hoodie',
    category: 'Apparel',
    price: 129.99,
    rating: 4.7,
    reviews: 156,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_181e7eac0-1764649791120.png",
    alt: 'Grey SmartFit Performance Hoodie with integrated fitness tracking sensors',
    description: 'High-performance hoodie with integrated biometric sensors.',
    isNew: true
  },
  {
    id: 4,
    name: 'AeroTech Running Jacket',
    category: 'Sportswear',
    price: 179.99,
    originalPrice: 229.99,
    rating: 4.5,
    reviews: 73,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_194127759-1764754825887.png",
    alt: 'Lightweight blue AeroTech Running Jacket with reflective strips',
    description: 'Ultra-lightweight windbreaker for runners who demand the best.',
    isNew: false,
    discount: 22
  },
  {
    id: 5,
    name: 'UrbanShield Windbreaker',
    category: 'Tech Wear',
    price: 99.99,
    rating: 4.4,
    reviews: 112,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17a379768-1765158226617.png",
    alt: 'Black UrbanShield Windbreaker with modern minimalist design',
    description: 'Minimalist windbreaker with advanced urban protection.',
    isNew: false
  },
  {
    id: 6,
    name: 'ProTech Insulated Parka',
    category: 'Tech Wear',
    price: 349.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviews: 201,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1973122eb-1765444540891.png",
    alt: 'Heavy-duty navy ProTech Insulated Parka with fur-lined hood',
    description: 'Extreme protection for the coldest urban environments.',
    isNew: true,
    discount: 22
  }];


  return (
    <>
      <Header />
      <ProductDetailInteractive
        product={productData}
        reviews={reviewsData}
        relatedProducts={relatedProductsData} />

    </>);

}