<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with(['category', 'merchant'])->get();
        return inertia('admin/products/index', [
            'products' => $products,
        ]);
    }


    public function create()
    {
        $categories = \App\Models\Category::all();
        $merchants = \App\Models\Merchant::all();
        return inertia('admin/products/create', [
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
            'category_id' => 'required|exists:categories,id',
            'merchant_id' => 'required|exists:merchants,id',
        ]);
        $validated['created_by'] = $request->user()->id;
        $product = Product::create($validated);
        return redirect()->route('admin.products.index');
    }


    public function show(Product $product)
    {
        $product->load(['category', 'merchant']);
        return inertia('admin/products/show', [
            'product' => $product,
        ]);
    }


    public function edit(Product $product)
    {
        $categories = \App\Models\Category::all();
        $merchants = \App\Models\Merchant::all();
        return inertia('admin/products/edit', [
            'product' => $product,
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
            'category_id' => 'required|exists:categories,id',
            'merchant_id' => 'required|exists:merchants,id',
        ]);
        $product->update($validated);
        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}
