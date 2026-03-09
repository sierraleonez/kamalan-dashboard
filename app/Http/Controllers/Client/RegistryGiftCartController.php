<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RegistryGiftCart;
use Illuminate\Http\Request;

class RegistryGiftCartController extends Controller
{
    function addGiftToCart(Request $request) {
        // 1. validate request
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'registry_id' => 'required|exists:registry,id',
        ]);

        // 2. Check if item already exists in cart
        $existingItem = RegistryGiftCart::where('registry_id', $validated['registry_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingItem) {
            // Increment quantity if already exists
            $existingItem->increment('quantity');
        } else {
            // Create new cart item
            RegistryGiftCart::create([
                'product_id' => $validated['product_id'],
                'registry_id' => $validated['registry_id'],
                'quantity' => 1,
            ]);
        }

        // 3. Get updated cart items with product details
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
            'success' => 'Gift added to cart successfully',
            'cartItems' => $cartItems,
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
