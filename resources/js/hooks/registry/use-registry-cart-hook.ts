import { useState } from 'react';
import { router } from '@inertiajs/react';
import { addGiftToCart, deliveryData } from '@/routes/create-registry';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    formatted_price?: string;
    merchant_id: number;
    display_image: string;
    affiliate_link?: string;
}

interface UseCartHookProps {
    registryId?: number;
    initialCartItems?: CartItem[];
}

export function useRegistryCartHook({ registryId, initialCartItems = [] }: UseCartHookProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const addToCart = (product: Product) => {
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
        router.visit(deliveryData.url({ query: { registry: registryId } }));
    };

    return {
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleContinue,
    };
}
