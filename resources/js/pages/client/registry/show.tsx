import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistryCard from '@/components/RegistryCard';
import { ShareRegistryResponse } from '@/types/response';
import { ArrowLeft, Edit, Share2, ExternalLink, Trash2 } from 'lucide-react';
import { myRegistriesindex } from '@/routes';
import { addGiftToCart } from '@/actions/App/Http/Controllers/Client/RegistryGiftCartController';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';


interface Props {
    registry: ShareRegistryResponse;
}

export default function RegistryShow({ registry }: Props) {
    const isRegistryComplete = registry.delivery_info !== null;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleBack = () => {
        router.visit(myRegistriesindex().url);
    };

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit registry:', registry.id);
    };

    const handleShare = () => {
        // TODO: Implement share functionality
        if (registry.magic_link) {
            const publicUrl = window.location.origin + `/registry/${registry.magic_link}`;
            navigator.clipboard.writeText(publicUrl);
            alert('Registry link copied to clipboard!');
        }
    };

    const handleViewPublic = () => {
        if (registry.magic_link) {
            window.open(`/registry/${registry.magic_link}`, '_blank');
        }
    };

    function handleDeleteRegistryItem(productId: number, registryId: number) {
        router.delete(addGiftToCart.url(), {
            data: { product_id: productId, registry_id: registryId },
            preserveScroll: true,
        });
    }

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title={`${registry.name} - My Registries`} />

            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Registry-Ku
                    </button>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{registry.name}</h1>
                        </div>

                        <div className="flex gap-2">
                            {isRegistryComplete && (
                                <>
                                    <button
                                        onClick={handleViewPublic}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Pratinjau
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Bagikan
                                    </button>
                                    <button
                                        onClick={handleEdit}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setShowDeleteDialog(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>

                {/* Registry Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Registry Card */}
                    <div className="lg:col-span-1">
                        <RegistryCard
                            showUpdateWishlistButton
                            showDeleteItemButton
                            onDeleteItem={(productId) => handleDeleteRegistryItem(productId, registry.id)} registryData={registry}
                        />
                    </div>

                    {/* Right Column - Additional Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                            <h2 className="text-2xl font-semibold mb-4">Detail Registry</h2>

                            {/* Event Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Informasi Acara</h3>
                                <div className="space-y-2 text-muted-foreground">
                                    <p><span className="font-medium text-foreground">Jenis Acara</span> {registry.event.name}</p>
                                    <p><span className="font-medium text-foreground">Tanggal</span> {registry.formatted_date}</p>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            {registry.delivery_info && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2">Informasi Pengiriman</h3>
                                    <div className="space-y-2 text-muted-foreground">
                                        <p><span className="font-medium text-foreground">Penerima</span> {registry.delivery_info.receiver_name}</p>
                                        <p><span className="font-medium text-foreground">Telepon</span> {registry.delivery_info.phone_number}</p>
                                        <p><span className="font-medium text-foreground">Alamat</span> {registry.delivery_info.address}</p>
                                        <p className="text-sm">
                                            {registry.delivery_info.subdistrict}, {registry.delivery_info.district}, {registry.delivery_info.city}, {registry.delivery_info.province} {registry.delivery_info.postal_code}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Products Summary */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Gift Summary</h3>
                                <p className="text-muted-foreground">
                                    Jumlah hadiah di Registry <span className="font-semibold text-foreground">{registry.products.length}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Registry</DialogTitle>
                        <DialogDescription>Apakah kamu yakin ingin menghapus registry ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button className="px-4 py-2 text-sm rounded-lg border">Batal</button>
                        </DialogClose>
                        <button
                            onClick={() => router.delete(`/my-registries/${registry.id}`)}
                            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                            Hapus
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
