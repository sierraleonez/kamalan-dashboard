import React from 'react';
import type { iProduct } from '@/components/layout/product-list';
import { LandingProductCard } from '@/components/LandingProductCard';
import { Button } from '@/components/ui/button';

interface ProductSliderProps {
    products: iProduct[];
    onViewAll: () => void;
}

export default function ProductSlider({ products, onViewAll }: ProductSliderProps) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-16 overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 mb-12">
                <div className="text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[oklch(0.145_0_0)] mb-4">
                        Pilihan Hadiah Terbaik
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Temukan hadiah sempurna untuk momen spesial Anda
                    </p>
                </div>
            </div>

            {/* Product Slider */}
            <div className="relative">
                <style>{`
                    @keyframes slide {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    .animate-slide {
                        animation: slide 5s linear infinite;
                    }
                    .animate-slide:hover {
                        animation-play-state: paused;
                    }
                `}</style>
                
                <div className="flex gap-6 animate-slide">
                    {/* Duplicate the products array twice for seamless loop */}
                    {[...products, ...products].map((product: iProduct, index: number) => (
                        <div 
                            key={`${product.id}-${index}`}
                            className="flex-shrink-0 w-[calc(50%-0.75rem)] md:w-[calc(20%-1.2rem)]"
                        >
                            <LandingProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
                <Button 
                    onClick={onViewAll}
                    size="lg"
                    className="bg-[#BBCC77] hover:bg-[#A3B18A] text-white px-8 py-6 text-lg font-semibold"
                >
                    Lihat Lebih Banyak
                </Button>
            </div>
        </section>
    );
}
