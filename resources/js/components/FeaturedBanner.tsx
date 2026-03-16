import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeaturedBannerProps {
    title?: string;
    subtitle?: string;
    image?: string;
    ctaText?: string;
}

export default function FeaturedBanner({ 
    title = "Baby Shower Collection",
    subtitle = "Bulan Ini di Kamalan",
    image = "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&h=600&fit=crop",
    ctaText = "Lihat Koleksi"
}: FeaturedBannerProps) {
    return (
        <section className="py-16 bg-[oklch(1_0_0)]">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#889966]/10 to-[#889966]/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 lg:p-12">
                            <div className="mb-4">
                                <span className="inline-block bg-[#889966] text-[oklch(0.985_0_0)] px-4 py-2 rounded-full text-sm font-medium mb-4">
                                    {subtitle}
                                </span>
                            </div>
                            
                            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[oklch(0.145_0_0)] mb-4">
                                {title}
                            </h2>
                            
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Rayakan momen istimewa kedatangan buah hati dengan koleksi hadiah pilihan 
                                yang penuh makna dan berkualitas tinggi.
                            </p>
                            
                            <div>
                                <button className="inline-flex items-center bg-[#889966] hover:bg-[#7A8A5C] text-[oklch(0.985_0_0)] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg group">
                                    {ctaText}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover lg:absolute lg:inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}