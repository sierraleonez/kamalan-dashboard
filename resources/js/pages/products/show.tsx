import React from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface Merchant {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description?: string;
    display_image?: string;
    price: number;
    category?: Category;
    merchant?: Merchant;
}

interface Props {
    product: Product;
}

export default function ProductShow({ product }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Product Details', href: `/products/${product.id}` }]}> 
            <div className="max-w-lg mx-auto mt-8 bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <div className="mb-2">
                    <span className="font-semibold">Description:</span> {product.description || '-'}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Display Image:</span> {product.display_image ? (
                        <img src={product.display_image} alt={product.name} className="h-24 mt-2" />
                    ) : '-'}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Price:</span> {product.price}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Category:</span> {product.category?.name || '-'}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Merchant:</span> {product.merchant?.name || '-'}
                </div>
            </div>
        </AppLayout>
    );
}
