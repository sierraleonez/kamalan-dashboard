<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MerchantController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


// Domain-based admin routes
Route::middleware(['auth:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        logger(Auth::guard('admin')->check());
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('admin.login');
    })->name('home');

    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Admin resource management
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('merchants', MerchantController::class);
});

// Admin guest routes (with custom redirect for authenticated users)
Route::get('/admin/login', function () {
    logger('admin login');
    if (Auth::guard('admin')->check()) {
        return redirect()->route('admin.dashboard');
    }
    return app(AdminAuthController::class)->showLoginForm();
})->name('admin.login');
Route::post('admin/login', [AdminAuthController::class, 'login'])->name('admin.storeLogin');