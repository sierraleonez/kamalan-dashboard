import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';
import AuthModal from '@/components/AuthModal';
import { useRegistryCartHook, CartItem } from '@/hooks/registry/use-registry-cart-hook';
import { selectGifts } from '@/routes/create-registry';
import debounce from 'lodash.debounce';

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
    registry?: any;
    initialCartItems?: CartItem[];
    categories?: Array<{ id: number; name: string }>;
    brands?: Array<{ id: number; name: string }>;
    filter: {
        categories?: number[];
        brands?: number[];
        search?: string;
        sort?: string;
    }
}


export default function SelectGift({ products, registryId, categories, brands, filter, registry, initialCartItems = [] }: PageProps) {
    const { auth } = usePage().props as any
    const user = auth?.user;
    const isRegistryComplete = registry?.delivery_info
    const isAuthenticated = !!user;
    const userName = isAuthenticated ? user.name : null;
    const defaultRegistryTitle = userName ? `${userName}'s Registry` : 'Your Registry';
    const registryTitle = isRegistryComplete ? registry.name : defaultRegistryTitle

    const { setData, data, setDefaults } = useForm<{
        categories: number[];
        brands: number[];
        search: string;
        sort: string;
    }>()

    useEffect(() => {
        if (filter) {
            setData(filter)
        }
    }, [filter])

    function refetchProductsWithFilter(newData: { categories?: number[]; brands?: number[]; search?: string; sort?: string }) {
        const query = newData
        router.get(
            selectGifts.url({query}),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        )
    }
    
    function addCategoryFilter(categoryId: number) {
        const initialCategories = data.categories || [];
        const isACategoryAlreadySelected =  initialCategories.includes(categoryId);
        if (!isACategoryAlreadySelected) {
            const newCategories = [...initialCategories, categoryId];
            const query = { categories: newCategories, brands: data.brands || [], sort: data.sort };
            refetchProductsWithFilter(query);
            setData('categories', newCategories);
        }
    }

    function removeCategoryFilter(categoryId: number) {
        const updatedCategories = data.categories.filter(id => String(id) !== String(categoryId));
        const query = { categories: updatedCategories, brands: data.brands || [], sort: data.sort };
        refetchProductsWithFilter(query);
        setData('categories', updatedCategories);
    }

    function addBrandFilter(brandId: number) {
        const initialBrands = data.brands || [];
        const isABrandAlreadySelected = initialBrands.includes(brandId);
        if (!isABrandAlreadySelected) {
            const query = { categories: data.categories || [], brands: [...initialBrands, brandId], sort: data.sort };
            refetchProductsWithFilter(query);
            setData('brands', [...initialBrands, brandId]);
        }
    }

    function removeBrandFilter(brandId: number) {
        const updatedBrands = data.brands.filter(id => String(id) !== String(brandId));
        const query = { categories: data.categories || [], brands: updatedBrands, sort: data.sort };
        refetchProductsWithFilter(query);
        setData('brands', updatedBrands);
    }

    function addSearchFilter(searchTerm: string) {
        setData('search', searchTerm);
        refetchProductsWithFilter({ categories: data.categories || [], brands: data.brands || [], search: searchTerm, sort: data.sort });
    }

    const debouncedAddSearchFilter = React.useCallback(debounce((value: string) => {
            addSearchFilter(value);
        }, 700), []);

    
    function addFilter(type: 'category' | 'brand' | 'search', value: number | string) {
        if (type === 'category') {
            addCategoryFilter(value as number);
        } else if (type === 'brand') {
            addBrandFilter(value as number);
        } else {
            debouncedAddSearchFilter(value as string);
        }
    }

    
    function removeFilter(type: 'category' | 'brand' | 'search', value: number | string) {
        if (type === 'category') {
            removeCategoryFilter(value as number);
        } else if (type === 'brand') {
            removeBrandFilter(value as number);
        } else {
            setData('search', '');
        }
    }

    const { 
        cartItems, 
        addToCart, 
        updateCartQuantity, 
        removeFromCart, 
        handleContinue 
    } = useRegistryCartHook({ 
        registryId, 
        initialCartItems: auth?.user ? initialCartItems : [],
        user: auth?.user,
        isRegistryComplete
    });

    function handleAddToCart(product: iProduct) {
        addToCart(product);
    }

    function handleBuyNow(product: iProduct) {
        if (product.affiliate_link) {
            window.open(product.affiliate_link, '_blank');
        }
    }

    function handleSortChange(sort: string) {
        setData('sort', sort);
        refetchProductsWithFilter({ categories: data.categories || [], brands: data.brands || [], search: data.search, sort });
    }

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <Navbar showRegistryBreadcrumbs={auth?.user} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto flex lg:gap-8 px-4 py-6">
                <div className="flex-1">
                    <ProductListLayout
                        categories={categories}
                        brands={brands}
                        products={products}
                        registryId={registryId}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        addFilter={addFilter}
                        removeFilter={removeFilter}
                        showHero={true}
                        filterValues={data}
                        onSortChange={handleSortChange}
                    />
                </div>

                {/* Only show cart if user is authenticated */}
                {auth?.user && (
                    <RegistryCart
                        registryTitle={registryTitle}
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