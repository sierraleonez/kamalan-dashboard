import React, { useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { selectGifts, storeRegistry } from '@/routes/create-registry';

interface RegistryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: string;
    onSuccess?: (data: any) => void;
}

export default function RegistryFormModal({ isOpen, onClose, categoryId, onSuccess }: RegistryFormModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        date: '',
        category_id: categoryId,
    });
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    useEffect(() => {
        setData('category_id', categoryId);
    }, [categoryId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(storeRegistry.url(), {
            
        })
        
        // router.visit(selectGifts.url())
        // post('/registry/create', {
        //     onSuccess: (response) => {
        //         reset();
        //         onSuccess?.(response);
        //         onClose();
        //     },
        //     onError: () => {
        //         // Errors are automatically handled by Inertia
        //     }
        // });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        Kasih nama registry kamu dulu yuk
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Biar orang orang makin semangat buat kasih hadiah
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Registry Name Field */}
                    <div>
                        <label htmlFor="registry-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Registry *
                        </label>
                        <input
                            type="text"
                            id="registry-name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                            placeholder="Contoh: Registry Pernikahan Sarah & John"
                            required
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Event Date Field */}
                    <div>
                        <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal Acara *
                        </label>
                        <input
                            type="date"
                            min={nextDay.toISOString().split('T')[0]} // Set minimum date to today
                            id="date"
                            value={data.date}
                            onChange={(e) => {
                                const date = new Date(e.target.value).toISOString();
                                const formattedDate = date.split('T')[0];
                                setData('date', formattedDate)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                            required
                        />
                        {errors.date && (
                            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-[#889966] text-[oklch(0.985_0_0)] py-2 px-4 rounded-md hover:bg-[#778855] focus:outline-none focus:ring-2 focus:ring-[#889966] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Membuat...' : 'Buat Registry'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}