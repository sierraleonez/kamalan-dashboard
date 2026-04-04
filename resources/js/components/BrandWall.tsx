import React from 'react';
import { router } from '@inertiajs/react';

interface Brand {
    name: string;
    logo: string;
    website?: string;
}

interface Merchant {
    id: number;
    name: string;
    shop_location?: string;
    shopee_link?: string;
    tokped_link?: string;
    merchant_icon_url?: string;
}

interface BrandWallProps {
    brands?: Brand[];
    merchants?: Merchant[];
}

export default function BrandWall({ brands, merchants }: BrandWallProps) {
    const defaultBrands: Brand[] = [
        { name: "Dr. Browns", logo: "/images/brand-logo/1.png" },
        { name: "Mooimom Indonesia", logo: "/images/brand-logo/2.png" },
        { name: "Natural Moms", logo: "/images/brand-logo/3.png" },
        { name: "Cocolatte Indonesia", logo: "/images/brand-logo/4.png" },
        { name: "Chicco", logo: "/images/brand-logo/5.png" },
        { name: "Baby Safe Indonesia", logo: "/images/brand-logo/6.png" },
        { name: "Sugar Baby", logo: "/images/brand-logo/7.png" },
        { name: "Boonaboo Indonesia", logo: "/images/brand-logo/8.png" },
        { name: "Fox and Bunny", logo: "/images/brand-logo/9.png" }
    ];

    // Use merchants if provided, otherwise fall back to brands or defaultBrands
    const displayMerchants = merchants && merchants.length > 0;
    const brandsToShow = brands || defaultBrands;

    const handleMerchantClick = (merchantId: number) => {
        router.visit(`/merchant/${merchantId}`);
    };

    return (
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[oklch(0.145_0_0)] mb-4">
                        Rekan Kamalan
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Berkolaborasi dengan brand-brand terpercaya untuk menghadirkan pengalaman terbaik
                    </p>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {displayMerchants ? (
                        // Display actual merchants with click functionality
                        merchants!.map((merchant) => (
                            <button
                                key={merchant.id}
                                onClick={() => handleMerchantClick(merchant.id)}
                                className="flex items-center justify-center py-2 bg-white rounded-lg hover:shadow-lg transition-all duration-300 border border-[oklch(0.922_0_0)] cursor-pointer group"
                            >
                                <div className="w-full  flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-32 h-24 rounded mx-auto mb-2 flex items-center justify-center">
                                            <img 
                                                src={merchant.merchant_icon_url || '/images/icons/kama-love.svg'} 
                                                alt={`${merchant.name} icon`} 
                                                className="object-contain max-w-full max-h-full"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium group-hover:text-[#889966] transition-colors">
                                            {merchant.name}
                                        </p>
                                        {merchant.shop_location && (
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {merchant.shop_location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))
                    ) : (
                        // Display placeholder brands (non-clickable)
                        brandsToShow.map((brand, index) => (
                            <div 
                                key={index} 
                                className="flex items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition-shadow duration-300 border border-[oklch(0.922_0_0)]"
                            >
                                <div className="w-full p-3 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-16 rounded mx-auto mb-2 flex items-center justify-center">
                                            <img 
                                                src={brand.logo} 
                                                alt={`${brand.name} logo`} 
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">
                                            {brand.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Partnership CTA */}
                <div className="text-center mt-12 p-8 bg-white rounded-xl border border-[oklch(0.922_0_0)]">
                    <h3 className="font-serif text-xl font-semibold text-[oklch(0.145_0_0)] mb-3">
                        Tertarik Bermitra dengan Kamalan?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Bergabunglah dengan ekosistem Kamalan dan hadirkan produk terbaik untuk pelanggan kami
                    </p>
                    <button className="border border-[#889966] text-[#889966] hover:bg-[#889966] hover:text-[oklch(0.985_0_0)] font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                        Hubungi Kami
                    </button>
                </div>
            </div>
        </section>
    );
}