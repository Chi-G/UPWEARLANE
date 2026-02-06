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
        Schema::table('chatbot_settings', function (Blueprint $table) {
            $table->string('header')->nullable()->after('id');
            $table->text('description')->nullable()->after('header');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chatbot_settings', function (Blueprint $table) {
            $table->dropColumn(['header', 'description']);
        });
    }
};
