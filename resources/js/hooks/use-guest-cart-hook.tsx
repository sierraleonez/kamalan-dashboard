import { useState, useEffect } from 'react';

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

interface UseGuestCartHookProps {
    storageKey?: string;
}

const DEFAULT_STORAGE_KEY = 'kamalan_guest_cart';

export function useGuestCartHook({ storageKey = DEFAULT_STORAGE_KEY }: UseGuestCartHookProps = {}) {
    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];
        
        try {
            const stored = localStorage.getItem(storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    });

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(storageKey, JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cartItems, storageKey]);

    const addToCart = (product: Product) => {
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
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleContinue = () => {
        // For guest cart, this could navigate to checkout or show a login prompt
        console.log('Continue with cart items:', cartItems);
        // You can implement navigation logic here
    };

    return {
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        handleContinue,
    };
}
