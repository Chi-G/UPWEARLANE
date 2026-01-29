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
            $table->json('advertisements')->nullable();
            $table->json('promotional_deals')->nullable();
            $table->string('newsletter_title')->nullable()->default('Join the Revolution');
            $table->text('newsletter_description')->nullable();
            $table->json('newsletter_benefits')->nullable();
            $table->string('newsletter_subscriber_count')->nullable()->default('50,000');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->dropColumn([
                'advertisements',
                'promotional_deals',
                'newsletter_title',
                'newsletter_description',
                'newsletter_benefits',
                'newsletter_subscriber_count'
            ]);
        });
    }
};
