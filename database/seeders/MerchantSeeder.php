<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Merchant;

class MerchantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Merchant::create([
            'name' => 'Default Store',
            'shopee_link' => 'https://shopee.co.id/defaultstore',
            'tokped_link' => 'https://tokopedia.com/defaultstore',
            'shop_location' => 'Jakarta, Indonesia'
        ]);

        Merchant::create([
            'name' => 'Hamper Central',
            'shopee_link' => 'https://shopee.co.id/hampercentral',
            'tokped_link' => 'https://tokopedia.com/hampercentral',
            'shop_location' => 'Surabaya, Indonesia'
        ]);
    }
}
