<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'shopee_link',
        'tokped_link',
        'shop_location',
        'merchant_icon_url'
    ];

    /**
     * Get the products for the merchant.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get the featured merchant record for this merchant.
     */
    public function featuredMerchant()
    {
        return $this->hasOne(FeaturedMerchant::class);
    }
}
