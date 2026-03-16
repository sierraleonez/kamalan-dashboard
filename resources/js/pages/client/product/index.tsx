import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';

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
}

export default function ProductList({ products }: PageProps) {
    // No cart functionality - products can be viewed only
    const handleAddToCart = (product: iProduct) => {
        // No cart in this view - could show a message or navigate to product detail
        console.log('Product clicked:', product);
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <ProductListLayout
                    products={products}
                    onAddToCart={handleAddToCart}
                    showHero={true}
                />
            </div>
        </div>
    );
}
