<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::with('createdBy')->get();
        return inertia('admin/events/index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return inertia('admin/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'background_image' => 'required|string',
            'icon' => 'required|string',
        ]);
        
        $validated['created_by'] = $request->user('admin')->id;
        
        $event = Event::create($validated);
        
        return redirect()->route('admin.events.index')->with('success', 'Event created successfully');
    }

    public function show(Event $event)
    {
        $event->load('createdBy');
        return inertia('admin/events/show', [
            'event' => $event,
        ]);
    }

    public function edit(Event $event)
    {
        return inertia('admin/events/edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'background_image' => 'required|string',
            'icon' => 'required|string',
        ]);
        
        $event->update($validated);
        
        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        
        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully');
    }
}
