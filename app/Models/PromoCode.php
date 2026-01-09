<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'type',
        'value',
        'min_order',
        'max_uses',
        'used_count',
        'valid_from',
        'valid_until',
        'is_active',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'min_order' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Check if promo code is valid
     */
    public function isValid(float $orderTotal = 0): array
    {
        if (!$this->is_active) {
            return ['valid' => false, 'message' => 'This promo code is no longer active'];
        }

        // Check date validity
        $now = Carbon::now();
        if ($this->valid_from && $now->lt($this->valid_from)) {
            return ['valid' => false, 'message' => 'This promo code is not yet valid'];
        }

        if ($this->valid_until && $now->gt($this->valid_until)) {
            return ['valid' => false, 'message' => 'This promo code has expired'];
        }

        // Check usage limit
        if ($this->max_uses && $this->used_count >= $this->max_uses) {
            return ['valid' => false, 'message' => 'This promo code has reached its usage limit'];
        }

        // Check minimum order
        if ($orderTotal < $this->min_order) {
            return ['valid' => false, 'message' => "Order must be at least $" . number_format((float)$this->min_order, 2) . " to use this code"];
        }

        return ['valid' => true, 'message' => 'Promo code applied successfully!'];
    }

    /**
     * Scope to get only active promo codes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('valid_from')
                  ->orWhere('valid_from', '<=', Carbon::now());
            })
            ->where(function ($q) {
                $q->whereNull('valid_until')
                  ->orWhere('valid_until', '>=', Carbon::now());
            });
    }
}
