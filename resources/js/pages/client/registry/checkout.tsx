import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Heart } from 'lucide-react';
import { ShareRegistryResponse } from '@/types/response';

interface CheckoutPageProps {
    registry: ShareRegistryResponse;
}

export default function CheckoutPage({ registry }: CheckoutPageProps) {
    const [isCopied, setIsCopied] = useState(false);

    // Format delivery information
    const deliveryInfo = `${registry.delivery_info.receiver_name}
${registry.delivery_info.phone_number}
${registry.delivery_info.address}
${registry.delivery_info.subdistrict}, ${registry.delivery_info.district}
${registry.delivery_info.city}, ${registry.delivery_info.province}
${registry.delivery_info.postal_code}
${registry.delivery_info.notes ? `\nCatatan: ${registry.delivery_info.notes}` : ''}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(deliveryInfo);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleProductClick = (affiliateLink?: string) => {
        if (affiliateLink) {
            window.open(affiliateLink, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title={`Checkout - ${registry.name}`} />
            
            {/* Header */}
            <Navbar showRegistryBreadcrumbs={false} />

            {/* Main Content */}
            <div className="max-w-screen-lg mx-auto px-4 py-8">
                <Card className="bg-card border-border shadow-lg overflow-hidden p-6 md:p-8">
                    {/* Thank You Message */}
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Terima kasih atas hadiahmu!
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Hadiah darimu sangat berarti untuk kami
                        </p>
                    </div>

                    {/* Registry Photo */}
                    <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-8">
                        <img
                            src={registry.delivery_info.photo_url}
                            alt={registry.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Checkout Instructions */}
                    <div className="mb-8">
                        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                            Instruksi Checkout
                        </h2>
                        <div className="bg-secondary p-6 rounded-lg space-y-3">
                            <p className="text-foreground leading-relaxed">
                                1. Silakan klik pada produk di bawah untuk membeli melalui link affiliate
                            </p>
                            <p className="text-foreground leading-relaxed">
                                2. Salin informasi pengiriman yang tersedia
                            </p>
                            <p className="text-foreground leading-relaxed">
                                3. Gunakan informasi tersebut saat checkout di toko merchant
                            </p>
                            <p className="text-foreground leading-relaxed">
                                4. Pastikan barang dikirim ke alamat yang tertera
                            </p>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="mb-8">
                        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                            Informasi Pengiriman
                        </h2>
                        <div className="relative">
                            <Textarea
                                value={deliveryInfo}
                                readOnly
                                className="min-h-[200px] font-mono text-sm"
                            />
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                            >
                                {isCopied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Tersalin
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Salin
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Product List */}
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-primary" />
                            Daftar Produk
                        </h2>
                        <div className="space-y-3">
                            {registry.products.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleProductClick(item.affiliate_link)}
                                    className={`flex items-center gap-3 p-4 bg-secondary rounded-lg transition-colors ${
                                        item.affiliate_link
                                            ? 'cursor-pointer hover:bg-secondary/80'
                                            : 'cursor-default'
                                    }`}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    <img
                                        src={item.display_image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between gap-2">
                                            <h4 className="text-base font-medium text-foreground truncate">
                                                {item.name}
                                            </h4>
                                            <h4 className="text-base font-medium text-foreground whitespace-nowrap">
                                                {item.formatted_price}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-primary font-semibold">
                                            x{item.pivot.quantity}
                                        </p>
                                        {item.affiliate_link && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Klik untuk beli
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
