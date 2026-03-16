import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Heart } from 'lucide-react';
import { ShareRegistryResponse } from '@/types/response';
import { router } from '@inertiajs/react';
import products from '@/routes/products';

interface WishListItem {
    id: number;
    name: string;
    price: number;
    image: string;
    priority: number;
}

interface RegistryData {
    name: string;
    date: string;
    photo: string;
    greeting: string;
    wishList: WishListItem[];
    registryUrl: string;
}

interface RegistryCardProps {
    registryData: ShareRegistryResponse;
    isMobile?: boolean;
}

export default function RegistryCard({ registryData, isMobile = false }: RegistryCardProps) {
    function openProductDetail(productId: number) {
        const params = { query: { registry_id: registryData.id } };
        const url = products.show(productId, params).url;
        window.open(url, '_blank');
    }
    if (isMobile) {
        return (
            <div className="max-w-sm mx-auto">
                <Card className="bg-[--card] border-[--border] shadow-lg overflow-hidden">
                    {/* Registry Photo */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={registryData.delivery_info.photo_url}
                            alt="Registry"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Registry Content */}
                    <div className="p-4 space-y-3">
                        {/* Registry Name */}
                        <h2 className="text-xl font-serif text-[--foreground] text-center leading-tight">
                            {registryData.name}
                        </h2>
                        
                        {/* Registry Date */}
                        <div className="flex items-center justify-center gap-2 text-[--muted-foreground]">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">{registryData.formatted_date}</span>
                        </div>
                        
                        {/* Greeting */}
                        <div className="text-sm text-[--muted-foreground] leading-relaxed">
                            {registryData.delivery_info.greeting}
                        </div>
                        
                        {/* Wish List */}
                        <div className="space-y-2">
                            <h3 className="text-base font-serif text-[--foreground] flex items-center gap-2">
                                <Heart className="w-4 h-4 text-[--primary]" />
                                Wish List
                            </h3>
                            
                            <div className="space-y-2">
                                {registryData.products.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => openProductDetail(item.id)}
                                        className="flex items-center gap-2 p-2 bg-[--secondary] rounded-lg cursor-pointer hover:bg-[--secondary]/80 transition-colors"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 bg-[--primary] text-[--primary-foreground] rounded-full flex items-center justify-center text-xs font-semibold">
                                            {index + 1}
                                        </div>
                                        <img
                                            src={item.display_image}
                                            alt={item.name}
                                            className="w-8 h-8 object-cover rounded"
                                        />
                                        <div className="flex-grow min-w-0">
                                            <h4 className="text-xs font-medium text-[--foreground] truncate">
                                                {item.name} x{item.pivot.quantity}
                                            </h4>
                                            <p className="text-xs text-[--primary] font-semibold">
                                                {item.formatted_price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="sticky top-8">
            <Card className="max-w-sm pt-0 mx-auto bg-[--card] border-[--border] shadow-lg overflow-hidden">
                {/* Registry Photo */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={registryData.delivery_info.photo_url}
                        alt="Registry"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Registry Content */}
                <div className="p-6 pt-2 space-y-4">
                    {/* Registry Name */}
                    <h2 className="text-2xl font-serif text-[--foreground] text-center leading-tight">
                        {registryData.name}
                    </h2>
                    
                    {/* Registry Date */}
                    <div className="flex items-center justify-center gap-2 text-[--muted-foreground]">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{registryData.formatted_date}</span>
                    </div>
                    
                    {/* Greeting */}
                    <div className="text-sm text-[--muted-foreground] leading-relaxed">
                        {registryData.delivery_info.greeting}
                    </div>
                    
                    {/* Wish List */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-serif text-[--foreground] flex items-center justify-center gap-2">
                            <Heart className="w-5 h-5 text-[--primary]" />
                            Wish List
                        </h3>
                        
                        <div className="space-y-2">
                            {registryData.products.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => openProductDetail(item.id)}
                                    className="flex items-center gap-3 py-3 bg-[--secondary] rounded-lg cursor-pointer hover:bg-[--secondary]/80 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-[--primary] text-[--primary-foreground] rounded-full flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    <img
                                        src={item.display_image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between">
                                            <h4 className="text-sm font-medium text-[--foreground] truncate">
                                                {item.name}
                                            </h4>
                                            <h4 className="text-sm font-medium text-[--foreground] truncate">
                                                {item.formatted_price}
                                                
                                            </h4>
                                        </div>
                                        <p className="text-xs text-[--primary] font-semibold">
                                            x{item.pivot.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}