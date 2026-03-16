import React from 'react';

interface ProductImageProps {
    src: string;
    alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
    return (
        <div className="w-full">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-[oklch(0.922_0_0)]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>
    );
}