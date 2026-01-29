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
            $table->foreignId('brand_setting_id')
                ->nullable()
                ->after('category_id')
                ->constrained('brand_settings')
                ->onDelete('set null');
            
            $table->index('brand_setting_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['brand_setting_id']);
            $table->dropColumn('brand_setting_id');
        });
    }
};
