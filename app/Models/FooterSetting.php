<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'company_description',
        'social_links',
        'quick_links',
        'categories',
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
        'categories' => 'array',
        'trust_badges' => 'array',
        'legal_links' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get formatted footer data for frontend
     */
    public function getFormattedData(): array
    {
        return [
            'companyDescription' => $this->company_description,
            'socialLinks' => $this->social_links ?? [],
            'quickLinks' => $this->quick_links ?? [],
            'categories' => $this->categories ?? [],
            'contact' => [
                'address' => $this->contact_address ?? '',
                'phone' => $this->contact_phone ?? '',
                'email' => $this->contact_email ?? '',
            ],
            'trustBadges' => collect($this->trust_badges ?? [])->pluck('name')->toArray(),
            'legalLinks' => $this->legal_links ?? [],
        ];
    }
}
