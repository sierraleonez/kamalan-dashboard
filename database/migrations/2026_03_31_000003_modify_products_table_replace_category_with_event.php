<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Add event_id column
            $table->foreignId('event_id')->nullable()->after('price')->constrained('events')->onDelete('cascade');
            
            // Drop category_id foreign key and column
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Re-add category_id column
            $table->foreignId('category_id')->after('price')->constrained('categories')->onDelete('cascade');
            
            // Drop event_id foreign key and column
            $table->dropForeign(['event_id']);
            $table->dropColumn('event_id');
        });
    }
};
