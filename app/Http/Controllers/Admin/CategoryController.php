<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $domain = $request->getHost();
        logger()->info('Domain: ' . $domain);
        $categories = Category::all();
        return inertia('admin/categories/index', [
            'categories' => $categories,
        ]);
    }


    public function create()
    {
        // You can inject any data needed for the create form here
        return inertia('admin/categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:categories,name',
            'description' => 'nullable|string',
            'background_image' => 'required|string',
            'icon' => 'required|string',
        ]);
        $validated['created_by'] = $request->user()->id;
        $category = Category::create($validated);
        return redirect()->route('admin.categories.index');
    }


    public function show(Category $category)
    {
    return inertia('admin/categories/show', [
            'category' => $category,
        ]);
    }


    public function edit(Category $category)
    {
        return inertia('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
            'background_image' => 'required|string',
            'icon' => 'required|string',
        ]);
        $category->update($validated);
        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('admin.categories.index');
    }
}
