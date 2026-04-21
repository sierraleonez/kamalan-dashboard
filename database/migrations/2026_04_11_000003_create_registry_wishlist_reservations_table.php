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
        Schema::create('registry_wishlist_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registry_id')->constrained('registry')->onDelete('cascade');
            $table->foreignId('registry_gift_cart_id')->constrained('registry_gift_cart')->onDelete('cascade');
            $table->string('name');
            $table->boolean('is_anonymous')->default(false);
            $table->text('greeting')->nullable();
            $table->timestamps();

            // Ensure one reservation per cart item
            $table->unique('registry_gift_cart_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registry_wishlist_reservations');
    }
};
