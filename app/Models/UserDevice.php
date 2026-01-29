<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDevice extends Model
{
    protected $fillable = [
        'user_id',
        'device_name',
        'browser',
        'device_id',
        'platform',
        'ip_address',
        'user_agent',
        'is_current',
        'last_used_at',
        'last_active_at',
    ];

    protected $casts = [
        'last_used_at' => 'datetime',
        'last_active_at' => 'datetime',
        'is_current' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
