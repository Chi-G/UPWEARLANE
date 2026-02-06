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
        Schema::table('whatsapp_chat_settings', function (Blueprint $table) {
            $table->string('phone_number')->nullable()->change();
            $table->json('features')->nullable()->change();
            $table->string('button_text')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('whatsapp_chat_settings', function (Blueprint $table) {
            $table->string('phone_number')->nullable(false)->change();
            $table->json('features')->nullable(false)->change();
            $table->string('button_text')->nullable(false)->change();
        });
    }
};
