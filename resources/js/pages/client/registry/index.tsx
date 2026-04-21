import React from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistryCard from '@/components/RegistryCard';
import { ShareRegistryResponse } from '@/types/response';
import { Plus } from 'lucide-react';
import createRegistry from '@/routes/create-registry';
import myRegistries from '@/routes/registry/index';
import { myRegistriesshow } from '@/routes';

interface Props {
    registries: ShareRegistryResponse[];
}

export default function RegistryIndex({ registries }: Props) {
    const handleCreateRegistry = () => {
        router.visit(createRegistry.selectGifts.url());
    };
    const handleRegistryClick = (registryId: number) => {
        router.visit(   myRegistriesshow.url(registryId));
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title="My Registries - Kamalan" />
            
            <Navbar />
            
            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">My Registries</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage and view all your gift registries
                        </p>
                    </div>
                    <button
                        onClick={handleCreateRegistry}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Registry
                    </button>
                </div>

                {/* Registry List */}
                {registries.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="mb-4">
                                <svg
                                    className="mx-auto h-24 w-24 text-muted-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                No Registries Yet
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                You haven't created any gift registries yet. Start by creating your first registry!
                            </p>
                            <button
                                onClick={handleCreateRegistry}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Registry
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {registries.map((registry) => (
                            <div
                                key={registry.id}
                                onClick={() => handleRegistryClick(registry.id)}
                                className="cursor-pointer transition-transform hover:scale-[1.02]"
                            >
                                <RegistryCard registryData={registry} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
}
