import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import ProductImage from '@/components/ProductImage';
import ProductHeader from '@/components/ProductHeader';
import ProductDescription from '@/components/ProductDescription';
import PurchaseButton from '@/components/PurchaseButton';
import ClientHeader from '@/components/client-header';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import { addGiftToCart } from '@/routes/create-registry';

interface iProduct {
    id: number;
    name: string;
    price: number;
    formatted_price?: string;
    merchant_id: number;
    display_image: string;
    affiliate_link?: string;
    description?: string;
    category?: {
        id: number;
        name: string;
    };
    merchant?: {
        id: number;
        name: string;
        location?: string;
    };
    created_by?: number;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface ShowProductProps {
    product: iProduct;
    registryId?: number;
    initialCartItems?: CartItem[];
}

export default function ShowProduct({ product, registryId, initialCartItems = [] }: ShowProductProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    
    const merchant = product.merchant ? {
        name: product.merchant.name,
        location: product.merchant.location || "Jakarta, Indonesia"
    } : {
        name: "Kamalan Premium",
        location: "Jakarta, Indonesia"
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleWishlist = () => {
        // Wishlist functionality
        console.log(`Added ${product.name} to wishlist`);
    };

    const handleShare = () => {
        // Share functionality
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out this amazing product: ${product.name}`,
                url: window.location.href,
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const addToCart = () => {
        if (!registryId) {
            console.error('No registry ID available');
            return;
        }

        // Optimistically update UI
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.display_image
            }];
        });

        // Send to backend
        router.post(addGiftToCart.url(), {
            product_id: product.id,
            registry_id: registryId,
        }, {
            preserveScroll: true,
            only: ['cartItems'],
            onSuccess: (page: any) => {
                // Update cart with server data if available
                if (page.props.cartItems) {
                    setCartItems(page.props.cartItems);
                }
            },
            onError: (errors) => {
                console.error('Failed to add to cart:', errors);
                // Revert optimistic update on error
                setCartItems(prev => {
                    const existingItem = prev.find(item => item.id === product.id);
                    if (existingItem && existingItem.quantity === 1) {
                        return prev.filter(item => item.id !== product.id);
                    }
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                });
            },
        });
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        if (!registryId) {
            console.error('No registry ID available');
            return;
        }

        // Optimistically update UI
        const removedItem = cartItems.find(item => item.id === id);
        setCartItems(prev => prev.filter(item => item.id !== id));

        // Send to backend
        router.delete(addGiftToCart.url(), {
            data: {
                product_id: id,
                registry_id: registryId,
            },
            preserveScroll: true,
            only: ['cartItems'],
            onSuccess: (page: any) => {
                // Update cart with server data if available
                if (page.props.cartItems) {
                    setCartItems(page.props.cartItems);
                }
            },
            onError: (errors) => {
                console.error('Failed to remove from cart:', errors);
                // Revert optimistic update on error
                if (removedItem) {
                    setCartItems(prev => [...prev, removedItem]);
                }
            },
        });
    };

    const handleContinue = () => {
        // Navigate to next step in registry creation
        router.visit('/create-registry/delivery-data');
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title={`${product.name} - Kamalan`} />
            
            {/* Header */}
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex lg:gap-8">
                <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Product Image */}
                    <div className="order-1">
                        <ProductImage 
                            src={product.display_image} 
                            alt={product.name} 
                        />
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="order-2 space-y-6">
                        <ProductHeader 
                            name={product.name}
                            price={product.price}
                            formatted_price={product.formatted_price}
                            merchant={merchant}
                        />
                        
                        <PurchaseButton 
                            affiliate_link={product.affiliate_link}
                            productName={product.name}
                            onAddToCart={registryId ? addToCart : undefined}
                            productId={product.id}
                            isInCart={cartItems.some(item => item.id === product.id)}
                        />
                        
                        <ProductDescription 
                            description={product.description}
                        />
                    </div>
                </div>
                
                {/* Related Products Section */}
                <div className="mt-16 border-t border-[oklch(0.922_0_0)] pt-12">
                    <h2 className="font-serif text-2xl font-bold text-[oklch(0.145_0_0)] mb-6 text-center">
                        You might also like
                    </h2>
                    <div className="text-center text-gray-600">
                        <p>Related products section coming soon...</p>
                    </div>
                </div>
                </div>
                
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