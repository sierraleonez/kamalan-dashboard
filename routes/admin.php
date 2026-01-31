<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::prefix('/admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('home');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::resource('categories', CategoryController::class);

    Route::resource('products', ProductController::class);
});


