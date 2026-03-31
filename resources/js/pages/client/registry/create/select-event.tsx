import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import CategoryCard from '@/components/CategoryCard';
import RegistryFormModal from '@/components/RegistryFormModal';
import { selectGifts, storeRegistry } from '@/routes/create-registry';
import { EventCategory } from '@/types/response';


export default function CreateRegistry({ events }: { events: Array<EventCategory> }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');

    const handleEventSelect = (eventId: string) => {
        setSelectedEvent(eventId);
        setTimeout(() => {
            setIsModalOpen(true);
        }, 300); // Optional: Add a slight delay for better UX
    };

    const handleModalSuccess = (data: any) => {
        // Navigate to next step after successful registry creation
        router.visit(selectGifts.url());
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title="Create Registry - Tentukan Acara" />
            
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={1} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-12">
                {/* Page Title */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tentukan Acara Registry Kamu
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Pilih jenis acara untuk registry kamu. Setiap kategori memiliki rekomendasi hadiah yang berbeda.
                    </p>
                </div>

                {/* Category Selection Grid */}
                <div className="max-w-6xl mx-auto">
                    {/* Desktop: 4-column horizontal grid */}
                    <div className="hidden md:grid md:grid-cols-4 gap-6">
                        {events.map((event) => (
                            <CategoryCard
                                key={event.id}
                                title={event.name}
                                imageUrl={event.background_image}
                                onClick={() => handleEventSelect(event.id)}
                            />
                        ))}
                    </div>

                    {/* Mobile: vertical list */}
                    <div className="md:hidden space-y-4">
                        {events.map((event) => (
                            <CategoryCard
                                key={event.id}
                                title={event.name}
                                imageUrl={event.background_image}
                                onClick={() => handleEventSelect(event.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Helper Text */}
                <div className="text-center mt-8 md:mt-12">
                    <p className="text-gray-500 text-sm">
                        Tidak menemukan kategori yang sesuai? 
                        <a href="#" className="text-[#889966] hover:underline ml-1">
                            Hubungi kami
                        </a>
                    </p>
                </div>
            </main>

            {/* Registry Form Modal */}
            <RegistryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventId={selectedEvent}
                onSuccess={handleModalSuccess}
            />
        </div>
    );
}