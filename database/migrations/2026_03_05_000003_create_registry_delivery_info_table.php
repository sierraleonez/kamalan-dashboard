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
        Schema::create('registry_delivery_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registry_id')->constrained('registry')->onDelete('cascade');
            $table->string('photo_url')->nullable();
            $table->text('greeting')->nullable();
            $table->string('receiver_name');
            $table->string('phone_number');
            $table->string('province');
            $table->string('city');
            $table->string('district');
            $table->string('subdistrict');
            $table->string('postal_code');
            $table->text('address');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('registry_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registry_delivery_info');
    }
};