<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a new review
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'comment' => 'required|string|max:2000',
        ]);

        // Check if user already reviewed this product
        $existingReview = Review::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingReview) {
            return back()->withErrors(['review' => 'You have already reviewed this product.']);
        }

        // Check if user has purchased this product (for verified purchase badge)
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $hasPurchased = $user->orders()
            ->whereHas('items', function ($query) use ($validated) {
                $query->where('product_id', $validated['product_id']);
            })
            ->where('status', 'completed')
            ->exists();

        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'title' => $validated['title'],
            'comment' => $validated['comment'],
            'is_verified_purchase' => $hasPurchased,
            'is_approved' => true, // Auto-approve for now, can add moderation later
            'helpful_count' => 0,
        ]);

        // Update product rating
        $this->updateProductRating($validated['product_id']);

        return back()->with('success', 'Thank you for your review!');
    }

    /**
     * Mark a review as helpful
     */
    public function markHelpful(Review $review)
    {
        $review->increment('helpful_count');
        
        return response()->json([
            'success' => true,
            'helpful_count' => $review->helpful_count,
        ]);
    }

    /**
     * Update the product's average rating
     */
    private function updateProductRating(int $productId)
    {
        $product = Product::find($productId);
        
        $avgRating = Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->avg('rating');
        
        $reviewCount = Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->count();

        $product->update([
            'rating' => round($avgRating, 2),
            'review_count' => $reviewCount,
        ]);
    }
} 
