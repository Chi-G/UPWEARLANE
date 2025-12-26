import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata = {
  title: 'UpWearLane - Premium Tech Fashion & Wearable Technology',
  description: 'Discover cutting-edge wearable technology and high-tech fashion. Shop smart fabrics, tech-infused clothing, and innovative accessories with global shipping.'
};

export default function LandingPage() {
  const pageData = {
    hero: {
      title: "The Future of Fashion is Here",
      subtitle: "Discover cutting-edge wearable technology and smart fabrics that seamlessly blend style with innovation",
      backgroundImage: "/images/products/hero/hero-bg.png",
      backgroundImageAlt: "Modern tech fashion store interior with futuristic lighting and digital displays",
      heroImage: "/images/products/hero/hero-image.png",
      heroImageAlt: "Professional woman wearing smart fitness tracker and tech-enabled athletic wear in modern urban setting",
      badge: "New Collection",
      stats: [
      { value: "50K+", label: "Happy Customers" },
      { value: "200+", label: "Tech Products" },
      { value: "25+", label: "Countries" }]

    },

    featuredProducts: [ 
    {
      id: 1,
      name: "Smart Fitness Tracker Pro",
      description: "Advanced health monitoring with 24/7 heart rate tracking and GPS",
      price: "299.99",
      originalPrice: "399.99",
      image: "/images/products/featured/featured-product-1.png",
      imageAlt: "Sleek black smart fitness tracker with digital display showing health metrics on modern wrist",
      rating: 4.8,
      reviewCount: 1247,
      isNew: true,
      discount: 25,
      colors: ["#000000", "#0066CC", "#FF6B6B", "#4ECDC4"]
    },
    {
      id: 2, 
      name: "Heated Smart Jacket",
      description: "Temperature-controlled jacket with smartphone app integration",
      price: "449.99",
      image: "/images/products/featured/featured-product-2.png",
      imageAlt: "Modern black heated jacket with subtle tech elements and smartphone connectivity features",
      rating: 4.6,
      reviewCount: 892,
      colors: ["#000000", "#2C3E50", "#8B4513"]
    },
    {
      id: 3,
      name: "LED Light-Up Sneakers",
      description: "Customizable LED patterns with wireless charging technology",
      price: "199.99",
      originalPrice: "249.99",
      image: "/images/products/featured/featured-product-3.png",
      imageAlt: "High-tech sneakers with LED light strips and futuristic design elements in white and blue",
      rating: 4.4,
      reviewCount: 634,
      discount: 20,
      colors: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"]
    },
    {
      id: 4,
      name: "Smart Fabric T-Shirt",
      description: "Moisture-wicking fabric with integrated fitness sensors",
      price: "89.99",
      image: "/images/products/featured/featured-product-4.png",
      imageAlt: "Athletic man wearing high-tech gray t-shirt with subtle sensor integration during workout",
      rating: 4.7,
      reviewCount: 423,
      isNew: true,
      colors: ["#808080", "#000000", "#FFFFFF", "#000080"]
    }],


    bestsellers: [
    {
      id: 5,
      name: "Wireless Charging Backpack",
      description: "Premium backpack with built-in wireless charging pad and USB ports",
      price: "179.99",
      originalPrice: "219.99",
      image: "/images/products/bestsellers/bestseller-1.png",
      imageAlt: "Professional black tech backpack with wireless charging capabilities and modern design elements",
      rating: 4.9,
      reviewCount: 2156,
      soldCount: 5420,
      discount: 18
    },
    {
      id: 6,
      name: "Smart Ring Fitness Tracker",
      description: "Discreet health monitoring in a sleek titanium ring design",
      price: "349.99",
      image: "/images/products/bestsellers/bestseller-2.png",
      imageAlt: "Elegant titanium smart ring with health sensors on professional hand showing fitness data",
      rating: 4.6,
      reviewCount: 1834,
      soldCount: 3210
    },
    {
      id: 7,
      name: "AR Smart Glasses",
      description: "Augmented reality glasses with voice control and navigation",
      price: "899.99",
      originalPrice: "1199.99",
      image: "/images/products/bestsellers/bestseller-3.png",
      imageAlt: "Futuristic AR smart glasses with transparent display and sleek frame design worn by tech professional",
      rating: 4.3,
      reviewCount: 967,
      soldCount: 1890,
      discount: 25
    },
    {
      id: 8,
      name: "Smart Watch Series X",
      description: "Latest smartwatch with health monitoring and 5G connectivity",
      price: "599.99",
      image: "/images/products/bestsellers/bestseller-4.png",
      imageAlt: "Premium smartwatch with large display showing health metrics and notifications on modern wrist",
      rating: 4.8,
      reviewCount: 3421,
      soldCount: 8750
    }],


    newArrivals: [
    {
      id: 9,
      name: "Biometric Security Wallet",
      description: "RFID-blocking wallet with fingerprint unlock technology",
      price: "129.99",
      image: "/images/products/newarrivals/newarrival-1.png",
      imageAlt: "High-tech leather wallet with biometric scanner and RFID protection technology",
      launchDate: "Dec 2024",
      features: ["Fingerprint Lock", "RFID Blocking", "Bluetooth Tracking"],
      preOrder: false
    },
    {
      id: 10,
      name: "Solar Charging Hat",
      description: "Stylish cap with integrated solar panels for device charging",
      price: "79.99",
      image: "/images/products/newarrivals/newarrival-2.png",
      imageAlt: "Modern baseball cap with discrete solar panels and USB charging port for outdoor activities",
      launchDate: "Jan 2025",
      features: ["Solar Panels", "USB Output", "Weather Resistant"],
      preOrder: true
    },
    {
      id: 11,
      name: "Smart Posture Shirt",
      description: "Intelligent fabric that monitors and corrects posture in real-time",
      price: "159.99",
      image: "/images/products/newarrivals/newarrival-3.png",
      imageAlt: "Professional wearing smart posture-correcting shirt with subtle sensor technology integration",
      launchDate: "Dec 2024",
      features: ["Posture Monitoring", "Haptic Feedback", "App Integration"],
      preOrder: false
    },
    {
      id: 12,
      name: "Holographic Display Watch",
      description: "Revolutionary timepiece with 3D holographic projection display",
      price: "1299.99",
      image: "/images/products/newarrivals/newarrival-4.png",
      imageAlt: "Futuristic watch projecting holographic display with 3D interface and advanced technology",
      launchDate: "Feb 2025",
      features: ["3D Hologram", "Gesture Control", "AI Assistant"],
      preOrder: true
    },
    {
      id: 13,
      name: "Temperature Control Socks",
      description: "Smart socks with heating and cooling technology for optimal comfort",
      price: "49.99",
      image: "/images/products/newarrivals/newarrival-5.png",
      imageAlt: "High-tech athletic socks with temperature control fibers and smartphone app connectivity",
      launchDate: "Dec 2024",
      features: ["Temp Control", "Moisture Wicking", "Long Battery"],
      preOrder: false
    },
    {
      id: 14,
      name: "Voice Assistant Earrings",
      description: "Elegant jewelry with built-in AI voice assistant and health monitoring",
      price: "249.99",
      image: "/images/products/newarrivals/newarrival-6.png",
      imageAlt: "Sophisticated smart earrings with voice assistant technology and health monitoring sensors",
      launchDate: "Jan 2025",
      features: ["Voice AI", "Health Sensors", "Wireless Charging"],
      preOrder: true
    },
    {
      id: 19,
      name: "Smart AR Glasses V2",
      description: "Next-gen augmented reality glasses with neural interface and 8K transparent display",
      price: "1499.99",
      image: "/images/products/newarrivals/newarrival-7.png",
      imageAlt: "Futuristic sleek AR glasses with blue UI overlay in tech fashion studio",
      launchDate: "Mar 2025",
      features: ["Neural Interface", "8K Display", "AR Navigation"],
      preOrder: true
    },
    {
      id: 20,
      name: "Haptic Sensor Gloves",
      description: "Professional haptic feedback gloves for precise digital interaction and tactile immersion",
      price: "549.99",
      image: "/images/products/newarrivals/newarrival-8.png",
      imageAlt: "High-tech dark gray haptic gloves with glowing fiber-optic sensors",
      launchDate: "Feb 2025",
      features: ["Pressure Sensing", "Vibration Motors", "Low Latency"],
      preOrder: false
    }],


    promotionalDeals: [
    {
      id: 15,
      title: "Tech Fashion Bundle",
      description: "Complete smart wardrobe starter pack with smartwatch, fitness tracker, and smart clothing essentials for the modern tech enthusiast.",
      originalPrice: "899.99",
      discountedPrice: "599.99",
      discount: 33,
      image: "/images/products/promotional-deals/promotional-deal-1.png",
      imageAlt: "Collection of tech fashion items including smartwatch, fitness tracker, and smart clothing displayed on modern surface",
      type: "Bundle Deal",
      endDate: "2024-12-31T23:59:59",
      features: [
      "Smart Watch Series X included",
      "Fitness tracking shirt",
      "Wireless charging accessories",
      "Free premium app subscription",
      "Extended 2-year warranty"],

      productId: 1
    },
    {
      id: 16,
      title: "Holiday Mega Sale",
      description: "Exclusive holiday discounts on premium wearable technology and smart fashion accessories. Limited time offer with free global shipping.",
      originalPrice: "1299.99",
      discountedPrice: "779.99",
      discount: 40,
      image: "/images/products/promotional-deals/promotional-deal-2.png",
      imageAlt: "Holiday sale display featuring premium tech fashion items with festive lighting and discount tags",
      type: "Flash Sale",
      endDate: "2024-12-25T23:59:59",
      features: [
      "Up to 40% off selected items",
      "Free express shipping worldwide",
      "Gift wrapping included",
      "30-day return guarantee",
      "Exclusive member pricing"],

      productId: 2
    }],


    advertisements: [
    {
      id: 17,
      title: "Revolutionary AR Fashion Experience",
      description: "Try on our latest tech fashion collection virtually with our new AR fitting room technology. See how you look before you buy!",
      backgroundImage: "images/products/adverts/advert-1.png",
      backgroundImageAlt: "Futuristic AR fashion store with virtual try-on technology and holographic displays",
      productImage: "images/products/adverts/advert-2.png",
      productImageAlt: "AR smart glasses displaying virtual fashion overlay and fitting technology",
      badge: "New Technology",
      offer: "Try AR Fitting",
      ctaText: "Experience AR Now",
      ctaLink: "/product-catalog?feature=ar-fitting",
      secondaryCtaText: "Learn More",
      secondaryCtaLink: "/product-catalog"
    },
    {
      id: 18,
      title: "Smart Fabric Innovation",
      description: "Discover our breakthrough in smart fabric technology that adapts to your body temperature and activity level automatically.",
      backgroundImage: "images/products/adverts/advert-3.png",
      backgroundImageAlt: "Close-up of smart fabric fibers with integrated sensors and temperature control technology",
      productImage: "images/products/adverts/advert-3.png",
      productImageAlt: "Smart fabric t-shirt with visible sensor integration and temperature regulation features",
      badge: "Innovation",
      offer: "From $89.99",
      originalPrice: "$129.99",
      ctaText: "Shop Smart Fabrics",
      ctaLink: "/product-catalog?category=smart-fabrics",
      secondaryCtaText: "View Technology",
      secondaryCtaLink: "/product-catalog"
    }],


    newsletter: {
      title: "Stay Ahead of Tech Fashion",
      description: "Be the first to know about new arrivals, exclusive deals, and breakthrough innovations in wearable technology.",
      benefits: [
      "Early access to new product launches",
      "Exclusive member-only discounts up to 30%",
      "Tech fashion trend insights and styling tips",
      "Priority customer support and warranty extensions"],

      subscriberCount: "25,000"
    },

    footer: {
      companyDescription: "UpWearLane is the premier destination for cutting-edge wearable technology and smart fashion. We blend innovation with style to create the future of fashion.",
      socialLinks: [
      { name: "Facebook", url: "https://facebook.com/upwearlane", icon: "Facebook" },
      { name: "Twitter", url: "https://twitter.com/upwearlane", icon: "Twitter" },
      { name: "Instagram", url: "https://instagram.com/upwearlane", icon: "Instagram" },
      { name: "LinkedIn", url: "https://linkedin.com/company/upwearlane", icon: "Linkedin" }],

      quickLinks: [
      { name: "About Us", url: "/about" },
      { name: "Product Catalog", url: "/product-catalog" },
      { name: "Size Guide", url: "/size-guide" },
      { name: "Shipping Info", url: "/shipping" },
      { name: "Returns", url: "/returns" },
      { name: "Support", url: "/support" }],

      categories: [
      { name: "Smart Watches", url: "/product-catalog?category=smartwatches" },
      { name: "Fitness Trackers", url: "/product-catalog?category=fitness" },
      { name: "Smart Clothing", url: "/product-catalog?category=clothing" },
      { name: "Tech Accessories", url: "/product-catalog?category=accessories" },
      { name: "AR/VR Gear", url: "/product-catalog?category=arvr" },
      { name: "New Arrivals", url: "/product-catalog?filter=new" }],

      contact: {
        address: "Abuja, Nigeria",
        phone: "+234 7065910449",
        email: "info@upwearlane.com"
      },
      trustBadges: ["SSL Secure", "PCI Compliant", "30-Day Returns", "Global Shipping"],
      legalLinks: [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" }, 
      { name: "Cookie Policy", url: "/cookies" }]

    }
  };

  return <LandingPageInteractive pageData={pageData} />;
}