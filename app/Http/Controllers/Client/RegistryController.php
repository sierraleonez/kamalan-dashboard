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
        'date' => ['required', 'date', 'after_or_equal:today'], // Changed to allow today's date
        'event_id' => ['required', 'integer', 'exists:events,id'],
    ]);

    // 2. Get user id from authenticated user
    $userId = $request->user()->id;

    // 3. Create registry with Registry model
    $registry = Registry::create([
        'name' => $validated['name'],
        'date' => $validated['date'],
        'event_id' => $validated['event_id'],
        'user_id' => $userId,
        // 'magic_link' => Registry::generateMagicLink(),
        'last_step' => 1, // Initial step
    ]);

    // 4. Return appropriate response based on request type
    // If it's an AJAX/Inertia request for creating during cart flow, return JSON
    if ($request->wantsJson() || $request->header('X-Inertia')) {
        return back()->with([
            'success' => 'Registry created successfully',
            'registryId' => $registry->id,
        ]);
    }

    // Otherwise redirect to the next step
    return redirect()->route('create-registry.select-gifts', ['registry' => $registry->id]);
}
}
