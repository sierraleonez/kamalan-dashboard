<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registry;
use Illuminate\Http\Request;

class RegistryController extends Controller
{
    public function index(Request $request)
    {
        $query = Registry::with(['user:id,name', 'deliveryInfo:id,registry_id', 'event:id,name'])
            ->withCount('giftCart');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('magic_link', 'like', "%{$search}%");
            });
        }

        $registries = $query->orderBy('created_at', 'desc')->get();

        $registries->transform(function ($registry) {
            $registry->item_count = $registry->gift_cart_count;
            $registry->status = $registry->deliveryInfo ? 'Finished' : 'Not Finished';
            $registry->user_name = $registry->user?->name ?? '-';
            return $registry;
        });

        return inertia('admin/registries/index', [
            'registries' => $registries,
            'filters' => ['search' => $request->input('search', '')],
        ]);
    }

    public function show(Registry $registry)
    {
        $registry->load([
            'user',
            'event',
            'deliveryInfo',
            'products' => function ($q) {
                $q->withPivot('id', 'quantity');
            },
            'reservations',
        ]);

        return inertia('admin/registries/show', [
            'registry' => $registry,
        ]);
    }

    public function edit(Registry $registry)
    {
        $events = Event::all();

        return inertia('admin/registries/edit', [
            'registry' => $registry->load('event'),
            'events' => $events,
        ]);
    }

    public function update(Request $request, Registry $registry)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'event_id' => 'required|exists:events,id',
        ]);

        $registry->update($validated);

        return redirect()->route('admin.registries.edit', $registry->id);
    }

    public function destroy(Registry $registry)
    {
        $registry->delete();
        return redirect()->route('admin.registries.index');
    }
}
