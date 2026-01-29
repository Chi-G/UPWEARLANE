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
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->json('featured_product_ids')->nullable()->after('featured_description');
            $table->json('bestseller_product_ids')->nullable()->after('bestsellers_description');
            $table->json('new_arrival_product_ids')->nullable()->after('new_arrivals_description');
            $table->string('search_placeholder')->nullable()->after('hero_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->dropColumn([
                'featured_product_ids',
                'bestseller_product_ids',
                'new_arrival_product_ids',
                'search_placeholder'
            ]); 
        });
    }
};
