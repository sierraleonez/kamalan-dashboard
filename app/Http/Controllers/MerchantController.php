<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $merchants = Merchant::all();
        return inertia('merchants/index', [
            'merchants' => $merchants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('merchants/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shopee_link' => 'nullable|url|max:255',
            'tokped_link' => 'nullable|url|max:255',
            'shop_location' => 'nullable|string|max:255',
        ]);

        Merchant::create($validated);
        return redirect()->route('merchants.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Merchant $merchant)
    {
        return inertia('merchants/show', [
            'merchant' => $merchant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Merchant $merchant)
    {
        return inertia('merchants/edit', [
            'merchant' => $merchant,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Merchant $merchant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shopee_link' => 'nullable|url|max:255',
            'tokped_link' => 'nullable|url|max:255',
            'shop_location' => 'nullable|string|max:255',
        ]);

        $merchant->update($validated);
        return redirect()->route('merchants.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Merchant $merchant)
    {
        $merchant->delete();
        return redirect()->route('merchants.index');
    }
}
