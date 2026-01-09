<?php

namespace Database\Seeders;

use App\Models\CartSetting;
use App\Models\PromoCode;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CartSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Cart Settings
        CartSetting::updateOrCreate(
            ['id' => 1],
            [
                'page_title' => 'Your Shopping Cart',
                'page_description' => 'Review your selected items and proceed to checkout. Free shipping on orders over $100.',
                'free_shipping_threshold' => 100.00,
                'default_shipping_cost' => 15.00,
                'tax_rate' => 8.00,
                'trust_signals' => [
                    [
                        'icon' => 'ShieldCheckIcon',
                        'text' => 'Secure checkout with SSL encryption',
                        'color' => 'text-success'
                    ],
                    [
                        'icon' => 'TruckIcon',
                        'text' => 'Free shipping on orders over $100',
                        'color' => 'text-primary'
                    ],
                    [
                        'icon' => 'ArrowPathIcon',
                        'text' => '30-day return policy',
                        'color' => 'text-primary'
                    ],
                ],
                'is_active' => true,
            ]
        );

        // Create Promo Codes
        $promoCodes = [
            [
                'code' => 'SAVE10',
                'description' => '10% off your entire order',
                'type' => 'percentage',
                'value' => 10.00,
                'min_order' => 0.00,
                'max_uses' => null,
                'used_count' => 0,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addMonths(6),
                'is_active' => true,
            ],
            [
                'code' => 'TECH20',
                'description' => '$20 off orders over $100',
                'type' => 'fixed',
                'value' => 20.00,
                'min_order' => 100.00,
                'max_uses' => 1000,
                'used_count' => 0,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addMonths(3),
                'is_active' => true,
            ],
            [
                'code' => 'FREESHIP',
                'description' => 'Free shipping on all orders',
                'type' => 'shipping',
                'value' => 0.00,
                'min_order' => 0.00,
                'max_uses' => null,
                'used_count' => 0,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addMonths(6),
                'is_active' => true,
            ],
            [
                'code' => 'WELCOME15',
                'description' => '15% off for new customers',
                'type' => 'percentage',
                'value' => 15.00,
                'min_order' => 50.00,
                'max_uses' => 500,
                'used_count' => 0,
                'valid_from' => Carbon::now(),
                'valid_until' => Carbon::now()->addYear(),
                'is_active' => true,
            ],
        ];

        foreach ($promoCodes as $promoData) {
            PromoCode::updateOrCreate(
                ['code' => $promoData['code']],
                $promoData
            );
        }

        $this->command->info('Cart settings and promo codes seeded successfully!');
    }
}
