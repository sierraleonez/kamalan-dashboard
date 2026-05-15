<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Registry;
use App\Models\RegistryDeliveryInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistryDeliveryInfoController extends Controller
{
    function store(Request $request)
    {
        // 1. Validate request
        $validated = $request->validate([
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date|after:today',
            'registry_title' => 'required|string|max:255',
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
        DB::transaction(function () use ($validated, $registry_id) {
            RegistryDeliveryInfo::create($validated);
            $registry = Registry::find($registry_id);
            $registry->update([
                'name' => $validated['registry_title'],
                'date' => $validated['event_date'],
            ]);
        });

        // 3. Redirect to `create-registry.share-registry` route
        return redirect()->route('create-registry.share-registry', ['registry' => $registry_id]);
    }
}
