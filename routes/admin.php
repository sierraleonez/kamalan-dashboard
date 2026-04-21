<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\MerchantController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\FeaturedMerchantController;
use App\Http\Controllers\Admin\FeaturedProductController;
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
    Route::resource('events', EventController::class);
    Route::resource('articles', ArticleController::class);
    Route::resource('featured-merchants', FeaturedMerchantController::class);
    Route::resource('featured-products', FeaturedProductController::class);

    // Admin upload image
    Route::post('upload-image', function (\Illuminate\Http\Request $request) {
        $request->validate([
            'image' => ['required', 'image', 'max:2048'], // 2MB max
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');

            $url = \Illuminate\Support\Facades\Storage::url($path);
            return redirect()->back()->with(['image_url' => $url]);
        }

        return redirect()->back()->withErrors([
            'image' => 'No file was uploaded.',
        ]);
    })->middleware(['throttle:10,1'])->name('upload-image');
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