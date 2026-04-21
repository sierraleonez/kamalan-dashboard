import React from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistryCard from '@/components/RegistryCard';
import { ShareRegistryResponse } from '@/types/response';
import { ArrowLeft, Edit, Share2, ExternalLink } from 'lucide-react';
import { myRegistriesindex } from '@/routes';


interface Props {
    registry: ShareRegistryResponse;
}

export default function RegistryShow({ registry }: Props) {
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
                        Back to My Registries
                    </button>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{registry.name}</h1>
                            <p className="text-muted-foreground mt-2">
                                Event: {registry.event.name} • Date: {registry.formatted_date}
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            {registry.magic_link && (
                                <>
                                    <button
                                        onClick={handleViewPublic}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Public
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </>
                            )}
                            <button
                                onClick={handleEdit}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Registry Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Registry Card */}
                    <div className="lg:col-span-1">
                        <RegistryCard registryData={registry} />
                    </div>
                    
                    {/* Right Column - Additional Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                            <h2 className="text-2xl font-semibold mb-4">Registry Details</h2>
                            
                            {/* Event Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Event Information</h3>
                                <div className="space-y-2 text-muted-foreground">
                                    <p><span className="font-medium text-foreground">Event Type:</span> {registry.event.name}</p>
                                    <p><span className="font-medium text-foreground">Date:</span> {registry.formatted_date}</p>
                                </div>
                            </div>
                            
                            {/* Delivery Information */}
                            {registry.delivery_info && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2">Delivery Information</h3>
                                    <div className="space-y-2 text-muted-foreground">
                                        <p><span className="font-medium text-foreground">Recipient:</span> {registry.delivery_info.receiver_name}</p>
                                        <p><span className="font-medium text-foreground">Phone:</span> {registry.delivery_info.phone_number}</p>
                                        <p><span className="font-medium text-foreground">Address:</span> {registry.delivery_info.address}</p>
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
                                    Total items in registry: <span className="font-semibold text-foreground">{registry.products.length}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
