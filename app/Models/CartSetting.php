<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_title',
        'page_description',
        'free_shipping_threshold',
        'default_shipping_cost',
        'tax_rate',
        'trust_signals',
        'is_active',
    ];

    protected $casts = [
        'free_shipping_threshold' => 'decimal:2',
        'default_shipping_cost' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'trust_signals' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get formatted cart settings for frontend
     */
    public function getFormattedData(): array
    {
        return [
            'pageTitle' => $this->page_title,
            'pageDescription' => $this->page_description,
            'freeShippingThreshold' => (float) $this->free_shipping_threshold,
            'defaultShippingCost' => (float) $this->default_shipping_cost,
            'taxRate' => (float) $this->tax_rate / 100,
            'trustSignals' => $this->trust_signals ?? [],
        ];
    }
}
