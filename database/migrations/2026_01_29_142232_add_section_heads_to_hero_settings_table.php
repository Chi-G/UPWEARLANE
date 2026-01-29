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
            $table->string('featured_title')->nullable()->after('hero_image');
            $table->text('featured_description')->nullable()->after('featured_title');
            
            $table->string('bestsellers_title')->nullable()->after('featured_description');
            $table->text('bestsellers_description')->nullable()->after('bestsellers_title');
            
            $table->string('new_arrivals_title')->nullable()->after('bestsellers_description');
            $table->text('new_arrivals_description')->nullable()->after('new_arrivals_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->dropColumn([
                'featured_title',
                'featured_description',
                'bestsellers_title',
                'bestsellers_description',
                'new_arrivals_title',
                'new_arrivals_description'
            ]);
        });
    }
};
