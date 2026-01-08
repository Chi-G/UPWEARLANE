<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\HeroSetting;
use App\Models\FooterSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        // Get currency from request or default to NGN
        $currency = $request->get('currency', 'NGN');

        // Get active hero settings
        $heroSettings = HeroSetting::where('is_active', true)->first();
        
        // Get active footer settings
        $footerSettings = FooterSetting::where('is_active', true)->first();

        // Get active categories with icons for the hero section
        $categories = Category::active()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'icon', 'image']);

        // Get featured products (limit 8) filtered by currency
        $featuredProducts = Product::with(['primaryImage', 'colors', 'category'])
            ->active()
            ->currency($currency)
            ->featured()
            ->take(8)
            ->get()
            ->map(fn($p) => $this->transformProduct($p));

        // Get bestsellers (limit 8) filtered by currency
        $bestsellers = Product::with(['primaryImage', 'colors', 'category'])
            ->active()
            ->currency($currency)
            ->bestsellers()
            ->take(8)
            ->get()
            ->map(fn($p) => $this->transformProduct($p, true));

        // Get new arrivals (limit 8) filtered by currency
        $newArrivals = Product::with(['primaryImage', 'colors', 'category'])
            ->active()
            ->currency($currency)
            ->newArrivals()
            ->take(8)
            ->get()
            ->map(fn($p) => $this->transformProduct($p));

        return Inertia::render('landing-page/page', [
            'categories' => $categories,
            'heroSettings' => $heroSettings,
            'footerSettings' => $footerSettings,
            'featuredProducts' => $featuredProducts,
            'bestsellers' => $bestsellers,
            'newArrivals' => $newArrivals,
        ]);
    }

    /**
     * Transform a product model to the frontend format
     */
    private function transformProduct(Product $product, bool $includeSoldCount = false): array
    {
        $data = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->sale_price ?? $product->base_price,
            'originalPrice' => $product->sale_price ? $product->base_price : null,
            'image' => $product->primaryImage?->image_path 
                ? ($this->formatImagePath($product->primaryImage->image_path))
                : '/images/products/placeholder.png',
            'alt' => $product->primaryImage?->alt_text ?? $product->name,
            'category' => $product->category?->name ?? 'Uncategorized',
            'rating' => (float) $product->rating,
            'reviewCount' => (int) $product->review_count,
            'isNew' => (bool) $product->is_new,
            'discount' => $product->sale_price 
                ? (int) round((1 - (float)$product->sale_price / (float)$product->base_price) * 100)
                : null,
            'colors' => $product->colors->map(fn($c) => $c->hex_code)->toArray(),
        ];

        if ($includeSoldCount) {
            $data['soldCount'] = (int) $product->sold_count;
        }

        return $data;
    }

    /**
     * Format image path to ensure it starts with /
     */
    private function formatImagePath(string $path): string
    {
        if (str_starts_with($path, '/')) {
            return $path;
        }
        return '/images/products/' . $path;
    }
}
