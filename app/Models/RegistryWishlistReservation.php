<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistryWishlistReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'registry_id',
        'registry_gift_cart_id',
        'name',
        'is_anonymous',
        'greeting',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
    ];

    /**
     * Get the registry this reservation belongs to.
     */
    public function registry(): BelongsTo
    {
        return $this->belongsTo(Registry::class);
    }

    /**
     * Get the gift cart item this reservation is for.
     */
    public function giftCartItem(): BelongsTo
    {
        return $this->belongsTo(RegistryGiftCart::class, 'registry_gift_cart_id');
    }

    /**
     * Get the display name for the reservation.
     * Returns "Anonymous" if is_anonymous is true, otherwise returns the actual name.
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->is_anonymous ? 'Anonymous' : $this->name;
    }
}
