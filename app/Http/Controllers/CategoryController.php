<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        $domain = $request->getHost();
        logger()->info('Domain: ' . $domain);
        $categories = Category::all();
        return inertia('categories/index', [
            'categories' => $categories,
        ]);
    }


    public function create()
    {
        // You can inject any data needed for the create form here
        return inertia('categories/create');
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
        return redirect()->route('categories.index');
    }


    public function show(Category $category)
    {
    return inertia('categories/show', [
            'category' => $category,
        ]);
    }


    public function edit(Category $category)
    {
        return inertia('categories/edit', [
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
        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index');
    }
}
