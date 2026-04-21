import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import RegistryCard from "@/components/RegistryCard";
import { ShareRegistryResponse } from "@/types/response";
import { Head } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

interface PageProps {
    registry: ShareRegistryResponse;
};

export default function PublicRegistry(props: PageProps) {
    const registryData = props?.registry;
    const [isCopied, setIsCopied] = useState(false);

    // Format delivery information
    const deliveryInfo = `${registryData.delivery_info.receiver_name}
${registryData.delivery_info.phone_number}
${registryData.delivery_info.address}
${registryData.delivery_info.subdistrict}, ${registryData.delivery_info.district}
${registryData.delivery_info.city}, ${registryData.delivery_info.province}
${registryData.delivery_info.postal_code}
${registryData.delivery_info.notes ? `\nCatatan: ${registryData.delivery_info.notes}` : ''}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(deliveryInfo);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <Head />
            <Navbar />

            <div className="py-8 px-4">
                {/* Hero Text */}
                <div className="text-center mb-8">
                    <p className="text-lg text-[--primary] font-medium">
                        {registryData?.delivery_info?.receiver_name} membagikan registry ini dengan kamu
                    </p>
                </div>

                <RegistryCard showReserveButton={true} registryData={registryData} />

                {/* Delivery Information Section */}
                <div className="max-w-2xl mx-auto mt-8">
                    <Card className="bg-card border-border shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-serif text-2xl font-semibold text-[--foreground]">
                                Informasi Pengiriman
                            </h2>
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
                        <Textarea
                            value={deliveryInfo}
                            readOnly
                            className="min-h-[200px] font-mono text-sm bg-[--background] border-[--border] text-[--foreground]"
                        />
                    </Card>
                </div>
            </div>
        </>
    )
}