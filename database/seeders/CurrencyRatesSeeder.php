<?php

namespace Database\Seeders;

use App\Models\CurrencyRate;
use Illuminate\Database\Seeder;

class CurrencyRatesSeeder extends Seeder
{
    public function run(): void
    {
        $currencies = [
            [
                'code' => 'USD',
                'name' => 'US Dollar',
                'symbol' => '$',
                'rate' => 1.0000,
                'is_active' => true,
                'last_updated' => now(),
            ],
            [
                'code' => 'GBP',
                'name' => 'British Pound',
                'symbol' => '£',
                'rate' => 0.7900,
                'is_active' => true,
                'last_updated' => now(),
            ],
            [
                'code' => 'CAD',
                'name' => 'Canadian Dollar',
                'symbol' => 'C$',
                'rate' => 1.3600,
                'is_active' => true,
                'last_updated' => now(),
            ],
            [
                'code' => 'NGN',
                'name' => 'Nigerian Naira',
                'symbol' => '₦',
                'rate' => 1650.0000,
                'is_active' => true,
                'last_updated' => now(),
            ],
        ];

        foreach ($currencies as $currency) {
            CurrencyRate::updateOrCreate(
                ['code' => $currency['code']],
                $currency
            );
        }
    }
}
