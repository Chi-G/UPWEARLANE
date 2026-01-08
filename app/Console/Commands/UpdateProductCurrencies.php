<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class UpdateProductCurrencies extends Command
{
    protected $signature = 'products:update-currencies';
    protected $description = 'Update products with currency values';

    public function handle()
    {
        $this->info('Updating products with currencies...');

        $currencies = ['USD', 'GBP', 'CAD', 'NGN'];
        $products = Product::all();
        $count = 0;

        foreach ($products as $product) {
            $currency = $currencies[$product->id % 4];
            $product->update(['currency' => $currency]);
            $count++;
        }

        $this->info("Updated {$count} products with currencies.");
        $this->line("Distribution:");
        
        foreach ($currencies as $currency) {
            $currencyCount = Product::where('currency', $currency)->count();
            $this->line("  {$currency}: {$currencyCount} products");
        }

        return 0;
    }
}
