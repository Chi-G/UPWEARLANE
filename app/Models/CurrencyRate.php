<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'symbol',
        'rate',
        'is_active', 
        'last_updated',
    ];

    protected $casts = [
        'rate' => 'decimal:4',
        'is_active' => 'boolean',
        'last_updated' => 'datetime',
    ];

    /**
     * Get active currency rates formatted for frontend
     */
    public static function getActiveRates(): array
    {
        return self::where('is_active', true)
            ->get()
            ->mapWithKeys(function ($currency) {
                return [
                    $currency->code => [
                        'code' => $currency->code,
                        'name' => $currency->name,
                        'symbol' => $currency->symbol,
                        'rate' => (float) $currency->rate,
                    ]
                ];
            })
            ->toArray();
    }

    /**
     * Get conversion rates only (code => rate)
     */
    public static function getConversionRates(): array
    {
        return self::where('is_active', true)
            ->pluck('rate', 'code')
            ->map(fn($rate) => (float) $rate)
            ->toArray();
    }
}
