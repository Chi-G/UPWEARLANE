<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatbotSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'bot_name',
        'bot_subtitle',
        'welcome_message',
        'default_response',
        'header_icon',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
