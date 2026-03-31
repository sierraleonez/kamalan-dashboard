import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';
import AuthModal from '@/components/AuthModal';
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
    const { auth } = usePage().props as any
    
    const { 
        cartItems, 
        addToCart, 
        updateCartQuantity, 
        removeFromCart, 
        handleContinue 
    } = useRegistryCartHook({ 
        registryId, 
        initialCartItems: auth?.user ? initialCartItems : [],
        user: auth?.user
    });

    function handleAddToCart(product: iProduct) {
        addToCart(product);
    }

    function handleBuyNow(product: iProduct) {
        if (product.affiliate_link) {
            window.open(product.affiliate_link, '_blank');
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <Navbar showRegistryBreadcrumbs={auth?.user} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto flex gap-8 px-4 py-6">
                <div className="flex-1">
                    <ProductListLayout
                        products={products}
                        registryId={registryId}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        showHero={true}
                    />
                </div>

                {/* Only show cart if user is authenticated */}
                {auth?.user && (
                    <RegistryCart
                        items={cartItems}
                        onUpdateQuantity={updateCartQuantity}
                        onRemoveItem={removeFromCart}
                        onContinue={handleContinue}
                    />
                )}
            </div>

        </div>
    );
}