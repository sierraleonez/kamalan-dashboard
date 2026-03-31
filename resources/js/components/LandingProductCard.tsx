import React from 'react';
import { router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { iProduct } from '@/components/layout/product-list';
import products from '@/routes/products';

interface LandingProductCardProps {
    product: iProduct;
}

export function LandingProductCard({ product }: LandingProductCardProps) {
    const handleClick = () => {
        router.visit(products.show(product.id).url);
    };

    return (
        <Card 
            onClick={handleClick}
            className="group bg-white overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.display_image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-3">
                <h3 className="font-inter font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                </h3>
                <p className="text-lg font-bold text-[#A3B18A] mb-1">
                    {product.formatted_price || `Rp ${product.price.toLocaleString('id-ID')}`}
                </p>
                <p className="text-xs text-gray-600">Kamalan</p>
            </div>
        </Card>
    );
}
