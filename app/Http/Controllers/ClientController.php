<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Merchant;
use App\Models\FeaturedMerchant;
use App\Models\FeaturedProduct;
use App\Models\Registry;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get featured products ordered by priority
        $products = Product::whereHas('featuredProduct')
            ->with(['categories', 'merchant', 'featuredProduct'])
            ->where('enabled', true)
            ->get()
            ->sortByDesc(function ($product) {
                return $product->featuredProduct->priority ?? 0;
            })
            ->values();

        // Get featured merchants ordered by priority
        $merchants = Merchant::whereHas('featuredMerchant')
            ->with(['featuredMerchant' => function ($query) {
                $query->orderBy('priority', 'desc');
            }])
            ->get()
            ->sortByDesc(function ($merchant) {
                return $merchant->featuredMerchant->priority ?? 0;
            })
            ->values();

        // Get latest 3 articles for the landing page
        $articles = Article::with('author')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        return inertia('client/landing', [
            'products' => $products,
            'merchants' => $merchants,
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $product = Product::with(['category', 'merchant', 'createdBy'])
            ->where('enabled', true)
            ->findOrFail($id);

        $registryId = $request->query('registry');
        $user = $request->user();

        // Only validate registry ownership if user is authenticated and registry is provided
        if ($user && $registryId) {
            Registry::query()
                ->where('id', $registryId)
                ->where('user_id', $user->id)
                ->firstOrFail();
        }

        // Load existing cart items for this registry (only if user is authenticated)
        $cartItems = [];
        if ($user && $registryId) {
            $cartItems = \App\Models\RegistryGiftCart::where('registry_id', $registryId)
                ->with('product')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'quantity' => $item->quantity,
                        'image' => $item->product->display_image,
                    ];
                });
        }

        return inertia('client/registry/create/show-product', [
            'product' => $product,
            'registryId' => $registryId,
            'initialCartItems' => $cartItems,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function showProduct(Request $request)
    {
        $user = $request->user();
        $registryId = $request->query('registry');

        $categories_params = $request->input(['categories']);
        $brands_params = $request->input(['brands']);
        $search_params = $request->input(['search']);
        $sort_params = $request->input(['sort']);
        // Load existing cart items for this registry (only if user is authenticated)
        $cartItems = [];
        $registry = null;

        $categories = Category::all(['id', 'name']);
        // merchant all but order it from featured merchant first
        $brands = Merchant::select('id', 'name')
            ->selectRaw('EXISTS (
                SELECT 1 FROM featured_merchants 
                WHERE featured_merchants.merchant_id = merchants.id
            ) as is_featured')
            ->orderBy('is_featured', 'desc')
            ->get();

        if ($user && $registryId) {
            $registry = Registry::where('id', $registryId)
                ->where('user_id', $user->id)
                ->with('deliveryInfo')
                ->first();

            $cartItems = \App\Models\RegistryGiftCart::where('registry_id', $registryId)
                ->with('product')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'quantity' => $item->quantity,
                        'image' => $item->product->display_image,
                    ];
                });
        }

        $products = Inertia::scroll(
            fn() => Product::where('enabled', true)
                ->when($categories_params, function ($query, $category) {
                    return $query->whereHas('categories', fn($c) => is_array($category)
                        ? $c->whereIn('categories.id', $category)
                        : $c->where('categories.id', $category)
                    );
                })
                ->when($brands_params, function($query, $brand) {
                    return is_array($brand)
                        ? $query->whereIn('merchant_id', $brand)
                        : $query->where('merchant_id', $brand);
                })
                ->when($search_params, function($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->when($sort_params === 'price_asc', fn($q) => $q->orderBy('price', 'asc'))
                ->paginate(15)
        );

        return inertia('client/registry/create/select-gift', [
            'products' => $products,
            'registryId' => $registryId,
            'initialCartItems' => $cartItems,
            'registry' => $registry,
            'categories' => $categories,
            'brands' => $brands,
            'filter' => [
                'categories' => $categories_params,
                'brands' => $brands_params,
                'search' => $search_params,
                'sort' => $sort_params,
            ]
        ]);
    }
}
