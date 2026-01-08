<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'name', 'slug', 'description', 'short_description',
        'base_price', 'original_price', 'discount_percentage', 'sku',
        'stock_quantity', 'is_new', 'is_featured', 'is_bestseller',
        'rating', 'review_count', 'sold_count', 'launch_date',
        'is_pre_order', 'is_active', 'meta_title', 'meta_description',
        'brand', 'specifications'
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'rating' => 'decimal:2',
        'launch_date' => 'date',
        'is_new' => 'boolean',
        'is_featured' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_pre_order' => 'boolean',
        'is_active' => 'boolean',
        'specifications' => 'array',
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    public function colors()
    {
        return $this->hasMany(ProductColor::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function features()
    {
        return $this->hasMany(ProductFeature::class)->orderBy('sort_order');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function approvedReviews()
    {
        return $this->hasMany(Review::class)->where('is_approved', true);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeBestsellers($query)
    {
        return $query->where('is_bestseller', true);
    }

    public function scopeNewArrivals($query)
    {
        return $query->where('is_new', true);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }

    // Mutators
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    // Accessors
    public function getDiscountedPriceAttribute()
    {
        if ($this->discount_percentage && $this->original_price) {
            return $this->original_price * (1 - $this->discount_percentage / 100);
        }
        return $this->base_price;
    }

    public function getIsInStockAttribute()
    {
        return $this->stock_quantity > 0;
    }
}
