<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Console\Command;

class UpdateProductData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-product-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update products with specifications, size variants, and additional images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating product specifications...');
        
        Product::query()->update([
            'specifications' => [
                'Material' => 'Premium Tech Fabric',
                'Weight' => '0.5 kg', 
                'Warranty' => '1 Year',
                'Care' => 'Machine Washable',
            ]
        ]);
        
        $this->info('Adding size variants...');
        
        $products = Product::all();
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        
        foreach ($products as $product) {
            foreach ($sizes as $size) {
                ProductVariant::firstOrCreate(
                    ['product_id' => $product->id, 'name' => 'Size', 'value' => $size],
                    ['stock_quantity' => rand(5, 50), 'price_adjustment' => 0]
                );
            }
        }

        $this->info('Adding additional product images...');

        // Additional images from product-catalog folder
        $additionalImages = [
            '/images/products/product-catalog/smart-fabric-performance-jacket.png',
            '/images/products/product-catalog/haptic-feedback-gaming-gloves.png',
            '/images/products/product-catalog/smart-glasses-with-AR-display.png',
            '/images/products/product-catalog/biometric-fitness-tracking-shirt.png',
            '/images/products/product-catalog/thermal-regulation-leggings.png',
            '/images/products/product-catalog/solar-powered-backpack.png',
            '/images/products/product-catalog/led-fiber-optic-evening-gown.png',
            '/images/products/product-catalog/posture-correcting-smart-vest.png',
        ];

        foreach ($products as $product) {
            // Get current image count
            $currentCount = $product->images()->count();
            
            // Add 3 more images to each product (total 4)
            for ($i = 0; $i < 3; $i++) {
                $imageIndex = ($product->id + $i) % count($additionalImages);
                
                ProductImage::firstOrCreate(
                    [
                        'product_id' => $product->id,
                        'image_path' => $additionalImages[$imageIndex],
                        'is_primary' => false,
                    ],
                    [
                        'alt_text' => $product->name . ' - View ' . ($currentCount + $i + 1),
                        'sort_order' => $currentCount + $i + 1,
                    ]
                );
            }
        }
        
        $this->info('✅ Updated ' . $products->count() . ' products with specifications, size variants, and additional images!');
    }
}
