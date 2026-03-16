<?php

use App\Http\Controllers\Client\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Client\RegistryController;
use App\Http\Controllers\Client\RegistryGiftCartController;
use App\Http\Controllers\Client\RegistryDeliveryInfoController;
use App\Models\Category;
use App\Models\Registry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Client routes
Route::resource('client', ClientController::class);
Route::get('/', [ClientController::class, 'index'])->name('home');
Route::get('/coming-soon', function () {
    return Inertia::render('coming-soon');
})->name('coming-soon');
Route::resource('products', ProductController::class);
// Route::get('/products', [ProductController::class, 'index'])->name('product-list');
// Route::get('/products/{}', [ProductController::class, 'index'])->name('product-list');

// Create registry route (protected)
Route::middleware('auth')->group(function () {
    Route::prefix('create-registry')->name('create-registry.')->group(function () {

        Route::get('/select-event', function (Request $request) {
            $categories = Category::all();
            return inertia('client/registry/create/select-event', ['categories' => $categories]);
        })->name('select-event');

        Route::post('/', [RegistryController::class, 'store'])->name('store-registry');

        Route::middleware('registry.owner')->group(function () {
            Route::post('gift-cart', [RegistryGiftCartController::class, 'addGiftToCart'])
                ->name('add-gift-to-cart');

            Route::delete('gift-cart', [RegistryGiftCartController::class, 'deleteItemFromCart'])
                ->name('delete-gift-from-cart');

            Route::get('delivery-info', function () {});

            Route::post('delivery-info', function () {});



            Route::get('/select-gifts', [ClientController::class, 'showProduct'])
                ->name('select-gifts');

            Route::get('/delivery-data', function (Request $request) {
                $registryId = $request->query('registry');
                $user = $request->user();
                $user_id = $user->id;
                $registry = Registry::where('user_id', $user_id)->with(['category'])->find($registryId);
                return Inertia('client/registry/create/fill-delivery-data', ['registry' => $registryId, 'registry_detail' => $registry]);
            })->name('delivery-data');

            Route::post('/delivery-data', [RegistryDeliveryInfoController::class, 'store'])
                ->name('store-delivery-data');

            Route::get('/share-registry', function (Request $request) {
                $registryId = $request->query('registry');
                $user = $request->user();
                $user_id = $user->id;
                $registry = Registry::where('user_id', $user_id)->with(['category', 'products', 'deliveryInfo'])->find($registryId);
                return Inertia('client/registry/create/share-registry', ['registry' => $registry]);
            })->name('share-registry');
        });
    });
});

Route::prefix('registry')->name('registry.')->group(function() {
    Route::get('{registry_id}', function(Request $request) {
        $registry_id = $request->registry_id;
        $registry = Registry::with(['category', 'products', 'deliveryInfo'])->find($registry_id);
        
        if (!$registry || !$registry->deliveryInfo) {
            abort(404);
        }
        
        return Inertia('client/registry/show/public', ['registry' => $registry]);
    });

    Route::get('checkout/{registry_id}', function(Request $request) {
        $registry_id = $request->registry_id;
        $registry = Registry::with(['category', 'products', 'deliveryInfo'])->find($registry_id);
        
        if (!$registry || !$registry->deliveryInfo) {
            abort(404);
        }
        
        return Inertia('client/registry/checkout', ['registry' => $registry]);
    })->name('checkout');
});

// Route::domain(env('APP_URL'))->group(function() {
// });

// Upload image
Route::post('upload-file', function (Request $request) {
    $request->validate([
        'registry_background_image' => ['required', 'image', 'max:2048'], // 2MB max
    ]);

    if ($request->hasFile('registry_background_image')) {
        $path = $request->file('registry_background_image')->store('registry_background_image', 'public');

        $url = Storage::url($path);
        return redirect()->back()->with(['image_url' => $url]);
    }

    return redirect()->back()->withErrors([
        'registry_background_image' => 'No file was uploaded.',
    ]);
})->middleware(['auth', 'throttle:10,1'])->name('upload-file');
