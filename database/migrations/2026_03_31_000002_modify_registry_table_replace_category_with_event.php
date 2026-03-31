<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registry', function (Blueprint $table) {
            // Add event_id column
            $table->foreignId('event_id')->nullable()->after('date')->constrained('events')->onDelete('cascade');
            
            // Drop category_id foreign key and column
            $table->dropForeign(['category_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn('category_id');
            $table->dropIndex(['user_id', 'category_id']);
            
            // Update indexes
            $table->index(['user_id', 'event_id']);
        });
    }

    public function down(): void
    {
        Schema::table('registry', function (Blueprint $table) {
            // Re-add category_id column
            $table->foreignId('category_id')->after('date')->constrained('categories')->onDelete('cascade');
            
            // Drop event_id foreign key and column
            $table->dropForeign(['event_id']);
            $table->dropColumn('event_id');
            
            // Restore old indexes
            $table->dropIndex(['user_id', 'event_id']);
            $table->index(['user_id', 'category_id']);
        });
    }
};
