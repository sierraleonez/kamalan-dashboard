<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): Response
    {
        // For JSON requests (API)
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        // Get the authenticated user
        $user = Auth::user();
        
        // Determine the redirect URL
        $redirectUrl = $this->getRedirectUrl($request, $user);
        
        return redirect()->back();
    }

    /**
     * Get the redirect URL based on user and request context.
     */
    protected function getRedirectUrl($request, ?Authenticatable $user): string
    {
        // 1. Check for explicit redirect parameter (for modals/custom flows)
        if ($request->has('redirect_to') && $request->filled('redirect_to')) {
            return $request->input('redirect_to');
        }

        // 2. Check for intended URL (from auth middleware)
        $intended = session()->pull('url.intended');
        
        if ($intended) {
            return $intended;
        }

        // 3. Custom redirect logic based on user type/role
        return $this->getDefaultRedirectUrl($user);
    }

    /**
     * Get the default redirect URL based on user type.
     * Customize this method for your specific needs.
     */
    protected function getDefaultRedirectUrl(?Authenticatable $user): string
    {
        // Example: Check if user is an admin
        if ($user instanceof \App\Models\Admin) {
            return '/admin/dashboard';
        }

        // Regular users - redirect to homepage or user dashboard
        return '/'; // Change to '/dashboard' if you have a user dashboard
    }
}
