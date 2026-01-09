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
        Schema::create('cart_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->default('Your Shopping Cart');
            $table->text('page_description')->nullable();
            $table->decimal('free_shipping_threshold', 10, 2)->default(100.00);
            $table->decimal('default_shipping_cost', 10, 2)->default(15.00);
            $table->decimal('tax_rate', 5, 2)->default(8.00);
            $table->json('trust_signals')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Create promo_codes table
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['percentage', 'fixed', 'shipping'])->default('percentage');
            $table->decimal('value', 10, 2)->default(0);
            $table->decimal('min_order', 10, 2)->default(0);
            $table->integer('max_uses')->nullable();
            $table->integer('used_count')->default(0);
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_codes');
        Schema::dropIfExists('cart_settings');
    }
};
