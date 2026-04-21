<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RegistryWishlistReservation;
use App\Models\RegistryGiftCart;
use App\Mail\ReservationReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    /**
     * Store a new reservation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'registry_gift_cart_id' => [
                'required',
                'exists:registry_gift_cart,id',
                Rule::unique('registry_wishlist_reservations', 'registry_gift_cart_id')
            ],
            'name' => 'required_if:is_anonymous,false|nullable|string|max:255',
            'is_anonymous' => 'boolean',
            'greeting' => 'nullable|string',
        ]);

        // Load the gift cart item with registry and product
        $giftCartItem = RegistryGiftCart::with(['registry.user', 'product'])
            ->findOrFail($validated['registry_gift_cart_id']);

        // Create the reservation
        $reservation = RegistryWishlistReservation::create([
            'registry_id' => $giftCartItem->registry_id,
            'registry_gift_cart_id' => $validated['registry_gift_cart_id'],
            'name' => $validated['name'] ?? 'Anonymous',
            'is_anonymous' => $validated['is_anonymous'] ?? false,
            'greeting' => $validated['greeting'] ?? null,
        ]);

        // Send email notification to registry owner
        if ($giftCartItem->registry->user && $giftCartItem->registry->user->email) {
            Mail::to($giftCartItem->registry->user->email)
                ->send(new ReservationReceived($reservation, $giftCartItem));
        }

        return back()->with('success', 'Product reserved successfully!');
    }
}
