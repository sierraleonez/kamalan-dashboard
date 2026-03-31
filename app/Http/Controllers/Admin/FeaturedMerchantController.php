<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedMerchant;
use App\Models\Merchant;
use Illuminate\Http\Request;

class FeaturedMerchantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $featuredMerchants = FeaturedMerchant::with('merchant')->orderBy('priority', 'desc')->get();
        return inertia('admin/featured-merchants/index', [
            'featuredMerchants' => $featuredMerchants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get merchants that are not already featured
        $featuredMerchantIds = FeaturedMerchant::pluck('merchant_id')->toArray();
        $availableMerchants = Merchant::whereNotIn('id', $featuredMerchantIds)->get();

        return inertia('admin/featured-merchants/create', [
            'merchants' => $availableMerchants,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'merchant_id' => 'required|exists:merchants,id|unique:featured_merchants,merchant_id',
            'priority' => 'required|integer|min:0',
            'subscription_date_start' => 'required|date',
            'subscription_date_end' => 'required|date|after:subscription_date_start',
        ]);

        FeaturedMerchant::create($validated);
        return redirect()->route('admin.featured-merchants.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(FeaturedMerchant $featuredMerchant)
    {
        $featuredMerchant->load('merchant');
        return inertia('admin/featured-merchants/show', [
            'featuredMerchant' => $featuredMerchant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeaturedMerchant $featuredMerchant)
    {
        $featuredMerchant->load('merchant');
        
        // Get merchants that are not already featured (excluding current merchant)
        $featuredMerchantIds = FeaturedMerchant::where('id', '!=', $featuredMerchant->id)
            ->pluck('merchant_id')
            ->toArray();
        $availableMerchants = Merchant::whereNotIn('id', $featuredMerchantIds)->get();

        return inertia('admin/featured-merchants/edit', [
            'featuredMerchant' => $featuredMerchant,
            'merchants' => $availableMerchants,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FeaturedMerchant $featuredMerchant)
    {
        $validated = $request->validate([
            'merchant_id' => 'required|exists:merchants,id|unique:featured_merchants,merchant_id,' . $featuredMerchant->id,
            'priority' => 'required|integer|min:0',
            'subscription_date_start' => 'required|date',
            'subscription_date_end' => 'required|date|after:subscription_date_start',
        ]);

        $featuredMerchant->update($validated);
        return redirect()->route('admin.featured-merchants.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FeaturedMerchant $featuredMerchant)
    {
        $featuredMerchant->delete();
        return redirect()->route('admin.featured-merchants.index');
    }
}
