<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductColor;
use App\Models\ProductFeature;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing products to avoid duplicates
        $this->command->info('Clearing existing products...');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ProductFeature::truncate();
        ProductVariant::truncate();
        ProductColor::truncate();
        ProductImage::truncate();
        Product::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create categories
        $categories = [
            ['name' => 'Smart Watches', 'slug' => 'smart-watches', 'sort_order' => 1],
            ['name' => 'Audio Gear', 'slug' => 'audio-gear', 'sort_order' => 2],
            ['name' => 'Tech Apparel', 'slug' => 'tech-apparel', 'sort_order' => 3],
            ['name' => 'Smart Glasses', 'slug' => 'smart-glasses', 'sort_order' => 4],
            ['name' => 'Fitness Tech', 'slug' => 'fitness-tech', 'sort_order' => 5],
            ['name' => 'Accessories', 'slug' => 'accessories', 'sort_order' => 6],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // Products using actual images from public/images/products/
        $products = [
            // Featured Products (4)
            [
                'name' => 'Smart Fabric Performance Jacket',
                'slug' => 'smart-fabric-performance-jacket',
                'description' => 'Revolutionary performance jacket with integrated smart fabric technology. Features temperature regulation, moisture wicking, and biometric tracking built into the fabric.',
                'base_price' => 299.99,
                'original_price' => 349.99,
                'category_slug' => 'tech-apparel',
                'rating' => 4.8,
                'review_count' => 245,
                'sold_count' => 1250,
                'is_new' => false,
                'is_featured' => true,
                'stock_quantity' => 50,
                'image' => '/images/products/featured/featured-product-1.png',
                'colors' => [
                    ['name' => 'Midnight Black', 'hex' => '#1a1a2e'],
                    ['name' => 'Navy Blue', 'hex' => '#1e3a5f'],
                    ['name' => 'Storm Grey', 'hex' => '#4a4a4a'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'Smart fabric with temperature regulation',
                    'Integrated biometric sensors',
                    'Moisture-wicking technology',
                    'Water resistant',
                    'USB charging port',
                ],
            ],
            [
                'name' => 'Haptic Feedback Gaming Gloves',
                'slug' => 'haptic-feedback-gaming-gloves',
                'description' => 'Next-generation gaming gloves with advanced haptic feedback for immersive VR and gaming experiences. Feel every action with precision tactile responses.',
                'base_price' => 179.99,
                'original_price' => 229.99,
                'category_slug' => 'accessories',
                'rating' => 4.7,
                'review_count' => 189,
                'sold_count' => 2100,
                'is_new' => false,
                'is_featured' => true,
                'stock_quantity' => 120,
                'image' => '/images/products/featured/featured-product-2.png',
                'colors' => [
                    ['name' => 'Carbon Black', 'hex' => '#1c1c1c'],
                    ['name' => 'Cyber Red', 'hex' => '#ff2d2d'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Advanced haptic motors',
                    'VR/AR compatible',
                    'Wireless connectivity',
                    '12-hour battery life',
                    'Adjustable feedback intensity',
                ],
            ],
            [
                'name' => 'Smart Glasses with AR Display',
                'slug' => 'smart-glasses-with-ar-display',
                'description' => 'Lightweight augmented reality glasses featuring heads-up display, voice control, and seamless smartphone integration for the modern tech lifestyle.',
                'base_price' => 449.99,
                'original_price' => 549.99,
                'category_slug' => 'smart-glasses',
                'rating' => 4.6,
                'review_count' => 98,
                'sold_count' => 450,
                'is_new' => false,
                'is_featured' => true,
                'stock_quantity' => 35,
                'image' => '/images/products/featured/featured-product-3.png',
                'colors' => [
                    ['name' => 'Matte Black', 'hex' => '#2d2d2d'],
                    ['name' => 'Titanium', 'hex' => '#878787'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'AR heads-up display',
                    'Voice assistant built-in',
                    'All-day battery',
                    'Prescription lens compatible',
                    'UV protection',
                ],
            ],
            [
                'name' => 'Biometric Fitness Tracking Shirt',
                'slug' => 'biometric-fitness-tracking-shirt',
                'description' => 'Advanced fitness shirt with built-in biometric sensors that track heart rate, breathing, and muscle activity in real-time.',
                'base_price' => 149.99,
                'original_price' => 179.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.5,
                'review_count' => 156,
                'sold_count' => 890,
                'is_new' => false,
                'is_featured' => true,
                'stock_quantity' => 80,
                'image' => '/images/products/featured/featured-product-4.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Electric Blue', 'hex' => '#0066ff'],
                    ['name' => 'White', 'hex' => '#ffffff'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'Real-time heart rate monitoring',
                    'Breathing pattern analysis',
                    'Muscle activity tracking',
                    'Washable sensors',
                    'App connectivity',
                ],
            ],

            // Bestsellers (4)
            [
                'name' => 'Solar Powered Backpack',
                'slug' => 'solar-powered-backpack',
                'description' => 'Eco-friendly backpack with integrated solar panels for charging your devices on the go. Features anti-theft design and weatherproof construction.',
                'base_price' => 189.99,
                'original_price' => 229.99,
                'category_slug' => 'accessories',
                'rating' => 4.9,
                'review_count' => 312,
                'sold_count' => 3200,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 150,
                'image' => '/images/products/bestsellers/bestseller-1.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Grey', 'hex' => '#808080'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'Integrated solar panels',
                    'USB charging port',
                    'Anti-theft lock system',
                    'Water-resistant fabric',
                    '30L capacity',
                ],
            ],
            [
                'name' => 'Wireless Charging Belt',
                'slug' => 'wireless-charging-belt',
                'description' => 'Revolutionary belt with built-in wireless charging technology. Power your phone while wearing it with Qi-compatible charging.',
                'base_price' => 129.99,
                'original_price' => 159.99,
                'category_slug' => 'accessories',
                'rating' => 4.7,
                'review_count' => 267,
                'sold_count' => 2800,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 200,
                'image' => '/images/products/bestsellers/bestseller-2.png',
                'colors' => [
                    ['name' => 'Black Leather', 'hex' => '#1a1a1a'],
                    ['name' => 'Brown Leather', 'hex' => '#8b4513'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Qi wireless charging',
                    'Genuine leather',
                    'Slim profile battery',
                    'LED charging indicator',
                    'Auto power-off',
                ],
            ],
            [
                'name' => 'Thermal Regulation Leggings',
                'slug' => 'thermal-regulation-leggings',
                'description' => 'Smart leggings that automatically adjust temperature based on your body heat and activity level. Perfect for workouts in any weather.',
                'base_price' => 119.99,
                'original_price' => 149.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.8,
                'review_count' => 198,
                'sold_count' => 2400,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 180,
                'image' => '/images/products/bestsellers/bestseller-3.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                    ['name' => 'Charcoal', 'hex' => '#36454f'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'Auto temperature regulation',
                    'Compression fit',
                    'Sweat-wicking fabric',
                    'Four-way stretch',
                    'Reflective details',
                ],
            ],
            [
                'name' => 'UV Protective Smart Hat',
                'slug' => 'uv-protective-smart-hat',
                'description' => 'Intelligent sun protection hat with built-in UV sensors and real-time sun exposure tracking through your smartphone.',
                'base_price' => 79.99,
                'original_price' => 99.99,
                'category_slug' => 'accessories',
                'rating' => 4.6,
                'review_count' => 145,
                'sold_count' => 1900,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 250,
                'image' => '/images/products/bestsellers/bestseller-4.png',
                'colors' => [
                    ['name' => 'White', 'hex' => '#ffffff'],
                    ['name' => 'Beige', 'hex' => '#f5f5dc'],
                    ['name' => 'Black', 'hex' => '#000000'],
                ],
                'sizes' => ['S/M', 'L/XL'],
                'features' => [
                    'UV sensor technology',
                    'Sun exposure tracking',
                    'UPF 50+ protection',
                    'Breathable fabric',
                    'Adjustable fit',
                ],
            ],

            // New Arrivals (8)
            [
                'name' => 'LED Fiber Optic Evening Gown',
                'slug' => 'led-fiber-optic-evening-gown',
                'description' => 'Stunning evening gown with integrated LED fiber optics that create mesmerizing light patterns. App-controlled colors and effects.',
                'base_price' => 599.99,
                'original_price' => 749.99,
                'category_slug' => 'tech-apparel',
                'rating' => 4.9,
                'review_count' => 45,
                'sold_count' => 120,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 20,
                'image' => '/images/products/newarrivals/newarrival-1.png',
                'colors' => [
                    ['name' => 'Black/Multi LED', 'hex' => '#000000'],
                    ['name' => 'White/Multi LED', 'hex' => '#ffffff'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'App-controlled LED patterns',
                    '16 million color options',
                    'Rechargeable battery',
                    'Washable (remove battery)',
                    '8-hour battery life',
                ],
            ],
            [
                'name' => 'Posture Correcting Smart Vest',
                'slug' => 'posture-correcting-smart-vest',
                'description' => 'Intelligent vest that monitors your posture and provides gentle vibration reminders to help you maintain proper alignment throughout the day.',
                'base_price' => 169.99,
                'original_price' => 199.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.5,
                'review_count' => 67,
                'sold_count' => 340,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 75,
                'image' => '/images/products/newarrivals/newarrival-2.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Nude', 'hex' => '#e8beac'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'Real-time posture monitoring',
                    'Gentle vibration alerts',
                    'Discreet under clothing',
                    'All-day comfort',
                    'Progress tracking app',
                ],
            ],
            [
                'name' => 'Climate Adaptive Running Shorts',
                'slug' => 'climate-adaptive-running-shorts',
                'description' => 'High-performance running shorts with climate-adaptive technology that adjusts ventilation based on your body temperature and activity.',
                'base_price' => 89.99,
                'original_price' => 109.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.7,
                'review_count' => 89,
                'sold_count' => 560,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 120,
                'image' => '/images/products/newarrivals/newarrival-3.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                    ['name' => 'Neon Green', 'hex' => '#39ff14'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'Adaptive ventilation zones',
                    'Quick-dry fabric',
                    'Built-in liner',
                    'Zippered pocket',
                    'Reflective trim',
                ],
            ],
            [
                'name' => 'Muscle Recovery Compression Sleeves',
                'slug' => 'muscle-recovery-compression-sleeves',
                'description' => 'Advanced compression sleeves with integrated micro-massage technology for enhanced muscle recovery and circulation.',
                'base_price' => 69.99,
                'original_price' => 89.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.6,
                'review_count' => 112,
                'sold_count' => 780,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 200,
                'image' => '/images/products/newarrivals/newarrival-4.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'White', 'hex' => '#ffffff'],
                    ['name' => 'Electric Blue', 'hex' => '#0066ff'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Graduated compression',
                    'Micro-massage nodes',
                    'Moisture-wicking',
                    'Anti-odor technology',
                    'UV protection',
                ],
            ],
            [
                'name' => 'Smart Glasses V2 Pro',
                'slug' => 'smart-glasses-v2-pro',
                'description' => 'Second generation smart glasses with improved display, longer battery life, and enhanced voice recognition capabilities.',
                'base_price' => 499.99,
                'original_price' => 599.99,
                'category_slug' => 'smart-glasses',
                'rating' => 4.8,
                'review_count' => 34,
                'sold_count' => 180,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 40,
                'image' => '/images/products/newarrivals/newarrival-5.png',
                'colors' => [
                    ['name' => 'Matte Black', 'hex' => '#2d2d2d'],
                    ['name' => 'Crystal Clear', 'hex' => '#e0e0e0'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'Enhanced AR display',
                    '14-hour battery life',
                    'Improved voice AI',
                    'Swappable frames',
                    'Water resistant',
                ],
            ],
            [
                'name' => 'Haptic Gaming Gloves Pro',
                'slug' => 'haptic-gaming-gloves-pro',
                'description' => 'Professional-grade haptic gloves with per-finger feedback and motion tracking for the ultimate VR gaming experience.',
                'base_price' => 249.99,
                'original_price' => 299.99,
                'category_slug' => 'accessories',
                'rating' => 4.7,
                'review_count' => 56,
                'sold_count' => 290,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 60,
                'image' => '/images/products/newarrivals/newarrival-6.png',
                'colors' => [
                    ['name' => 'Black/RGB', 'hex' => '#000000'],
                    ['name' => 'White/RGB', 'hex' => '#ffffff'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Per-finger haptic motors',
                    'Motion tracking',
                    'Low-latency wireless',
                    '15-hour battery',
                    'PC/Console compatible',
                ],
            ],
            [
                'name' => 'Smart Performance Jacket Elite',
                'slug' => 'smart-performance-jacket-elite',
                'description' => 'Elite version of our performance jacket with advanced heating zones, GPS tracking, and emergency SOS feature.',
                'base_price' => 399.99,
                'original_price' => 479.99,
                'category_slug' => 'tech-apparel',
                'rating' => 4.9,
                'review_count' => 28,
                'sold_count' => 150,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 30,
                'image' => '/images/products/newarrivals/newarrival-7.png',
                'colors' => [
                    ['name' => 'Alpine Black', 'hex' => '#1a1a1a'],
                    ['name' => 'Arctic White', 'hex' => '#f8f8ff'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    '5 heating zones',
                    'Built-in GPS',
                    'Emergency SOS',
                    'Waterproof',
                    '20-hour battery',
                ],
            ],
            [
                'name' => 'Biometric Training Shirt Pro',
                'slug' => 'biometric-training-shirt-pro',
                'description' => 'Professional-grade training shirt with comprehensive biometric tracking including ECG, respiratory rate, and muscle load analysis.',
                'base_price' => 199.99,
                'original_price' => 249.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.8,
                'review_count' => 42,
                'sold_count' => 210,
                'is_new' => true,
                'is_featured' => false,
                'stock_quantity' => 55,
                'image' => '/images/products/newarrivals/newarrival-8.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'ECG monitoring',
                    'Respiratory tracking',
                    'Muscle load analysis',
                    'Coach AI integration',
                    'Machine washable',
                ],
            ],

            // Product Catalog items (using product-catalog folder images)
            [
                'name' => 'Biometric Fitness Shirt Standard',
                'slug' => 'biometric-fitness-shirt-standard',
                'description' => 'Track your fitness metrics in real-time with this intelligent shirt featuring embedded biometric sensors.',
                'base_price' => 139.99,
                'original_price' => 169.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.5,
                'review_count' => 134,
                'sold_count' => 920,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 95,
                'image' => '/images/products/product-catalog/biometric-fitness-tracking-shirt.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Grey', 'hex' => '#808080'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Heart rate monitoring',
                    'Calorie tracking',
                    'Sweat analysis',
                    'App sync',
                    'Quick-dry fabric',
                ],
            ],
            [
                'name' => 'Climate Running Shorts Standard',
                'slug' => 'climate-running-shorts-standard',
                'description' => 'Intelligent running shorts that adapt to weather conditions and your body temperature for optimal comfort.',
                'base_price' => 79.99,
                'original_price' => 99.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.4,
                'review_count' => 167,
                'sold_count' => 1100,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 140,
                'image' => '/images/products/product-catalog/climate-adaptive-running-shorts.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Blue', 'hex' => '#0066ff'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'Climate adaptation',
                    'Lightweight',
                    'Built-in brief',
                    'Phone pocket',
                    'Reflective details',
                ],
            ],
            [
                'name' => 'Haptic Feedback Gaming Gloves Standard',
                'slug' => 'haptic-gloves-standard',
                'description' => 'Entry-level haptic gloves for immersive VR and gaming experiences with tactile feedback.',
                'base_price' => 129.99,
                'original_price' => 159.99,
                'category_slug' => 'accessories',
                'rating' => 4.3,
                'review_count' => 98,
                'sold_count' => 650,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 100,
                'image' => '/images/products/product-catalog/haptic-feedback-gaming-gloves.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Haptic feedback',
                    'VR compatible',
                    'Wireless',
                    '8-hour battery',
                    'Ergonomic design',
                ],
            ],
            [
                'name' => 'LED Evening Gown Standard',
                'slug' => 'led-evening-gown-standard',
                'description' => 'Beautiful evening gown with LED fiber optics for stunning light displays.',
                'base_price' => 449.99,
                'original_price' => 549.99,
                'category_slug' => 'tech-apparel',
                'rating' => 4.7,
                'review_count' => 67,
                'sold_count' => 230,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 25,
                'image' => '/images/products/product-catalog/led-fiber-optic-evening-gown.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'White', 'hex' => '#ffffff'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'LED fiber optics',
                    'App control',
                    'Rechargeable',
                    '6-hour battery',
                    'Hand wash',
                ],
            ],
            [
                'name' => 'Recovery Compression Sleeves Standard',
                'slug' => 'compression-sleeves-standard',
                'description' => 'Compression sleeves with micro-massage for muscle recovery.',
                'base_price' => 54.99,
                'original_price' => 69.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.4,
                'review_count' => 189,
                'sold_count' => 1200,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 250,
                'image' => '/images/products/product-catalog/muscle-recovery-compression-sleeves.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'White', 'hex' => '#ffffff'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Compression support',
                    'Massage nodes',
                    'Moisture-wicking',
                    'Anti-odor',
                    'Durable',
                ],
            ],
            [
                'name' => 'Posture Smart Vest Standard',
                'slug' => 'posture-vest-standard',
                'description' => 'Smart vest for posture correction with vibration alerts.',
                'base_price' => 139.99,
                'original_price' => 169.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.5,
                'review_count' => 112,
                'sold_count' => 560,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 90,
                'image' => '/images/products/product-catalog/posture-correcting-smart-vest.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Nude', 'hex' => '#e8beac'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'Posture monitoring',
                    'Vibration alerts',
                    'Slim design',
                    'Comfortable',
                    'App tracking',
                ],
            ],
            [
                'name' => 'Performance Jacket Standard',
                'slug' => 'performance-jacket-standard',
                'description' => 'Smart fabric jacket with temperature regulation and biometric tracking.',
                'base_price' => 249.99,
                'original_price' => 299.99,
                'category_slug' => 'tech-apparel',
                'rating' => 4.6,
                'review_count' => 178,
                'sold_count' => 890,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 70,
                'image' => '/images/products/product-catalog/smart-fabric-performance-jacket.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                    ['name' => 'Grey', 'hex' => '#808080'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'features' => [
                    'Temperature control',
                    'Biometric sensors',
                    'Water resistant',
                    'USB port',
                    'Lightweight',
                ],
            ],
            [
                'name' => 'Smart Glasses V2 Standard',
                'slug' => 'smart-glasses-v2-standard',
                'description' => 'Smart glasses with AR display and voice control.',
                'base_price' => 399.99,
                'original_price' => 479.99,
                'category_slug' => 'smart-glasses',
                'rating' => 4.5,
                'review_count' => 89,
                'sold_count' => 340,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 45,
                'image' => '/images/products/product-catalog/smart-glasses-v2.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#2d2d2d'],
                    ['name' => 'Silver', 'hex' => '#c0c0c0'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'AR display',
                    'Voice control',
                    '12-hour battery',
                    'Prescription compatible',
                    'UV protection',
                ],
            ],
            [
                'name' => 'AR Display Glasses Premium',
                'slug' => 'ar-display-glasses-premium',
                'description' => 'Premium AR glasses with advanced display technology.',
                'base_price' => 549.99,
                'original_price' => 649.99,
                'category_slug' => 'smart-glasses',
                'rating' => 4.8,
                'review_count' => 56,
                'sold_count' => 180,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 30,
                'image' => '/images/products/product-catalog/smart-glasses-with-AR-display.png',
                'colors' => [
                    ['name' => 'Titanium', 'hex' => '#878787'],
                    ['name' => 'Black', 'hex' => '#000000'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'Premium AR display',
                    'AI assistant',
                    '16-hour battery',
                    'Premium build',
                    'Wide FOV',
                ],
            ],
            [
                'name' => 'Solar Backpack Standard',
                'slug' => 'solar-backpack-standard',
                'description' => 'Backpack with integrated solar panels for device charging.',
                'base_price' => 159.99,
                'original_price' => 199.99,
                'category_slug' => 'accessories',
                'rating' => 4.6,
                'review_count' => 234,
                'sold_count' => 1500,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 120,
                'image' => '/images/products/product-catalog/solar-powered-backpack.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Grey', 'hex' => '#808080'],
                ],
                'sizes' => ['One Size'],
                'features' => [
                    'Solar charging',
                    'USB port',
                    'Anti-theft',
                    'Waterproof',
                    '25L capacity',
                ],
            ],
            [
                'name' => 'Thermal Leggings Standard',
                'slug' => 'thermal-leggings-standard',
                'description' => 'Smart leggings with automatic temperature regulation.',
                'base_price' => 99.99,
                'original_price' => 129.99,
                'category_slug' => 'fitness-tech',
                'rating' => 4.5,
                'review_count' => 156,
                'sold_count' => 980,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 150,
                'image' => '/images/products/product-catalog/thermal-regulation-leggings.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Navy', 'hex' => '#1e3a5f'],
                ],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'features' => [
                    'Temperature regulation',
                    'Compression',
                    'Quick-dry',
                    'Stretch fabric',
                    'Reflective',
                ],
            ],
            [
                'name' => 'UV Smart Hat Standard',
                'slug' => 'uv-smart-hat-standard',
                'description' => 'Smart hat with UV sensor and sun exposure tracking.',
                'base_price' => 64.99,
                'original_price' => 79.99,
                'category_slug' => 'accessories',
                'rating' => 4.4,
                'review_count' => 123,
                'sold_count' => 890,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 200,
                'image' => '/images/products/product-catalog/UV-protective-smart-hat.png',
                'colors' => [
                    ['name' => 'White', 'hex' => '#ffffff'],
                    ['name' => 'Black', 'hex' => '#000000'],
                    ['name' => 'Beige', 'hex' => '#f5f5dc'],
                ],
                'sizes' => ['S/M', 'L/XL'],
                'features' => [
                    'UV sensor',
                    'App tracking',
                    'UPF 50+',
                    'Breathable',
                    'Adjustable',
                ],
            ],
            [
                'name' => 'Wireless Belt Standard',
                'slug' => 'wireless-belt-standard',
                'description' => 'Belt with built-in wireless charging for smartphones.',
                'base_price' => 109.99,
                'original_price' => 139.99,
                'category_slug' => 'accessories',
                'rating' => 4.5,
                'review_count' => 178,
                'sold_count' => 1100,
                'is_new' => false,
                'is_featured' => false,
                'stock_quantity' => 180,
                'image' => '/images/products/product-catalog/wireless-charging-belt.png',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#1a1a1a'],
                    ['name' => 'Brown', 'hex' => '#8b4513'],
                ],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'features' => [
                    'Qi charging',
                    'Leather',
                    'Slim battery',
                    'LED indicator',
                    'Auto off',
                ],
            ],
        ];

        $currencies = ['NGN', 'USD', 'GBP', 'CAD'];
        $currencyIndex = 0;

        foreach ($products as $productData) {
            $category = Category::where('slug', $productData['category_slug'])->first();

            if (!$category) {
                $this->command->warn("Category {$productData['category_slug']} not found, skipping product {$productData['name']}");
                continue;
            }

            $product = Product::updateOrCreate(
                ['slug' => $productData['slug']],
                [
                    'name' => $productData['name'],
                    'slug' => $productData['slug'],
                    'sku' => strtoupper(substr(md5($productData['slug']), 0, 8)),
                    'description' => $productData['description'],
                    'base_price' => $productData['base_price'],
                    'currency' => $currencies[$currencyIndex % count($currencies)],
                    'original_price' => $productData['original_price'],
                    'category_id' => $category->id,
                    'rating' => $productData['rating'],
                    'review_count' => $productData['review_count'],
                    'sold_count' => $productData['sold_count'],
                    'is_new' => $productData['is_new'],
                    'is_featured' => $productData['is_featured'],
                    'is_active' => true,
                    'stock_quantity' => $productData['stock_quantity'],
                    'specifications' => [
                        'Material' => 'Premium Tech Fabric',
                        'Weight' => '0.5 kg',
                        'Warranty' => '1 Year',
                        'Care' => 'Machine Washable',
                    ],
                ]
            );

            // Add primary image
            ProductImage::firstOrCreate(
                ['product_id' => $product->id, 'is_primary' => true],
                [
                    'image_path' => $productData['image'],
                    'alt_text' => $productData['name'],
                    'sort_order' => 0,
                ]
            );

            // Add colors
            foreach ($productData['colors'] as $index => $color) {
                ProductColor::firstOrCreate(
                    ['product_id' => $product->id, 'name' => $color['name']],
                    [
                        'hex_code' => $color['hex'],
                    ]
                );
            }

            // Add features
            foreach ($productData['features'] as $index => $feature) {
                ProductFeature::firstOrCreate(
                    ['product_id' => $product->id, 'name' => $feature],
                    ['sort_order' => $index]
                );
            }

            // Add size variants
            if (isset($productData['sizes'])) {
                foreach ($productData['sizes'] as $size) {
                    ProductVariant::firstOrCreate(
                        ['product_id' => $product->id, 'name' => 'Size', 'value' => $size],
                        [
                            'stock_quantity' => rand(5, 50),
                            'price_adjustment' => 0,
                        ]
                    );
                }
            }

            $currencyIndex++;
        }

        $this->command->info('✅ Products seeded successfully! Total: ' . Product::count());
    }
}
