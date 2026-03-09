import React from 'react';

interface Brand {
    name: string;
    logo: string;
    website?: string;
}

interface BrandWallProps {
    brands?: Brand[];
}

export default function BrandWall({ brands }: BrandWallProps) {
    const defaultBrands: Brand[] = [
        { name: "Tokopedia", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
        { name: "Shopee", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
        { name: "Blibli", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
        { name: "Lazada", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
        { name: "Bukalapak", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
        { name: "Zalora", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" }
    ];

    const brandsToShow = brands || defaultBrands;

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
                    {brandsToShow.map((brand, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition-shadow duration-300 border border-[oklch(0.922_0_0)]"
                        >
                            <div className="w-full h-12 flex items-center justify-center">
                                {/* Placeholder for brand logos */}
                                <div className="text-center">
                                    <div className="w-16 h-8 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                                        <span className="text-xs text-gray-500 font-medium">
                                            {brand.name.substring(0, 3).toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 font-medium">
                                        {brand.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
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