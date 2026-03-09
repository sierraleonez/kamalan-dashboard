import React from 'react';

interface ProductDescriptionProps {
    description?: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
    const defaultDescription = "Experience the finest selection of premium products carefully curated to bring joy to your special moments. Our hampers combine traditional craftsmanship with modern elegance.";
    
    const features = [
        "Premium quality ingredients sourced locally",
        "Beautiful gift packaging included",
        "Perfect for special occasions and celebrations",
        "Supports local Indonesian artisans",
        "Satisfaction guaranteed"
    ];

    return (
        <div className="space-y-6 border-t border-[oklch(0.922_0_0)] pt-6">
            <div>
                <h2 className="font-serif text-xl font-semibold text-[oklch(0.145_0_0)] mb-3">
                    Product Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {description || defaultDescription}
                </p>
            </div>

            <div>
                <h3 className="font-serif text-lg font-semibold text-[oklch(0.145_0_0)] mb-3">
                    What's Included
                </h3>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-[#889966] mr-3 mt-1">•</span>
                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}