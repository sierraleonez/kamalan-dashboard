<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            'Wedding Ceremony',
            'Birthday Celebration',
            'Baby Shower',
            'Anniversary Party',
            'Graduation',
            'Eid Celebration',
        ];

        $faker = \Faker\Factory::create();

        foreach ($events as $eventName) {
            Event::create([
                'name' => $eventName,
                'description' => $faker->sentence(10),
                'background_image' => $faker->imageUrl(1200, 600, 'event', true),
                'icon' => $faker->imageUrl(100, 100, 'event', true),
                'created_by' => 1,
            ]);
        }
    }
}
