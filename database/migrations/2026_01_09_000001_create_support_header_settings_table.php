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
        Schema::create('support_header_settings', function (Blueprint $table) {
            $table->id();
            $table->string('badge_icon')->default('InformationCircleIcon');
            $table->string('badge_text')->default('Help Center');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description');
            $table->string('background_pattern_icon')->default('LifebuoyIcon');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_header_settings');
    }
};
