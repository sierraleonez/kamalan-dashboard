import React from 'react';
import { ExternalLink, ShoppingBag, Check } from 'lucide-react';
import { ViewMode } from '@/types';

interface PurchaseButtonProps {
    affiliate_link?: string;
    productName: string;
    onAddToCart?: () => void;
    productId?: number;
    isInCart?: boolean;
    viewMode?: ViewMode;
    receiverName?: string;
}

export default function PurchaseButton({ affiliate_link, productName, onAddToCart, productId, isInCart, viewMode, receiverName }: PurchaseButtonProps) {
    const handlePurchaseClick = () => {
        if (viewMode === 'store') {
            window.open(affiliate_link, '_blank', 'noopener,noreferrer');
            return
        }

        if (onAddToCart) {
            onAddToCart();
        } else if (affiliate_link) {
            window.open(affiliate_link, '_blank', 'noopener,noreferrer');
        } else {
            // Fallback action if no affiliate link
            console.log(`Purchase clicked for: ${productName}`);
        }
    };
    const buttonLabel = determineLabel(viewMode, isInCart, receiverName);

    return (
        <div className="space-y-4 border-t border-[oklch(0.922_0_0)] pt-6">
            <button
                onClick={handlePurchaseClick}
                className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center space-x-2 ${
                    isInCart 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-[#889966] hover:bg-[#7A8A5C] text-white'
                }`}
            >
                {isInCart && <Check className="w-5 h-5" />}
                <span className="text-lg text-white">
                    {buttonLabel}
                </span>
            </button>
            
        </div>
    );
}

function determineLabel(viewMode: ViewMode | undefined, isInCart: boolean | undefined, receiverName?: string): string {
    switch(viewMode) {
        case 'select-gift':
            return isInCart ? 'Sudah di Registry' : 'Tambahkan ke Registry';
        case 'share-registry':
            return `Belikan untuk ${receiverName || '...'}`;

        default:
            return 'Beli Sekarang';
    }
}