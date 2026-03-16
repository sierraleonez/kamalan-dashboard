<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Baby Shower',
            'Wedding',
            'Birthday Party',
            'Eid Fitri',
        ];

        $faker = \Faker\Factory::create();

        foreach ($categories as $categoryName) {
            Category::create([
                'name' => $categoryName,
                'description' => $faker->sentence(10),
                'background_image' => $faker->imageUrl(1200, 600, 'abstract', true),
                'icon' => $faker->imageUrl(100, 100, 'abstract', true),
                'created_by' => 1,
            ]);
        }
    }
}
