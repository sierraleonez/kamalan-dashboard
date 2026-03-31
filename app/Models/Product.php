<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'display_image',
        'affiliate_link',
        'enabled',
        'price',
        'event_id',
        'merchant_id',
        'created_by'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'formatted_price'
    ];

    /**
     * Get the event that the product belongs to.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the categories that the product belongs to (many-to-many).
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_category')
                    ->withTimestamps();
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get formatted price in Indonesian Rupiah format
     *
     * @return string
     */
    public function getFormattedPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    /**
     * Cast attributes to appropriate data types
     *
     * @var array
     */
    protected $casts = [
        'price' => 'integer',
        'enabled' => 'boolean',
    ];

    /**
     * Get the gift cart items for this product.
     */
    public function giftCartItems()
    {
        return $this->hasMany(RegistryGiftCart::class);
    }

    /**
     * Get the registries that have this product through gift cart.
     */
    public function registries()
    {
        return $this->belongsToMany(Registry::class, 'registry_gift_cart')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }
}
