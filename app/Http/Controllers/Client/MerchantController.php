<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantController extends Controller
{
    /**
     * Display the specified merchant with their products.
     */
    public function show(Merchant $merchant)
    {
        // Get paginated products for this merchant
        $products = Inertia::scroll(fn() => Product::where('merchant_id', $merchant->id)
            ->where('enabled', true)
            ->with(['categories', 'merchant'])
            ->paginate(15));

        return Inertia::render('client/merchant/show', [
            'merchant' => $merchant,
            'products' => $products,
        ]);
    }
}
