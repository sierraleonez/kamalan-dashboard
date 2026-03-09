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
        Schema::create('registry_gift_cart', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('registry_id')->constrained('registry')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
            
            // Composite unique key to prevent duplicate product-registry combinations
            $table->unique(['product_id', 'registry_id']);
            
            $table->index(['registry_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registry_gift_cart');
    }
};