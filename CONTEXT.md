# Kamalan Gift Registry — Project Context

## Overview

Kamalan is a gift registry platform where users can create and share gift registries for their events (e.g. weddings, birthdays). Guests can then browse the registry and reserve gifts.

The app serves two distinct audiences:
- **Client area** — public-facing storefront and authenticated user registry management
- **Admin/CMS area** — internal dashboard for managing content (products, merchants, categories, etc.)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12, PHP 8.4 |
| Frontend | React 19 + TypeScript via Inertia.js (SSR-capable) |
| Styling | Tailwind CSS + shadcn/ui + Radix UI |
| Build | Vite |
| Auth | Laravel Fortify (client users) + custom guard (admin) |

---

## Authentication

Two separate auth guards are used to prevent cross-access:

- **`auth` guard** — standard Laravel/Fortify auth for client users (`users` table). Supports 2FA.
- **`auth:admin` guard** — custom guard for admins (`admins` table). Handled by `AdminMiddleware`.

Admin middleware: `app/Http/Middleware/AdminMiddleware.php`  
Admin login is handled by `App\Http\Controllers\Admin\AdminAuthController`.

---

## Backend Structure

### Controllers

Controllers are split by area under `app/Http/Controllers/`:

```
app/Http/Controllers/
├── Controller.php                  # Base controller
├── ClientController.php            # Top-level client/landing logic
├── Admin/                          # Admin CMS controllers
│   ├── AdminAuthController.php
│   ├── AdminDashboardController.php
│   ├── CategoryController.php
│   ├── ProductController.php
│   ├── MerchantController.php
│   ├── EventController.php
│   ├── ArticleController.php
│   ├── FeaturedMerchantController.php
│   └── FeaturedProductController.php
├── Client/                         # Client-facing controllers
│   ├── ProductController.php
│   ├── MerchantController.php
│   ├── ArticleController.php
│   ├── RegistryController.php
│   ├── RegistryGiftCartController.php
│   ├── RegistryDeliveryInfoController.php
│   └── ReservationController.php
└── Settings/                       # User account settings
    ├── ProfileController.php
    ├── PasswordController.php
    └── TwoFactorAuthenticationController.php
```

> **Rule:** New admin controllers go in `Admin/`, new client controllers go in `Client/`.

### Models

All models live in `app/Models/`. Naming uses `PascalCase` singular.

| Model | Table | Notes |
|---|---|---|
| `User` | `users` | Client user, supports 2FA |
| `Admin` | `admins` | Admin user, separate guard |
| `Registry` | `registry` | Core entity — a user's gift registry |
| `RegistryGiftCart` | `registry_gift_cart` | Items added to a registry |
| `RegistryDeliveryInfo` | `registry_delivery_info` | Delivery details for a registry |
| `RegistryWishlistReservation` | `registry_wishlist_reservations` | Guest reservations on registry items |
| `Product` | `products` | Giftable products |
| `ProductImage` | `product_images` | Multiple images per product |
| `ProductCategory` | `product_category` | Pivot for product ↔ category |
| `Category` | `categories` | Product categories |
| `Event` | `events` | Event types (wedding, birthday, etc.) |
| `Merchant` | `merchants` | Product suppliers/brands |
| `FeaturedMerchant` | `featured_merchants` | Merchants highlighted on the landing page |
| `FeaturedProduct` | `featured_products` | Products highlighted on the landing page |
| `Article` | `articles` | Blog/editorial content |

**Table naming conventions:**
- Standard resources: plural snake_case (e.g. `products`, `merchants`, `categories`)
- Registry-related: prefix with `registry_` (e.g. `registry_gift_cart`, `registry_delivery_info`)
- Pivot tables: both model names snake_case joined (e.g. `product_category`)

### Migrations

All migrations in `database/migrations/`. Use date-prefix format:  
`YYYY_MM_DD_HHMMSS_description.php`

### Form Requests

