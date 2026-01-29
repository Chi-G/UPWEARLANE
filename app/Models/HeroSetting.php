<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'badge',
        'background_image',
        'featured_title',
        'featured_description',
        'featured_product_ids',
        'bestsellers_title',
        'bestsellers_description',
        'bestseller_product_ids',
        'new_arrivals_title',
        'new_arrivals_description',
        'new_arrival_product_ids',
        'search_placeholder',
        'advertisements',
        'is_active',
    ];

    protected $casts = [
        'featured_product_ids' => 'array',
        'bestseller_product_ids' => 'array',
        'new_arrival_product_ids' => 'array',
        'advertisements' => 'array',
        'is_active' => 'boolean',
    ];
}
