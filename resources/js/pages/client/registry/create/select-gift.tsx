import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';
import { useRegistryCartHook, CartItem } from '@/hooks/registry/use-registry-cart-hook';

interface iPaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    path: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
}

interface PageProps {
    products: iPaginatedResponse<iProduct>;
    registryId?: number;
    initialCartItems?: CartItem[];
}

export default function SelectGift({ products, registryId, initialCartItems = [] }: PageProps) {
    const { 
        cartItems, 
        addToCart, 
        updateCartQuantity, 
        removeFromCart, 
        handleContinue 
    } = useRegistryCartHook({ registryId, initialCartItems });

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto flex gap-8 px-4 py-6">
                <div className="flex-1">
                    <ProductListLayout
                        products={products}
                        registryId={registryId}
                        onAddToCart={addToCart}
                        showHero={true}
                    />
                </div>

                <RegistryCart
                    items={cartItems}
                    onUpdateQuantity={updateCartQuantity}
                    onRemoveItem={removeFromCart}
                    onContinue={handleContinue}
                />
            </div>
        </div>
    );
}