import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';
import { MapPin, ExternalLink } from 'lucide-react';

interface Merchant {
    id: number;
    name: string;
    description?: string;
    shop_location?: string;
    shopee_link?: string;
    tokped_link?: string;
}

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
    merchant: Merchant;
    products: iPaginatedResponse<iProduct>;
}

export default function MerchantShow({ merchant, products }: PageProps) {
    const handleAddToCart = (product: iProduct) => {
        console.log('Product clicked:', product);
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${merchant.name} - Kamalan`} />

            {/* Navbar */}
            <Navbar />

            {/* Merchant Detail Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Merchant Icon/Logo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-white rounded-2xl shadow-md flex items-center justify-center border-2 border-gray-100">
                                {/* Placeholder for merchant icon - can be replaced with actual image */}
                                <img
                                    src={merchant.merchant_icon_url || '/images/default-merchant-icon.png'}
                                    alt={`${merchant.name} icon`}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Merchant Info */}
                        <div className="flex-1">
                            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
                                {merchant.name}
                            </h1>
                            
                            {merchant.description && (
                                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                    {merchant.description}
                                </p>
                            )}
                            
                            {/* {merchant.shop_location && (
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg">{merchant.shop_location}</span>
                                </div>
                            )} */}

                            {/* External Links */}
                            {(merchant.shopee_link || merchant.tokped_link) && (
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {merchant.shopee_link && (
                                        <a
                                            href={merchant.shopee_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4D2D] text-white rounded-lg hover:bg-[#d63d1d] transition-colors font-medium"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Kunjungi Toko Shopee
                                        </a>
                                    )}
                                    {merchant.tokped_link && (
                                        <a
                                            href={merchant.tokped_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#42B549] text-white rounded-lg hover:bg-[#359c3c] transition-colors font-medium"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Kunjungi Toko Tokopedia
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                        Produk dari {merchant.name}
                    </h2>
                    <p className="text-gray-600">
                        Jelajahi koleksi produk berkualitas dari merchant terpercaya kami
                    </p>
                </div>

                <ProductListLayout
                    products={products}
                    onAddToCart={handleAddToCart}
                    showHero={false}
                    showFilters={false}
                    showSearch={false}
                />
            </div>
        </div>
    );
}
