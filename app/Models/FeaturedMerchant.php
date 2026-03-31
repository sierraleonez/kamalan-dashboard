<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedMerchant extends Model
{
    protected $fillable = [
        'merchant_id',
        'priority',
        'subscription_date_start',
        'subscription_date_end',
    ];

    protected $casts = [
        'subscription_date_start' => 'date',
        'subscription_date_end' => 'date',
        'priority' => 'integer',
    ];

    /**
     * Get the merchant that this featured merchant belongs to.
     */
    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }
}
