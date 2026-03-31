<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RegistryGiftCart;
use App\Models\Registry;
use App\Models\Category;
use Illuminate\Http\Request;

class RegistryGiftCartController extends Controller
{
    function addGiftToCart(Request $request) {
        $user = $request->user();
        
        // 1. validate request - registry_id is optional now
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'registry_id' => 'nullable|exists:registry,id',
        ]);

        $registryId = $validated['registry_id'] ?? null;

        // 2. Auto-create registry if not provided
        if (!$registryId) {
            // Get default event (event_id = 1)
            $event = \App\Models\Event::find(1);
            $eventName = $event ? $event->name : 'Event';
            
            // Create registry with default values
            $registry = Registry::create([
                'user_id' => $user->id,
                'event_id' => 1,
                'name' => $user->name . "'s " . $eventName,
                'date' => now()->format('Y-m-d'),
            ]);
            
            $registryId = $registry->id;
        }

        // 3. Check if item already exists in cart
        $existingItem = RegistryGiftCart::where('registry_id', $registryId)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingItem) {
            // Increment quantity if already exists
            $existingItem->increment('quantity');
        } else {
            // Create new cart item
            RegistryGiftCart::create([
                'product_id' => $validated['product_id'],
                'registry_id' => $registryId,
                'quantity' => 1,
            ]);
        }

        // 4. Get updated cart items with product details
        $cartItems = RegistryGiftCart::where('registry_id', $registryId)
            ->with('product')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                    'image' => $item->product->display_image,
                ];
            });

        // return redirect('create-registry.select-gifts', [
        //     'registry' => $registryId,
        // ]);
        return back()->with([
            'success' => 'Gift added to cart successfully',
            'cartItems' => $cartItems,
            'registryId' => $registryId, // Send back the registry ID for the frontend
        ]);
    }

    function deleteItemFromCart(Request $request) {
        // 1. Validate request
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'registry_id' => 'required|exists:registry,id',
        ]);

        // 2. Check if item exists
        $cartItem = RegistryGiftCart::where('registry_id', $validated['registry_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        // 3. Delete if exists
        if ($cartItem) {
            $cartItem->delete();
        }

        // 4. Get updated cart items with product details
        $cartItems = RegistryGiftCart::where('registry_id', $validated['registry_id'])
            ->with('product')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                    'image' => $item->product->display_image,
                ];
            });

        return back()->with([
            'success' => 'Item removed from cart successfully',
            'cartItems' => $cartItems,
        ]);
    }
}
