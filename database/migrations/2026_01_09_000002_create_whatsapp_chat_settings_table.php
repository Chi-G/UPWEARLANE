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
        Schema::create('whatsapp_chat_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('WhatsApp Support');
            $table->text('description');
            $table->string('phone_number');
            $table->json('features');
            $table->string('button_text')->default('Chat on WhatsApp');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_chat_settings');
    }
};
