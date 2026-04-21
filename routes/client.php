<?php

use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\MerchantController;
use App\Http\Controllers\Client\ArticleController;
use App\Http\Controllers\Client\ReservationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Client\RegistryController;
use App\Http\Controllers\Client\RegistryGiftCartController;
use App\Http\Controllers\Client\RegistryDeliveryInfoController;
use App\Models\Category;
use App\Models\Product;
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

// Article routes
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

// Merchant routes
Route::get('/merchant/{merchant}', [MerchantController::class, 'show'])->name('merchant.show');

// Reservation routes (public - no auth required)
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');



// Route::get('/products', [ProductController::class, 'index'])->name('product-list');
// Route::get('/products/{}', [ProductController::class, 'index'])->name('product-list');


// Create registry route (protected)
Route::middleware('auth')->group(function () {
    Route::prefix('my-registries')->name('my-registries')->group(function () {
        Route::get('/', [RegistryController::class, 'index'])->name('index');
        Route::get('/{registry}', [RegistryController::class, 'show'])->name('show');
    });
    Route::prefix('create-registry')->name('create-registry.')->group(function () {

        Route::get('/select-event', function (Request $request) {
            $events = \App\Models\Event::all();
            return inertia('client/registry/create/select-event', ['events' => $events]);
        })->name('select-event');

        Route::get('/select-gifts', [ClientController::class, 'showProduct'])
            ->name('select-gifts');

        Route::get('/select-gifts/{product_id}', function (Request $request) {
            $product_id = $request->product_id;

            $product = Product::with(['event', 'categories', 'merchant', 'createdBy'])
                ->where('enabled', true)
                ->findOrFail($product_id);

            $registryId = $request->query('registry');



            $cartItems = \App\Models\RegistryGiftCart::where('registry_id', $registryId)
                ->with('product')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->product_id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'quantity' => $item->quantity,
                        'image' => $item->product->display_image,
                    ];
                });

            return inertia('client/registry/create/show-product', [
                'product' => $product,
                'registryId' => $registryId,
                'initialCartItems' => $cartItems,
            ]);
        })->name('show-product');

        Route::post('/', [RegistryController::class, 'store'])->name('store-registry');

        Route::post('gift-cart', [RegistryGiftCartController::class, 'addGiftToCart'])
            ->name('add-gift-to-cart');

        Route::delete('gift-cart', [RegistryGiftCartController::class, 'deleteItemFromCart'])
            ->name('delete-gift-from-cart');

        Route::middleware('registry.owner')->group(function () {
            Route::get('delivery-info', function () {});

            Route::post('delivery-info', function () {});

            Route::get('/delivery-data', function (Request $request) {
                $registryId = $request->query('registry');
                $user = $request->user();
                $user_id = $user->id;
                $registry = Registry::where('user_id', $user_id)->with(['event'])->find($registryId);
                return Inertia('client/registry/create/fill-delivery-data', ['registry' => $registryId, 'registry_detail' => $registry]);
            })->name('delivery-data');

            Route::post('/delivery-data', [RegistryDeliveryInfoController::class, 'store'])
                ->name('store-delivery-data');

            Route::get('/share-registry', function (Request $request) {
                $registryId = $request->query('registry');
                $user = $request->user();
                $user_id = $user->id;
                $registry = Registry::where('user_id', $user_id)->with(['event', 'products', 'deliveryInfo'])->find($registryId);
                return Inertia('client/registry/create/share-registry', ['registry' => $registry]);
            })->name('share-registry');
        });
    });
});

Route::prefix('registry')->name('registry.')->group(function () {
    Route::get('{magic_link}', function (Request $request) {
        $magic_link = $request->magic_link;
        $registry = Registry::with([
            'event',
            'products' => function ($query) {
                $query->with(['categories', 'merchant']);
            },
            'deliveryInfo',
            'giftCart.reservation'
        ])->where([
            'magic_link' => $magic_link
        ])->first();

        if (!$registry || !$registry->deliveryInfo) {
            abort(404);
        }

        // Attach reservation data to product pivot
        $registry->products->each(function ($product) use ($registry) {
            $giftCartItem = $registry->giftCart->firstWhere('product_id', $product->id);
            if ($giftCartItem && $giftCartItem->reservation) {
                $product->pivot->reservation = $giftCartItem->reservation;
            }
        });

        return Inertia('client/registry/show/public', ['registry' => $registry]);
    });

    Route::get('checkout/{registry_id}', function (Request $request) {
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
