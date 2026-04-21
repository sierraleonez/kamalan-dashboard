import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import admin from '@/routes/admin';

interface Product {
    id: number;
    name: string;
    price?: number;
}

interface FeaturedProduct {
    id: number;
    product_id: number;
    priority: number;
    product: Product;
}

interface Props {
    featuredProduct: FeaturedProduct;
}

export default function FeaturedProductShow({ featuredProduct }: Props) {
    const formatPrice = (price: number | undefined) => {
        if (!price) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppLayout>
            <Head title={`Featured Product: ${featuredProduct.product.name}`} />
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Featured Product Details</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Product Name</label>
                        <p className="text-lg">{featuredProduct.product.name}</p>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-500">Price</label>
                        <p className="text-lg">{formatPrice(featuredProduct.product.price)}</p>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-500">Priority</label>
                        <p className="text-lg font-semibold">{featuredProduct.priority}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <a
                        href={admin.featuredProducts.edit(featuredProduct.id).url}
                        className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
                    >
                        Edit
                    </a>
                    <a
                        href={admin.featuredProducts.index().url}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                        Back to List
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
