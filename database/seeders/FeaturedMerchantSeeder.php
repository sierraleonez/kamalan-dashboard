<?php

namespace Database\Seeders;

use App\Models\FeaturedMerchant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeaturedMerchantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FeaturedMerchant::create([
            'merchant_id' => '',
            'priority' => ''
        ]);
    }
}
