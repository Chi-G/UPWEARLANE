<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\CustomerSupportController;
use App\Http\Controllers\ShoppingCartController;

Route::get('/', [LandingPageController::class, 'index'])->name('home');

// Google OAuth routes
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// Products
Route::get('/product-catalog', [ProductController::class, 'index'])->name('product-catalog');
Route::get('/product-detail/{product}', [ProductController::class, 'show'])->name('product-detail');
// Redirect old URL format to new format
Route::get('/product-detail', function (\Illuminate\Http\Request $request) {
    if ($request->has('id')) {
        return redirect("/product-detail/{$request->id}");
    }
    return redirect('/product-catalog');
});

// Shopping Cart
Route::get('/shopping-cart', [ShoppingCartController::class, 'index'])->name('shopping-cart');
Route::post('/shopping-cart/validate-promo', [ShoppingCartController::class, 'validatePromoCode'])->name('shopping-cart.validate-promo');

// Support
Route::get('/support', [CustomerSupportController::class, 'index'])->name('support');

// Checkout
Route::get('/checkout-flow', function () {
    return Inertia::render('checkout-flow/page');
})->name('checkout');

// Orders (Public for Guest Checkout)
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

// Payments
Route::post('/payments/create-intent', [PaymentController::class, 'createPaymentIntent'])->name('payments.create-intent');
Route::post('/payments/confirm', [PaymentController::class, 'confirmPayment'])->name('payments.confirm');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // User Order History
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::post('/reviews/{review}/helpful', [ReviewController::class, 'markHelpful'])->name('reviews.helpful');
});

require __DIR__.'/settings.php';
