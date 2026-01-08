<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display product catalog with filters
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'primaryImage', 'colors'])
            ->active()
            ->inStock();

        // Category filter
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
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
            'filters' => $request->only(['category', 'filter', 'search', 'sort']),
        ]);
    }

    /**
     * Display single product details
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

        // Related products
        $relatedProducts = Product::with(['primaryImage', 'colors'])
            ->where('category_id', $product->category_id) 
            ->where('id', '!=', $product->id)
            ->active()
            ->inStock()
            ->limit(4)
            ->get();

        return Inertia::render('product-detail/page', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
