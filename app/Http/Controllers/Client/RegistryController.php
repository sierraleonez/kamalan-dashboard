<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Registry;
use Illuminate\Http\Request;

class RegistryController extends Controller
{
    public function store(Request $request) {
    // 1. Validate request
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'date' => ['required', 'date', 'after:today'],
        'category_id' => ['required', 'integer', 'exists:categories,id'],
    ]);

    // 2. Get user id from authenticated user
    $userId = $request->user()->id;

    // 3. Create registry with Registry model
    $registry = Registry::create([
        'name' => $validated['name'],
        'date' => $validated['date'],
        'category_id' => $validated['category_id'],
        'user_id' => $userId,
        'magic_link' => Registry::generateMagicLink(),
        'last_step' => 1, // Initial step
    ]);

    // 4. Redirect to route('create-registry.select-gifts')
    return redirect()->route('create-registry.select-gifts', ['registry' => $registry->id]);
}
}
