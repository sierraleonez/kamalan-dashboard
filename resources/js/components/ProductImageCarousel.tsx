import React, { useState } from 'react';

interface ProductImageCarouselProps {
    images: string[];
    alt: string;
}

export default function ProductImageCarousel({ images, alt }: ProductImageCarouselProps) {
    const [current, setCurrent] = useState(0);

    if (images.length === 0) return null;

    return (
        <div className="w-full space-y-3">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-[oklch(0.922_0_0)]">
                <img src={images[current]} alt={`${alt} ${current + 1}`} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${i === current ? 'border-gray-800' : 'border-transparent hover:border-gray-300'}`}
                        >
                            <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
