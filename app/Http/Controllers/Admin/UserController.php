<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->orderBy('created_at', 'desc')->get();

        $users->transform(function ($user) {
            $lastActivity = DB::table('sessions')
                ->where('user_id', $user->id)
                ->max('last_activity');

            $user->last_active = $lastActivity
                ? Carbon::createFromTimestamp($lastActivity)->diffForHumans()
                : null;

            return $user;
        });

        return inertia('admin/users/index', [
            'users' => $users,
            'filters' => ['search' => $request->input('search', '')],
        ]);
    }

    public function show(User $user)
    {
        $user->loadCount('registries');

        $lastActivity = DB::table('sessions')
            ->where('user_id', $user->id)
            ->max('last_activity');

        $lastActive = $lastActivity
            ? Carbon::createFromTimestamp($lastActivity)->format('d F Y H:i:s')
            : null;

        return inertia('admin/users/show', [
            'user' => $user,
            'lastActive' => $lastActive,
        ]);
    }

    public function edit(User $user)
    {
        $lastActivity = DB::table('sessions')
            ->where('user_id', $user->id)
            ->max('last_activity');

        $lastActive = $lastActivity
            ? Carbon::createFromTimestamp($lastActivity)->format('d F Y H:i:s')
            : null;

        return inertia('admin/users/edit', [
            'user' => $user,
            'lastActive' => $lastActive,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'disabled' => 'nullable|boolean',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->disabled_at = !empty($validated['disabled']) ? now() : null;
        $user->save();

        return redirect()->route('admin.users.edit', $user->id);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index');
    }
}
