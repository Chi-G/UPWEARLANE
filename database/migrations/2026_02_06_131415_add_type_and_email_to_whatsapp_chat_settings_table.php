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
            $table->string('type')->default('whatsapp')->after('id'); // whatsapp, phone, email
            $table->string('email')->nullable()->after('phone_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('whatsapp_chat_settings', function (Blueprint $table) {
            $table->dropColumn(['type', 'email']);
        });
    }
};
