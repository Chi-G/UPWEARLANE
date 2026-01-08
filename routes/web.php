<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return Inertia::render('landing-page/page');
})->name('home');

// Google OAuth routes
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// Products
Route::get('/product-catalog', [ProductController::class, 'index'])->name('product-catalog');
Route::get('/product-detail', [ProductController::class, 'show'])->name('product-detail');

// Shopping Cart
Route::get('/shopping-cart', function () {
    return Inertia::render('shopping-cart/page');
})->name('shopping-cart');

// Support
Route::get('/support', function () {
    return Inertia::render('customer-support/page');
})->name('support');

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
});

require __DIR__.'/settings.php';
