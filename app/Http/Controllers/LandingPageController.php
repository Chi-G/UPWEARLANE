<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\HeroSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        $currency = $request->get('currency', 'NGN');

        $heroSettings = HeroSetting::where('is_active', true)->first();

        // Initial fetch for SSR/View
        $categories = Category::active()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'icon', 'image']);

        // Featured Products
        $featuredQuery = Product::with(['primaryImage', 'colors', 'category'])->active();
        if ($heroSettings && !empty($heroSettings->featured_product_ids)) {
            $featuredProducts = $featuredQuery->whereIn('id', $heroSettings->featured_product_ids)
                ->get()
                ->map(fn($p) => $this->transformProduct($p));
        } else {
            $featuredProducts = $featuredQuery->featured()
                ->latest()
                ->take(8)
                ->get()
                ->map(fn($p) => $this->transformProduct($p));
        }

        // Bestsellers
        $bestsellersQuery = Product::with(['primaryImage', 'colors', 'category'])->active();
        if ($heroSettings && !empty($heroSettings->bestseller_product_ids)) {
            $bestsellers = $bestsellersQuery->whereIn('id', $heroSettings->bestseller_product_ids)
                ->get()
                ->map(fn($p) => $this->transformProduct($p, true));
        } else {
            $bestsellers = $bestsellersQuery->bestsellers()
                ->orderByDesc('sold_count')
                ->take(8)
                ->get()
                ->map(fn($p) => $this->transformProduct($p, true));
        }

        // New Arrivals
        $newArrivalsQuery = Product::with(['primaryImage', 'colors', 'category'])->active();
        if ($heroSettings && !empty($heroSettings->new_arrival_product_ids)) {
            $newArrivals = $newArrivalsQuery->whereIn('id', $heroSettings->new_arrival_product_ids)
                ->get()
                ->map(fn($p) => $this->transformProduct($p));
        } else {
            $newArrivals = $newArrivalsQuery->newArrivals()
                ->latest('launch_date')
                ->take(8)
                ->get()
                ->map(fn($p) => $this->transformProduct($p));
        }

        if ($heroSettings) {
            if ($heroSettings->background_image && !str_starts_with($heroSettings->background_image, 'http')) {
                $heroSettings->background_image = '/storage/' . $heroSettings->background_image;
            }

            // Format Ads Images
            if (!empty($heroSettings->advertisements)) {
                $heroSettings->advertisements = array_map(function ($ad) {
                    if (isset($ad['backgroundImage']) && !str_starts_with($ad['backgroundImage'], 'http')) {
                        $ad['backgroundImage'] = '/storage/' . $ad['backgroundImage'];
                    }
                    if (isset($ad['productImage']) && !str_starts_with($ad['productImage'], 'http')) {
                        $ad['productImage'] = '/storage/' . $ad['productImage'];
                    }
                    return $ad;
                }, $heroSettings->advertisements);
            }
        }

        return Inertia::render('landing-page/page', [
            'categories' => $categories,
            'heroSettings' => $heroSettings,
            'featuredProducts' => $featuredProducts,
            'bestsellers' => $bestsellers,
            'newArrivals' => $newArrivals,
        ]);
    }

    /**
     * API endpoint to fetch categories dynamically
     */
    public function getCategories()
    {
        return response()->json(
            Category::active()
                ->orderBy('sort_order')
                ->get(['id', 'name', 'slug', 'icon', 'image'])
        );
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
            'price' => $product->base_price,
            'originalPrice' => $product->original_price,
            'image' => $product->primaryImage?->image_path
                ? ($this->formatImagePath($product->primaryImage->image_path))
                : '/images/products/placeholder.png',
            'alt' => $product->primaryImage?->alt_text ?? $product->name,
            'category' => $product->category?->name ?? 'Uncategorized',
            'rating' => (float) $product->rating,
            'reviewCount' => (int) $product->review_count,
            'isNew' => (bool) $product->is_new,
            'discount' => $product->original_price
                ? (int) round((1 - (float)$product->base_price / (float)$product->original_price) * 100)
                : null,
            'colors' => $product->colors->map(fn($c) => $c->hex_code)->toArray(),
            'currency' => $product->currency ?? 'USD',
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
