<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

require __DIR__ . '/client.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/settings.php';

// Category CRUD routes
