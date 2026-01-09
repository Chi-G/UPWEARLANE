<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportHeaderSetting extends Model
{
    use HasFactory;

    protected $fillable = [ 
        'badge_icon',
        'badge_text',
        'title',
        'subtitle',
        'description',
        'background_pattern_icon',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
