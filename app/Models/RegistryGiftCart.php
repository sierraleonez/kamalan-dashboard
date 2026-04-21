<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RegistryGiftCart extends Model
{
    use HasFactory;

    protected $table = 'registry_gift_cart';

    protected $fillable = [
        'product_id',
        'registry_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    /**
     * Get the registry that this gift cart item belongs to.
     */
    public function registry(): BelongsTo
    {
        return $this->belongsTo(Registry::class);
    }

    /**
     * Get the product in this gift cart item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the reservation for this gift cart item.
     */
    public function reservation(): HasOne
    {
        return $this->hasOne(RegistryWishlistReservation::class, 'registry_gift_cart_id');
    }

    /**
     * Get the total price for this gift cart item.
     */
    public function getTotalPriceAttribute(): float
    {
        return $this->product->price * $this->quantity;
    }

    /**
     * Ensure quantity is always greater than 0.
     */
    public function setQuantityAttribute($value)
    {
        $this->attributes['quantity'] = max(1, (int) $value);
    }
}