<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(1),
            'display_image' => fake()->imageUrl(640, 480, 'products'),
            'affiliate_link' => fake()->url(),
            'enabled' => fake()->boolean(80), // 80% chance of being enabled
            'price' => fake()->numberBetween(10000, 1000000), // Price in IDR
            'event_id' => fake()->numberBetween(1, 6), // Random event (1-6)
            'merchant_id' => 2,
            'created_by' => 1,
        ];
    }
}
