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
        Schema::table('addresses', function (Blueprint $table) {
            // Make user_id nullable for guest checkout
            $table->foreignId('user_id')->nullable()->change();

            // Add email field for guest checkout
            $table->string('email')->nullable()->after('full_name');
        });

        Schema::table('orders', function (Blueprint $table) {
            // Make user_id nullable for guest checkout
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            // Revert user_id back to not nullable
            $table->foreignId('user_id')->nullable(false)->change();

            // Remove email field
            $table->dropColumn('email');
        });

        Schema::table('orders', function (Blueprint $table) {
            // Revert user_id back to not nullable
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
