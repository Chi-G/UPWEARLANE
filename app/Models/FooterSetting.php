<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'company_description',
        'social_links',
        'quick_links',
        'contact_address',
        'contact_phone',
        'contact_email',
        'trust_badges',
        'legal_links',
        'is_active',
    ];

    protected $casts = [
        'social_links' => 'array',
        'quick_links' => 'array',
        'trust_badges' => 'array',
        'legal_links' => 'array',
        'is_active' => 'boolean',
    ];
}
