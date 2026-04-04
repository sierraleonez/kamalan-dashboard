<?php

namespace Database\Seeders;

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
            'name' => 'Dr. Browns',
            'shopee_link' => 'https://shopee.co.id/hampercentral',
            'tokped_link' => 'https://tokopedia.com/hampercentral',
            'shop_location' => 'Surabaya, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/1.png'
        ]);

        Merchant::create([
            'name' => 'Mooimom Indonesia',
            'shopee_link' => 'https://shopee.co.id/mooimom',
            'tokped_link' => 'https://tokopedia.com/mooimom',
            'shop_location' => 'Jakarta, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/2.png'
        ]);

        Merchant::create([
            'name' => 'Natural Moms',
            'shopee_link' => 'https://shopee.co.id/naturalmoms',
            'tokped_link' => 'https://tokopedia.com/naturalmoms',
            'shop_location' => 'Bandung, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/3.png'
        ]);

        Merchant::create([
            'name' => 'Cocolatte Indonesia',
            'shopee_link' => 'https://shopee.co.id/cocolatte',
            'tokped_link' => 'https://tokopedia.com/cocolatte',
            'shop_location' => 'Jakarta, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/4.png'
        ]);

        Merchant::create([
            'name' => 'Chicco',
            'shopee_link' => 'https://shopee.co.id/chicco',
            'tokped_link' => 'https://tokopedia.com/chicco',
            'shop_location' => 'Jakarta, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/5.png'
        ]);

        Merchant::create([
            'name' => 'Baby Safe Indonesia',
            'shopee_link' => 'https://shopee.co.id/babysafe',
            'tokped_link' => 'https://tokopedia.com/babysafe',
            'shop_location' => 'Surabaya, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/6.png'
        ]);

        Merchant::create([
            'name' => 'Sugar Baby',
            'shopee_link' => 'https://shopee.co.id/sugarbaby',
            'tokped_link' => 'https://tokopedia.com/sugarbaby',
            'shop_location' => 'Tangerang, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/7.png'
        ]);

        Merchant::create([
            'name' => 'Boonaboo Indonesia',
            'shopee_link' => 'https://shopee.co.id/boonaboo',
            'tokped_link' => 'https://tokopedia.com/boonaboo',
            'shop_location' => 'Jakarta, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/8.png'
        ]);

        Merchant::create([
            'name' => 'Fox and Bunny',
            'shopee_link' => 'https://shopee.co.id/foxandbunny',
            'tokped_link' => 'https://tokopedia.com/foxandbunny',
            'shop_location' => 'Yogyakarta, Indonesia',
            'merchant_icon_url' => '/images/brand-logo/9.png'
        ]);
    }
}
