<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('client/landing');
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
        
        // Load existing cart items for this registry
        $cartItems = [];
        if ($registryId) {
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

        return inertia('client/create-registry/show-product', [
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

    public function showProduct(Request $request) {
        $registryId = $request->query('registry');
        
        // Load existing cart items for this registry
        $cartItems = [];
        if ($registryId) {
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

        return inertia('client/create-registry/select-gift', [
            'products' => Inertia::scroll(fn () => Product::where('enabled', true)->paginate(15)),
            'registryId' => $registryId,
            'initialCartItems' => $cartItems,
        ]);
    }
}