Reusable validation lives in `app/Http/Requests/`. Currently only `Settings/` sub-folder exists; add domain-specific requests here as needed (e.g. `app/Http/Requests/Registry/StoreRegistryRequest.php`).

### Other Backend Directories

- `app/Actions/Fortify/` — Fortify action overrides (user creation, password reset)
- `app/Concerns/` — Shared traits/interfaces (`PasswordValidationRules`, `ProfileValidationRules`)
- `app/Mail/` — Mailable classes (e.g. `ReservationReceived`)
- `app/Console/Commands/` — Artisan commands
- `app/Providers/` — `AppServiceProvider`, `FortifyServiceProvider`

---

## Routes

Routes are split across four files, all required from `routes/web.php`:

| File | Purpose | Prefix | Auth |
|---|---|---|---|
| `routes/client.php` | Client-facing pages | `/` | Optional or `auth` |
| `routes/admin.php` | Admin CMS | `/admin` | `auth:admin` |
| `routes/settings.php` | Client user settings | `/settings` (implied) | `auth` |
| `routes/console.php` | Artisan scheduled commands | — | — |

### Admin routes
- Grouped under `prefix('admin')->name('admin.')->middleware(['auth:admin'])`
- Resources follow standard Laravel resource naming: `admin.categories.index`, `admin.products.create`, etc.
- Login routes (`admin.login`, `admin.storeLogin`) are outside the auth middleware

### Client routes
- Public routes at `/`, `/products`, `/articles`, `/merchant/{merchant}`, `/registry/{magic_link}`
- Auth-protected registry management under `/my-registries` and `/create-registry`
- Registry creation is a multi-step flow: `select-event → select-gifts → delivery-data → share-registry`
- `registry.owner` middleware (`EnsureRegistryOwnership`) protects steps that require owning the registry

---

## Frontend Structure

```
resources/js/
├── app.tsx                     # Inertia app bootstrap
├── ssr.tsx                     # SSR entry
├── pages/                      # Inertia page components (one per route)
│   ├── welcome.tsx             # Dev/fallback welcome
│   ├── dashboard.tsx           # Client dashboard
│   ├── coming-soon.tsx
│   ├── auth/                   # Fortify auth pages (login, register, 2FA, etc.)
│   ├── admin/                  # Admin CMS pages
│   │   ├── auth/login.tsx
│   │   ├── dashboard.tsx
│   │   ├── categories/         # index, create, edit, show
│   │   ├── products/           # index, create, edit, show
│   │   ├── merchants/          # index, create, edit, show
│   │   ├── events/             # index, create, edit, show
│   │   ├── articles/           # index, create, edit, show
│   │   ├── featured-products/  # index, create, edit, show
│   │   ├── featured-merchants/ # index, create, edit, show
│   │   └── settings/           # appearance, password, profile, two-factor
│   └── client/                 # Client-facing pages
│       ├── landing.tsx         # Homepage
│       ├── product/            # index, show
│       ├── registry/           # index, show, checkout, create/* (multi-step)
│       ├── merchant/           # show
│       ├── articles/           # index, show
│       └── static/             # faq, privacy-policy, terms
├── layouts/                    # Shared layout wrappers
│   ├── app-layout.tsx          # Root layout selector
│   ├── app/
│   │   ├── app-sidebar-layout.tsx   # Sidebar nav layout (used by admin)
│   │   └── app-header-layout.tsx    # Top nav layout
│   ├── auth/
│   │   ├── auth-simple-layout.tsx
│   │   ├── auth-split-layout.tsx
│   │   └── auth-card-layout.tsx
│   └── settings/
│       └── layout.tsx
├── components/                 # Reusable React components
│   ├── ui/                     # shadcn/ui primitives (button, input, dialog, etc.)
│   ├── layout/                 # Page-section layout components
│   │   ├── product-list/       # Product listing layout
│   │   └── product-detail/     # Product detail layout
│   ├── Navbar.tsx              # Client site top navigation
│   ├── Footer.tsx              # Client site footer
│   ├── HeroSection.tsx
│   ├── BrandWall.tsx
│   ├── FeaturedBanner.tsx
│   ├── ArticleGrid.tsx
│   ├── RegistryCard.tsx        # Registry summary card
│   ├── RegistryFormModal.tsx   # Create/edit registry modal
│   ├── registry-cart.tsx       # Cart sidebar for registry creation
│   ├── ReservationDialog.tsx   # Guest gift reservation modal
│   ├── registry-checkout-dialog.tsx
│   ├── RegistryBreadcrumbs.tsx
│   ├── ProductHeader.tsx
│   ├── ProductDescription.tsx
│   ├── ProductImage.tsx
│   ├── ProductImageCarousel.tsx
│   ├── LandingProductCard.tsx
│   ├── product-slider.tsx
│   ├── CategoryCard.tsx
│   ├── AuthModal.tsx           # Auth prompt modal for guests
│   ├── PurchaseButton.tsx
│   ├── app-sidebar.tsx         # Admin sidebar nav
│   ├── app-header.tsx          # Admin top header
│   └── ...                     # Misc shared components (breadcrumbs, user-menu, etc.)
├── hooks/                      # Custom React hooks
│   ├── use-appearance.tsx
│   ├── use-two-factor-auth.ts
│   ├── use-mobile.tsx
│   ├── use-guest-cart-hook.tsx
│   └── registry/
│       └── use-registry-cart-hook.ts
├── types/                      # TypeScript type definitions
│   ├── index.ts
│   ├── auth.ts
│   ├── response.ts
│   ├── ui.ts
│   └── navigation.ts
├── lib/
│   ├── utils.ts                # cn() and general helpers
│   └── currency.ts             # IDR formatting
├── routes/                     # Wayfinder-generated typed route helpers
│   └── (auto-generated, do not edit manually)
├── actions/                    # Wayfinder-generated typed controller action helpers
│   └── (auto-generated, do not edit manually)
└── wayfinder/                  # Wayfinder core runtime
```

