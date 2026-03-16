import React from 'react';
import ProductImage from '@/components/ProductImage';
import ProductHeader from '@/components/ProductHeader';
import ProductDescription from '@/components/ProductDescription';
import PurchaseButton from '@/components/PurchaseButton';
import { ViewMode } from '@/types';
import { DeliveryInfo, Registry } from '@/types/response';

export interface ProductDetailData {
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

interface ProductDetailLayoutProps {
    product: ProductDetailData;
    onAddToCart?: () => void;
    isInCart?: boolean;
    viewMode?: ViewMode;
    registry?: Registry & {delivery_info: DeliveryInfo}; 
}

export default function ProductDetailLayout({ 
    product, 
    onAddToCart,
    registry,
    viewMode = 'store',
    isInCart = false,
}: ProductDetailLayoutProps) {
    const merchant = product.merchant ? {
        name: product.merchant.name,
        location: product.merchant.location || "Jakarta, Indonesia"
    } : {
        name: "Kamalan Premium",
        location: "Jakarta, Indonesia"
    };

    return (
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
                        onAddToCart={onAddToCart}
                        productId={product.id}
                        isInCart={isInCart}
                        viewMode={viewMode}
                        receiverName={registry?.delivery_info?.receiver_name}
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
    );
}
