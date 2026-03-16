import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import ProductDetailLayout, { ProductDetailData } from '@/components/layout/product-detail';
import { useRegistryCartHook, CartItem } from '@/hooks/registry/use-registry-cart-hook';

interface ShowProductProps {
    product: ProductDetailData;
    registryId?: number;
    initialCartItems?: CartItem[];
}

export default function ShowProduct({ product, registryId, initialCartItems = [] }: ShowProductProps) {
    const {
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleContinue
    } = useRegistryCartHook({ registryId, initialCartItems });

    const viewMode = 'select-gift'; // This can be dynamic based on the page context  
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title={`${product.name} - Kamalan`} />
            
            {/* Header */}
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex lg:gap-8">
                    <ProductDetailLayout 
                        product={product}
                        viewMode={viewMode}
                        onAddToCart={registryId ? handleAddToCart : undefined}
                        isInCart={cartItems.some(item => item.id === product.id)}
                    />
                    
                    {registryId && (
                        <RegistryCart
                            items={cartItems}
                            onUpdateQuantity={updateCartQuantity}
                            onRemoveItem={removeFromCart}
                            onContinue={handleContinue}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}