<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        $this->call([
            AdminSeeder::class,
            MerchantSeeder::class,
            EventSeeder::class,
            CategorySeeder::class
        ]);
        
        // Create 50 products and attach random categories
        // Product::factory()->count(50)->create()->each(function ($product) {
        //     // Attach 1-3 random categories to each product
        //     $categoryIds = \App\Models\Category::inRandomOrder()->limit(rand(1, 3))->pluck('id');
        //     $product->categories()->attach($categoryIds);
        // });
    }
}
