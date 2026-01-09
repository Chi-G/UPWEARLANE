<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsAppChatSetting extends Model
{
    use HasFactory;

    protected $table = 'whatsapp_chat_settings';

    protected $fillable = [
        'title',
        'description',
        'phone_number',
        'features',
        'button_text',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
    ];
}
