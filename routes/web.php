<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing-page/page');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
}); 

Route::get('/support', function () {
    return Inertia::render('customer-support/page'); 
})->name('support');

Route::get('/product-catalog', function () {
    return Inertia::render('product-catalog/page'); 
})->name('product-catalog');

Route::get('/product-detail', function () {
    return Inertia::render('product-detail/page');
})->name('product-detail');

Route::get('/shopping-cart', function () {
    return Inertia::render('shopping-cart/page');
})->name('shopping-cart');

Route::get('/checkout-flow', function () {
    return Inertia::render('checkout-flow/page');
})->name('checkout');

require __DIR__.'/settings.php';
 