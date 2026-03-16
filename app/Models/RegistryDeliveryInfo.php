<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistryDeliveryInfo extends Model
{
    use HasFactory;

    protected $table = 'registry_delivery_info';

    protected $fillable = [
        'registry_id',
        'photo_url',
        'greeting',
        'receiver_name',
        'phone_number',
        'province',
        'city',
        'district',
        'subdistrict',
        'postal_code',
        'address',
        'notes',
    ];

    /**
     * Get the registry that this delivery info belongs to.
     */
    public function registry(): BelongsTo
    {
        return $this->belongsTo(Registry::class);
    }

    /**
     * Get the full address as a single string.
     */
    public function getFullAddressAttribute(): string
    {
        return collect([
            $this->address,
            $this->subdistrict,
            $this->district,
            $this->city,
            $this->province,
            $this->postal_code,
        ])->filter()->implode(', ');
    }

    /**
     * Check if delivery info is complete.
     */
    public function getIsCompleteAttribute(): bool
    {
        return !empty($this->receiver_name) &&
               !empty($this->phone_number) &&
               !empty($this->province) &&
               !empty($this->city) &&
               !empty($this->district) &&
               !empty($this->subdistrict) &&
               !empty($this->postal_code) &&
               !empty($this->address);
    }
}