<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with('category')->get();
        return inertia('products/index', [
            'products' => $products,
        ]);
    }


    public function create()
    {
        $categories = \App\Models\Category::all();
        return inertia('products/create', [
            'categories' => $categories,
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
        ]);
        $validated['created_by'] = $request->user()->id;
        $product = Product::create($validated);
        return redirect()->route('products.index');
    }


    public function show(Product $product)
    {
        $product->load('category');
        return inertia('products/show', [
            'product' => $product,
        ]);
    }


    public function edit(Product $product)
    {
        $categories = \App\Models\Category::all();
        return inertia('products/edit', [
            'product' => $product,
            'categories' => $categories,
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
        ]);
        $product->update($validated);
        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
