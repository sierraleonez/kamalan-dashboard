import React, { useState } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

type FeaturedMerchant = {
    id: number;
    merchant_id: number;
    priority: number;
    subscription_date_start: string;
    subscription_date_end: string;
    merchant: {
        id: number;
        name: string;
        shop_location?: string;
    };
};

interface Props {
    featuredMerchants: FeaturedMerchant[];
}

export default function FeaturedMerchantList({ featuredMerchants }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(admin.featuredMerchants.destroy(deleteId).url);
        }
        setShowConfirm(false);
        setDeleteId(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout title="Featured Merchants">
            <div className="flex justify-between items-center mb-4 p-4">
                <h1 className="text-2xl font-bold">Featured Merchants</h1>
                <div className="flex gap-2">
                    <a 
                        href={admin.featuredMerchants.create().url}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        Add Featured Merchant
                    </a>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
                <MinimalTable
                    redirectUrlFn={(fm) => admin.featuredMerchants.edit(fm.id).url}
                    data={featuredMerchants}
                    columns={[
                        { label: 'Priority', key: 'priority', className: 'w-24 text-center font-semibold' },
                        { 
                            label: 'Merchant Name', 
                            key: 'merchant',
                            renderItem: (row) => row.merchant.name
                        },
                        { 
                            label: 'Location', 
                            key: 'location',
                            renderItem: (row) => row.merchant.shop_location || '-'
                        },
                        { 
                            label: 'Subscription Start', 
                            key: 'subscription_date_start',
                            renderItem: (row) => formatDate(row.subscription_date_start)
                        },
                        { 
                            label: 'Subscription End', 
                            key: 'subscription_date_end',
                            renderItem: (row) => formatDate(row.subscription_date_end)
                        },
                        {
                            label: 'Actions',
                            key: 'actions',
                            className: 'w-32',
                            renderItem: (row) => (
                                <button
                                    type="button"
                                    className="text-red-600 hover:text-red-800"
                                    onClick={e => {
                                        e.stopPropagation();
                                        confirmDelete(row.id);
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            ),
                        },
                    ]}
                />
            </div>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            Are you sure you want to remove this featured merchant? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
