<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Registry extends Model
{
    use HasFactory;

    protected $table = 'registry';

    protected $fillable = [
        'name',
        'date',
        'event_id',
        'user_id',
        'magic_link',
        'last_step',
    ];

    protected $casts = [
        'date' => 'datetime',
        'last_step' => 'integer',
    ];

    protected $appends = [
        'formatted_date',
    ];

    /**
     * Get the user that owns the registry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the event of the registry.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the delivery info for the registry.
     */
    public function deliveryInfo(): HasOne
    {
        return $this->hasOne(RegistryDeliveryInfo::class);
    }

    /**
     * Get the gift cart items for the registry.
     */
    public function giftCart(): HasMany
    {
        return $this->hasMany(RegistryGiftCart::class);
    }

    /**
     * Get the products in the registry through the gift cart.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'registry_gift_cart')
                    ->withPivot('id', 'quantity')
                    ->withTimestamps();
    }

    /**
     * Get the wishlist reservations for the registry.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(RegistryWishlistReservation::class);
    }

    /**
     * Generate a unique magic link for the registry.
     */
    public static function generateMagicLink(): string
    {
        do {
            $link = Str::random(32);
        } while (static::where('magic_link', $link)->exists());

        return $link;
    }

    /**
     * Get the public URL for this registry.
     */
    public function getPublicUrlAttribute(): string
    {
        return route('registry.public', $this->magic_link);
    }

    /**
     * Get formatted date (09 March 2026).
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->date ? $this->date->format('d F Y') : '';
    }

    protected static function booted()
    {
        static::creating(function ($registry) {
            $suffix = Str::lower(Str::random(6));
            $slugName = Str::slug($registry->name);
            $date = $registry->date->format('Y-m-d');

            $registry->magic_link = "{$slugName}-$date-$suffix";
        });
    }
}