<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with(['event', 'categories', 'merchant'])->get();
        return inertia('admin/products/index', [
            'products' => $products,
        ]);
    }


    public function create()
    {
        $events = \App\Models\Event::all();
        $categories = \App\Models\Category::all();
        $merchants = \App\Models\Merchant::all();
        return inertia('admin/products/create', [
            'events' => $events,
            'categories' => $categories,
            'merchants' => $merchants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:products,name',
            'description' => 'nullable|string',
            'display_image' => 'nullable|string',
            'affiliate_link' => 'nullable|string',
            'enabled' => 'boolean',
            'price' => 'required|integer',
            'event_id' => 'required|exists:events,id',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'merchant_id' => 'required|exists:merchants,id',
        ]);
        
        $validated['created_by'] = $request->user()->id;
        
        // Extract category_ids before creating product
        $categoryIds = $validated['category_ids'];
        unset($validated['category_ids']);
        
        $product = Product::create($validated);
        
        // Attach categories to product
        $product->categories()->attach($categoryIds);
        
        return redirect()->route('admin.products.index');
    }


    public function show(Product $product)
    {
        $product->load(['event', 'categories', 'merchant']);
        return inertia('admin/products/show', [
            'product' => $product,
        ]);
    }


    public function edit(Product $product)
    {
        $events = \App\Models\Event::all();
        $categories = \App\Models\Category::all();
        $merchants = \App\Models\Merchant::all();
        
        // Load product with its categories
        $product->load('categories');
        
        return inertia('admin/products/edit', [
            'product' => $product,
            'events' => $events,
            'categories' => $categories,
            'merchants' => $merchants,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|unique:products,name,' . $product->id,
            'description' => 'nullable|string',
            'display_image' => 'nullable|string',
            'affiliate_link' => 'nullable|string',
            'enabled' => 'boolean',
            'price' => 'required|integer',
            'event_id' => 'required|exists:events,id',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'merchant_id' => 'required|exists:merchants,id',
        ]);
        
        // Extract category_ids before updating product
        $categoryIds = $validated['category_ids'];
        unset($validated['category_ids']);
        
        $product->update($validated);
        
        // Sync categories (this will remove old ones and add new ones)
        $product->categories()->sync($categoryIds);
        
        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}
