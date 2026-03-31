<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Registry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $registry_id = $request->registry_id;
        $registry = null;

        if ($registry_id) {
            $registry = Registry::with('deliveryInfo')->find($registry_id);
        }

        return Inertia::render('client/product/index', [
            'products' => Inertia::scroll(fn() => Product::where('enabled', true)->paginate(15)),
            'registry' => $registry
        ]);
    }

    public function show(Product $product, Request $request)
    {
        $registry_id = $request->registry_id;
        $registry = null;

        if ($registry_id) {
            $registry = Registry::with(['deliveryInfo', 'products'])->find($registry_id);
        }
        
        $product->load(['event', 'categories', 'merchant']);
        return Inertia::render('client/product/show', [
            'product' => $product,
            'registry' => $registry
        ]);
    }
}
