import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { addGiftToCart, deliveryData, storeRegistry, selectGifts } from '@/routes/create-registry';

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

interface User {
    id: number;
    name: string;
    email: string;
}

interface UseCartHookProps {
    registryId?: number;
    initialCartItems?: CartItem[];
    user?: User;
}

export function useRegistryCartHook({ registryId: initialRegistryId, initialCartItems = [], user }: UseCartHookProps) {
    console.log(user, 'User in useRegistryCartHook');
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [registryId, setRegistryId] = useState<number | undefined>(initialRegistryId);
    const [pendingProductProcessed, setPendingProductProcessed] = useState(false);

    const addToCart = async (product: Product) => {
        // If no registryId and user is authenticated, create registry first
        let currentRegistryId = registryId;

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

        console.log('Adding to cart with registry ID:', currentRegistryId);

        // Send to backend with the registry ID
        router.post(addGiftToCart.url(), {
            product_id: product.id,
            registry_id: currentRegistryId,
        }, {
            preserveScroll: true,
            only: ['cartItems', 'flash'],
            onSuccess: (page: any) => {
                // Update registry ID if it was created
                console.log(page.props.flash.registryId, 'Registry ID from flash after adding to cart');
                if (page.props.flash?.registryId || currentRegistryId) {
                    setRegistryId(page.props.flash.registryId || currentRegistryId);
                    // Update URL with new registry ID
                    const url = new URL(window.location.href);
                    url.searchParams.set('registry', page.props.flash.registryId || currentRegistryId);
                    window.history.replaceState({}, '', url.toString());
                }
                
                // Update cart with server data if available
                if (page.props.flash?.cartItems) {
                    setCartItems(page.props.flash.cartItems);
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

    // Clear cart data when user logs out
    useEffect(() => {
        if (!user) {
            setCartItems([]);
            setRegistryId(undefined);
            setPendingProductProcessed(false);
        }
    }, [user]);

    return {
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        handleContinue,
        registryId, // Export registryId so components can use it
    };
}
