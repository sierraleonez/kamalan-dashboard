<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->timestamps();

            // Ensure product can't have duplicate categories
            $table->unique(['product_id', 'category_id']);
            
            // Indexes for faster queries
            $table->index('product_id');
            $table->index('category_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_category');
    }
};
