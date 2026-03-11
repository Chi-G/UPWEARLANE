<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\BrandSetting;
use App\Models\PriceRange;
use App\Models\CurrencyRate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenApi\Attributes as OA;

class ProductController extends Controller {
    #[OA\Get(
        path: "/api/product-catalog",
        summary: "Display product catalog with filters",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "category", in: "query", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "brands", in: "query", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "priceRange", in: "query", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "sort", in: "query", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "currency", in: "query", schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of products",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product")),
                        new OA\Property(property: "categories", type: "array", items: new OA\Items(ref: "#/components/schemas/Category"))
                    ]
                )
            )
        ]
    )]
    public function index(Request $request)
    {
        $query = Product::with(['category', 'primaryImage', 'colors', 'brandSetting'])
            ->active()
            ->inStock();

        // Get selected currency for frontend conversion (not filtering)
        $currency = $request->get('currency', 'NGN');

        // Category filter
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Brand filter
        if ($request->has('brands')) {
            $brands = is_array($request->brands) ? $request->brands : explode(',', $request->brands);
            $query->whereHas('brandSetting', function ($q) use ($brands) {
                $q->whereIn('brand_name', $brands);
            });
        }

        // Price Range filter
        if ($request->has('priceRange')) {
            $range = PriceRange::where('id', $request->priceRange)
                ->orWhere('label', $request->priceRange)
                ->first();
            
            if ($range) {
                if ($range->min_price !== null) {
                    $query->where('base_price', '>=', $range->min_price);
                }
                if ($range->max_price !== null) {
                    $query->where('base_price', '<=', $range->max_price);
                }
            }
        }

        // Color filter
        if ($request->has('colors')) {
            $colors = is_array($request->colors) ? $request->colors : explode(',', $request->colors);
            $query->whereHas('colors', function ($q) use ($colors) {
                $q->whereIn('name', $colors);
            });
        }

        // Filter by type
        if ($request->filter === 'bestsellers') {
            $query->bestsellers();
        } elseif ($request->filter === 'new') {
            $query->newArrivals();
        } elseif ($request->filter === 'featured') {
            $query->featured();
        }

        // Search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'relevance');
        match ($sortBy) {
            'price_low' => $query->orderBy('base_price', 'asc'),
            'price_high' => $query->orderBy('base_price', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            'rating' => $query->orderBy('rating', 'desc'),
            default => $query->orderBy('sold_count', 'desc'),
        };

        $products = $query->paginate(12);

        return Inertia::render('product-catalog/page', [
            'products' => $products,
            'categories' => Category::active()->orderBy('sort_order')->get(),
            'brands' => BrandSetting::where('is_active', true)->get(['id', 'brand_name as name']), // Normalized for frontend
            'priceRanges' => PriceRange::active()->get(['id', 'label', 'min_price', 'max_price']),
            'filters' => (object)$request->only(['category', 'filter', 'search', 'sort', 'currency', 'brands', 'colors', 'priceRange']),
            'selectedCurrency' => $currency,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/product-detail/{product}",
     *     summary="Display single product details",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="product",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product details",
     *         @OA\JsonContent(ref="#/components/schemas/Product")
     *     ),
     *     @OA\Response(response=404, description="Product not found")
     * )
     */
    public function show(Product $product)
    {
        $product->load([
            'category',
            'images',
            'colors',
            'variants',
            'features',
            'approvedReviews.user'
        ]);

        $currency = request()->get('currency', 'NGN');
        // Example rates array (replace with your actual rates source)
        $rates = CurrencyRate::getConversionRates();

        // Convert main product
        $convertedProduct = $this->convertProductToCurrency($product, $currency, $rates);

        // Related products
        $relatedProducts = Product::with(['primaryImage', 'colors'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->active()
            ->inStock()
            ->limit(4)
            ->get();

        // Convert related products
        $convertedRelatedProducts = $relatedProducts->map(function ($related) use ($currency, $rates) {
            return $this->convertProductToCurrency($related, $currency, $rates);
        });

        return Inertia::render('product-detail/page', [
            'product' => $convertedProduct,
            'relatedProducts' => $convertedRelatedProducts,
        ]);
    }

    // Helper to convert product prices to selected currency
    protected function convertProductToCurrency($product, $currency, $rates)
    {
        $baseCurrency = $product->currency ?? 'NGN';
        $rates = $rates ?? CurrencyRate::getConversionRates();
        $rate = $rates[$baseCurrency] ?? 1;
        $targetRate = $rates[$currency] ?? 1;

        // Convert price to USD, then to target currency
        $priceInUSD = $product->base_price / $rate;
        $convertedPrice = $priceInUSD * $targetRate;

        $originalPriceInUSD = $product->original_price ? $product->original_price / $rate : null;
        $convertedOriginalPrice = $originalPriceInUSD ? $originalPriceInUSD * $targetRate : null;

        return array_merge(
            $product->toArray(),
            [
                'price' => round($convertedPrice, 2),
                'originalPrice' => $convertedOriginalPrice ? round($convertedOriginalPrice, 2) : null,
                'currency' => $currency,
            ]
        );
    }
}
