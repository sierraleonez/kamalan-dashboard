import React from 'react';
import { Gift, Calendar, Share2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { home, product } from '@/routes';

interface HeroSectionProps {
    onClickCreateRegistry: () => void;
}

export default function HeroSection({ onClickCreateRegistry }: HeroSectionProps) {
    const steps = [
        {
            number: 1,
            title: "Tentukan Acara",
            description: "Pilih jenis acara dan tanggal yang tepat",
            icon: Calendar
        },
        {
            number: 2,
            title: "Pilih Hadiah", 
            description: "Kurasi koleksi hadiah sesuai selera",
            icon: Gift
        },
        {
            number: 3,
            title: "Bagikan",
            description: "Share registry kepada keluarga & teman",
            icon: Share2
        }
    ];

    function redirectToProducts() {
        onClickCreateRegistry()
    }

    return (
        <section className="relative">
            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&h=1000&fit=crop"
                    alt="Artisanal gift collection"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Hero Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                        <h1 className="font-serif text-white text-4xl md:text-6xl font-bold mb-4">
                            Gift Registry
                        </h1>
                        <p className="text-lg text-white md:text-xl mb-8 max-w-2xl mx-auto">
                            Wujudkan momen istimewa dengan koleksi hadiah pilihan yang dipersonalisasi untuk setiap acara
                        </p>
                        <button onClick={redirectToProducts} className="bg-[#889966] hover:bg-[#7A8A5C] text-[oklch(0.985_0_0)] font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                            Buat Registry
                        </button>
                    </div>
                </div>
            </div>

            {/* Steps Section */}
            <div className="bg-[oklch(1_0_0)] py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step) => {
                            const IconComponent = step.icon;
                            return (
                                <div key={step.number} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#889966] text-[oklch(0.985_0_0)] rounded-full mb-4">
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center justify-center mb-3">
                                        <span className="bg-[#889966] text-[oklch(0.985_0_0)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                                            {step.number}
                                        </span>
                                        <h3 className="font-serif text-xl font-semibold text-[oklch(0.145_0_0)]">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="text-center mt-12">
                        <button className="bg-[#889966] hover:bg-[#7A8A5C] text-[oklch(0.985_0_0)] font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg">
                            Mulai Buat Registry
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}