<?php

namespace App\Http\Middleware;

use App\Models\Registry;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRegistryOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $registryId = $request->query('registry') ?? $request->input('registry_id');
        $user = $request->user();
        $user_id = $user->id;

        if ($registryId) {
            $registry = Registry::where('id', $registryId)
                ->where('user_id', $user_id)
                ->first();

            if (!$registry) {
                abort(403, 'Unauthorized access to this registry.');
            }
        }

        return $next($request);
    }
}