### Pages vs Layouts vs Components

| Type | Location | Rule |
|---|---|---|
| **Page** | `pages/` | One file per Inertia route. Receives server props. Declares which layout to use. |
| **Layout** | `layouts/` | Wrapping shell (nav, sidebar, auth chrome). Pages import and use these. |
| **Component** | `components/` | Reusable UI. No direct server props — receives everything via props. |
| **UI Primitive** | `components/ui/` | shadcn/ui base components. Don't modify unless extending. |

### Page ↔ Controller ↔ Route naming

Admin pages mirror the route resource name:
- Route: `admin.products.create` → Controller: `Admin\ProductController@create` → Page: `pages/admin/products/create.tsx`

Client pages follow the same pattern:
- Route: `articles.show` → Controller: `Client\ArticleController@show` → Page: `pages/client/articles/show.tsx`

### Wayfinder

`routes/` and `actions/` under `resources/js/` are **auto-generated** by [Wayfinder](https://github.com/laravel/wayfinder). Do not edit them manually. Regenerate after adding or changing routes/controllers:

```bash
php artisan wayfinder:generate
```

---

## Key Domain Concepts

- **Registry** — a named event gift list owned by a user. Has a `magic_link` for public sharing.
- **Event** — the event type associated with a registry (e.g. wedding, birthday).
- **RegistryGiftCart** — the pivot between a registry and its chosen products (with quantity).
- **RegistryWishlistReservation** — a guest's reservation of a gift item, preventing double-gifting.
- **RegistryDeliveryInfo** — the address/delivery details attached to a registry. Required before sharing.
- **Product** — a giftable item, belongs to a `Merchant`, has many `Category` via `product_category`.
- **FeaturedMerchant / FeaturedProduct** — curated highlights shown on the landing page.
- **Article** — blog/editorial content managed via CMS.
