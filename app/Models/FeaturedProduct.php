<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedProduct extends Model
{
    protected $fillable = [
        'product_id',
        'priority',
    ];

    protected $casts = [
        'priority' => 'integer',
    ];

    /**
     * Get the product that this featured product belongs to.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
