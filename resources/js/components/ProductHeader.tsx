import React from 'react';
import { MapPin } from 'lucide-react';

interface ProductHeaderProps {
    name: string;
    price: number;
    formatted_price?: string;
    merchant?: {
        name: string;
        location: string;
    };
}

export default function ProductHeader({ name, price, formatted_price, merchant }: ProductHeaderProps) {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[oklch(0.145_0_0)] leading-tight mb-3">
                    {name}
                </h1>
                
                <div className="mb-4">
                    <span className="font-serif text-3xl lg:text-4xl font-bold text-[#889966]">
                        {formatted_price || `Rp ${price.toLocaleString('id-ID')}`}
                    </span>
                </div>
            </div>

            {merchant && (
                <div className="border-t border-[oklch(0.922_0_0)] pt-4">
                    <div className="space-y-2">
                        <div>
                            <p className="text-lg font-semibold text-[oklch(0.145_0_0)]">{merchant.name}</p>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{merchant.location}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}