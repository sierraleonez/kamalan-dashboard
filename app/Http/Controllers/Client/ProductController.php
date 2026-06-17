<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Merchant;
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
        $categories_params = $request->input('categories');
        $brands_params = $request->input('brands');
        $search_params = $request->input('search');
        $sort_params = $request->input('sort');

        if ($registry_id) {
            $registry = Registry::with('deliveryInfo')->find($registry_id);
        }

        return Inertia::render('client/product/index', [
            'products' => Inertia::scroll(
                fn() => Product::where('enabled', true)
                    ->when($categories_params, fn($q, $v) => $q->whereHas('categories', fn($c) => $c->whereIn('categories.id', (array) $v)))
                    ->when($brands_params, fn($q, $v) => is_array($v) ? $q->whereIn('merchant_id', $v) : $q->where('merchant_id', $v))
                    ->when($search_params, fn($q, $v) => $q->where('name', 'like', "%{$v}%"))
                    ->when($sort_params === 'price_asc', fn($q) => $q->orderBy('price', 'asc'))
                    ->when($sort_params === 'price_desc', fn($q) => $q->orderBy('price', 'desc'))
                    ->paginate(15)
            ),
            'registry' => $registry,
            'categories' => Category::all(['id', 'name']),
            'brands' => Merchant::all(['id', 'name']),
            'filter' => [
                'categories' => $categories_params,
                'brands' => $brands_params,
                'search' => $search_params,
                'sort' => $sort_params,
            ],
        ]);
    }

    public function show(Product $product, Request $request)
    {
        $registry_id = $request->registry_id;
        $registry = null;

        if ($registry_id) {
            $registry = Registry::with(['deliveryInfo', 'products'])->find($registry_id);
        }
        
        $product->load(['event', 'categories', 'merchant', 'productImages']);
        return Inertia::render('client/product/show', [
            'product' => $product,
            'registry' => $registry
        ]);
    }
}
