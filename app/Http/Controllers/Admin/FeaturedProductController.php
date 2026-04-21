<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedProduct;
use App\Models\Product;
use Illuminate\Http\Request;

class FeaturedProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $featuredProducts = FeaturedProduct::with('product')->orderBy('priority', 'desc')->get();
        return inertia('admin/featured-products/index', [
            'featuredProducts' => $featuredProducts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get products that are not already featured
        $featuredProductIds = FeaturedProduct::pluck('product_id')->toArray();
        $availableProducts = Product::whereNotIn('id', $featuredProductIds)->get();

        return inertia('admin/featured-products/create', [
            'products' => $availableProducts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id|unique:featured_products,product_id',
            'priority' => 'required|integer|min:0',
        ]);

        FeaturedProduct::create($validated);
        return redirect()->route('admin.featured-products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeaturedProduct $featuredProduct)
    {
        $featuredProduct->load('product');
        return inertia('admin/featured-products/show', [
            'featuredProduct' => $featuredProduct,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeaturedProduct $featuredProduct)
    {
        $featuredProduct->load('product');
        
        // Get products that are not already featured (excluding current product)
        $featuredProductIds = FeaturedProduct::where('id', '!=', $featuredProduct->id)
            ->pluck('product_id')
            ->toArray();
        $availableProducts = Product::whereNotIn('id', $featuredProductIds)->get();

        return inertia('admin/featured-products/edit', [
            'featuredProduct' => $featuredProduct,
            'products' => $availableProducts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeaturedProduct $featuredProduct)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id|unique:featured_products,product_id,' . $featuredProduct->id,
            'priority' => 'required|integer|min:0',
        ]);

        $featuredProduct->update($validated);
        return redirect()->route('admin.featured-products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeaturedProduct $featuredProduct)
    {
        $featuredProduct->delete();
        return redirect()->route('admin.featured-products.index');
    }
}
