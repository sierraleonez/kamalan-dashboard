<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RegistryDeliveryInfo;
use Illuminate\Http\Request;

class RegistryDeliveryInfoController extends Controller
{
    function store(Request $request) {
        // 1. Validate request
        $validated = $request->validate([
            'registry_id' => 'required|exists:registry,id',
            'photo_url' => 'nullable|string|max:255',
            'greeting' => 'required|string|max:1000',
        'receiver_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'subdistrict' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'address' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        $registry_id = $request->registry_id;

        // 2. Save the data to db with `registryDeliveryInfo` model
        RegistryDeliveryInfo::create($validated);

        // 3. Redirect to `create-registry.share-registry` route
        return redirect()->route('create-registry.share-registry', ['registry' => $registry_id]);
    }
}
