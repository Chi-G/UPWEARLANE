<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Check and add 'stock_quantity'
            if (!Schema::hasColumn('products', 'stock_quantity')) {
                $table->integer('stock_quantity')->default(0);
            }

            // Check and add 'sku'
            if (!Schema::hasColumn('products', 'sku')) {
                $table->string('sku')->nullable()->unique();
            }

            // Check and add 'original_price'
            if (!Schema::hasColumn('products', 'original_price')) {
                $table->decimal('original_price', 10, 2)->nullable();
            }

            // Check and add 'discount_percentage'
            if (!Schema::hasColumn('products', 'discount_percentage')) {
                $table->integer('discount_percentage')->nullable();
            }

            // Check and add 'is_new'
            if (!Schema::hasColumn('products', 'is_new')) {
                $table->boolean('is_new')->default(false);
                $table->index('is_new');
            }

            // Check and add 'is_featured'
            if (!Schema::hasColumn('products', 'is_featured')) {
                $table->boolean('is_featured')->default(false);
                $table->index('is_featured');
            }

            // Check and add 'is_bestseller'
            if (!Schema::hasColumn('products', 'is_bestseller')) {
                $table->boolean('is_bestseller')->default(false);
                $table->index('is_bestseller');
            }

            // Check and add 'rating'
            if (!Schema::hasColumn('products', 'rating')) {
                $table->decimal('rating', 3, 2)->default(0);
            }

            // Check and add 'review_count'
            if (!Schema::hasColumn('products', 'review_count')) {
                $table->integer('review_count')->default(0);
            }

            // Check and add 'sold_count'
            if (!Schema::hasColumn('products', 'sold_count')) {
                $table->integer('sold_count')->default(0);
            }

             // Check and add 'launch_date'
             if (!Schema::hasColumn('products', 'launch_date')) {
                $table->date('launch_date')->nullable();
            }

             // Check and add 'is_pre_order'
             if (!Schema::hasColumn('products', 'is_pre_order')) {
                $table->boolean('is_pre_order')->default(false);
            }

            // Check and add 'brand'
            if (!Schema::hasColumn('products', 'brand')) {
                $table->string('brand')->nullable();
            }

            // Check and add 'specifications'
            if (!Schema::hasColumn('products', 'specifications')) {
                $table->json('specifications')->nullable();
            }

            // Check and add 'meta_title'
            if (!Schema::hasColumn('products', 'meta_title')) {
                $table->string('meta_title')->nullable();
            }

            // Check and add 'meta_description'
            if (!Schema::hasColumn('products', 'meta_description')) {
                $table->text('meta_description')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We won't strictly remove them in down() to avoid accidental data loss 
        // if this migration is rolled back but the columns were actually original.
        // This is a "fixer" migration.
    }
};
