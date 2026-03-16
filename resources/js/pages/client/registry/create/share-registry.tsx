import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, MessageCircle, Mail, Send, Calendar, Heart, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import RegistryCard from '@/components/RegistryCard';
import { DeliveryInfo, EventCategory, GiftCart, Product, Registry, ShareRegistryResponse } from '@/types/response';



interface PageProps {
    registry: ShareRegistryResponse;
};


export default function ShareRegistry(props: PageProps) {
    const registryData = props.registry;
    const deliveryData = props.registry.delivery_info;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(registryData.magic_link);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleWhatsAppShare = () => {
        const message = `Halo! Saya ingin berbagi registry ${registryData.name} dengan Anda. Silakan kunjungi: ${registryData.magic_link}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    const handleGmailShare = () => {
        const subject = `Undangan Registry - ${registryData.name}`;
        const body = `Halo!\n\nSaya ingin berbagi registry ${registryData.name} dengan Anda.\n\n${deliveryData.greeting}\n\nSilakan kunjungi registry kami di: ${registryData.magic_link}\n\nTerima kasih!`;
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
    };

    const handleTelegramShare = () => {
        const message = `Halo! Saya ingin berbagi registry ${registryData.name} dengan Anda. Silakan kunjungi: ${registryData.magic_link}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://t.me/share/url?url=${registryData.magic_link}&text=${encodedMessage}`, '_blank');
    };

    const handleNext = () => {
        // Navigate to next step or completion page
        router.visit('/dashboard');
    };

    return (
        <>
            <Head title="Share Registry - Kamalan" />
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={5} />

            <div className="min-h-screen bg-[--background] py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 lg:items-start">
                        {/* Left Section - Registry Preview */}
                        <RegistryCard registryData={registryData} />

                        {/* Right Section - Sharing Controls */}
                        <div className="space-y-5 mr-8 max-w-2xl">
                            {/* Header */}
                            <div className="text-center lg:text-left">
                                <h1 className="text-2xl lg:text-3xl font-serif text-primary mb-3">
                                    Registry milikmu sempurna dibuat!
                                </h1>
                                <p className="text-[--muted-foreground] text-md">
                                    Share ke teman-temanmu melalui sosial media
                                    yang kamu inginkan atau salin tautan jika ingin
                                    mengirimkan secara manual.
                                </p>
                            </div>

                            {/* URL Input & Copy Button */}
                            <div className="space-y-3">
                                <label htmlFor="registry-url" className="block text-sm font-medium text-[--foreground]">
                                    Link Registry Anda:
                                </label>
                                <div className="flex gap-3">
                                    <Input
                                        id="registry-url"
                                        value={registryData.magic_link}
                                        readOnly
                                        className="flex-1 bg-[--background] border-[--border] text-[--foreground] focus:border-[--primary] focus:ring-[--primary]/20"
                                    />
                                    <Button
                                        onClick={handleCopyUrl}
                                        variant="outline"
                                        className="px-4 border-[--primary] text-[--primary] hover:bg-[--primary] hover:text-[--primary-foreground]"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Tersalin
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Salin Tautan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Social Sharing */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-[--foreground]">Bagikan Registry</h3>

                                <div className="grid grid-cols-3 gap-4">
                                    {/* WhatsApp */}
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="flex flex-col items-center gap-3 p-6 rounded-lg border border-[--border] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <MessageCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-[--foreground]">WhatsApp</span>
                                    </button>

                                    {/* Gmail */}
                                    <button
                                        onClick={handleGmailShare}
                                        className="flex flex-col items-center gap-3 p-6 rounded-lg border border-[--border] hover:border-[#EA4335] hover:bg-[#EA4335]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-12 h-12 bg-[#EA4335] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-[--foreground]">Gmail</span>
                                    </button>

                                    {/* Telegram */}
                                    <button
                                        onClick={handleTelegramShare}
                                        className="flex flex-col items-center gap-3 p-6 rounded-lg border border-[--border] hover:border-[#0088CC] hover:bg-[#0088CC]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-12 h-12 bg-[#0088CC] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Send className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-[--foreground]">Telegram</span>
                                    </button>
                                </div>
                            </div>

                            {/* Next Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={handleNext}
                                    className="w-full lg:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 text-base"
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-8">
                        {/* Registry Preview (Mobile) */}
                        <RegistryCard registryData={registryData} isMobile={true} />

                        {/* Sharing Controls (Mobile) */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="text-center px-4">
                                <h1 className="text-2xl font-serif text-[--foreground] mb-2">
                                    Registry milikmu sempurna dibuat!
                                </h1>
                                <p className="text-[--muted-foreground]">
                                    Sekarang saatnya untuk berbagi dengan keluarga dan teman-teman Anda.
                                </p>
                            </div>

                            {/* URL Input & Copy Button */}
                            <div className="space-y-3 px-4">
                                <label htmlFor="registry-url-mobile" className="block text-sm font-medium text-[--foreground]">
                                    Link Registry Anda:
                                </label>
                                <div className="space-y-3">
                                    <Input
                                        id="registry-url-mobile"
                                        value={registryData.registryUrl}
                                        readOnly
                                        className="w-full bg-[--background] border-[--border] text-[--foreground] focus:border-[--primary] focus:ring-[--primary]/20"
                                    />
                                    <Button
                                        onClick={handleCopyUrl}
                                        variant="outline"
                                        className="w-full border-[--primary] text-[--primary] hover:bg-[--primary] hover:text-[--primary-foreground]"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Tersalin
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Salin Tautan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Social Sharing */}
                            <div className="space-y-4 px-4">
                                <h3 className="text-lg font-semibold text-[--foreground]">Bagikan Registry</h3>

                                <div className="grid grid-cols-3 gap-3">
                                    {/* WhatsApp */}
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[--border] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-[--foreground]">WhatsApp</span>
                                    </button>

                                    {/* Gmail */}
                                    <button
                                        onClick={handleGmailShare}
                                        className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[--border] hover:border-[#EA4335] hover:bg-[#EA4335]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-10 h-10 bg-[#EA4335] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-[--foreground]">Gmail</span>
                                    </button>

                                    {/* Telegram */}
                                    <button
                                        onClick={handleTelegramShare}
                                        className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[--border] hover:border-[#0088CC] hover:bg-[#0088CC]/5 transition-all duration-200 group"
                                    >
                                        <div className="w-10 h-10 bg-[#0088CC] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Send className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-[--foreground]">Telegram</span>
                                    </button>
                                </div>
                            </div>

                            {/* Next Button */}
                            <div className="px-4 pb-6">
                                <Button
                                    onClick={handleNext}
                                    className="w-full bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90 font-semibold py-3 text-base"
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}