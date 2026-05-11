<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $query = Product::with(['event', 'categories', 'merchant']);

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        return inertia('admin/products/index', [
            'products' => $query->get(),
            'filters'  => ['search' => $request->input('search', '')],
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
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'string',
        ]);
        
        $validated['created_by'] = $request->user()->id;
        $categoryIds = $validated['category_ids'];
        $imageUrls = $validated['image_urls'] ?? [];
        unset($validated['category_ids'], $validated['image_urls']);
        
        DB::transaction(function () use ($validated, $categoryIds, $imageUrls) {
            $product = Product::create($validated);
            $product->categories()->attach($categoryIds);
            
            foreach ($imageUrls as $order => $url) {
                $product->productImages()->create(['image_url' => $url, 'order' => $order]);
            }
        });
        
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
        
        $product->load(['categories', 'productImages']);
        
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
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'string',
        ]);
        
        $categoryIds = $validated['category_ids'];
        $imageUrls = $validated['image_urls'] ?? [];
        unset($validated['category_ids'], $validated['image_urls']);
        
        DB::transaction(function () use ($product, $validated, $categoryIds, $imageUrls) {
            $product->update($validated);
            $product->categories()->sync($categoryIds);
            
            $product->productImages()->delete();
            foreach ($imageUrls as $order => $url) {
                $product->productImages()->create(['image_url' => $url, 'order' => $order]);
            }
        });
        
        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}
