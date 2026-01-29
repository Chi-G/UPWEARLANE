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
        Schema::table('user_devices', function (Blueprint $table) {
            $table->string('browser')->nullable()->after('device_name');
            $table->string('ip_address')->nullable()->after('platform');
            $table->text('user_agent')->nullable()->after('ip_address');
            $table->boolean('is_current')->default(false)->after('user_agent');
            $table->timestamp('last_used_at')->nullable()->after('is_current');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_devices', function (Blueprint $table) {
            //
        });
    }
};
