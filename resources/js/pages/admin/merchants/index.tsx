import React, { useState } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import merchantsRoute from '@/routes/admin/merchants';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

type Merchant = {
    id: number;
    name: string;
    shopee_link?: string;
    tokped_link?: string;
    shop_location?: string;
};

interface Props {
    merchants: Merchant[];
}

export default function MerchantList({ merchants }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(merchantsRoute.destroy(deleteId).url);
        }
        setShowConfirm(false);
        setDeleteId(null);
    };

    return (
        <AppLayout title="Merchants">
            <div className="flex justify-between items-center mb-4 p-4">
                <h1 className="text-2xl font-bold">Merchants</h1>
                <div className="flex gap-2">
                    <a 
                        href={merchantsRoute.create().url}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        Create Merchant
                    </a>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
                <MinimalTable
                    redirectUrlFn={(m) => merchantsRoute.edit(m.id).url}
                    data={merchants}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Name', key: 'name' },
                        { label: 'Shopee Link', key: 'shopee_link' },
                        { label: 'Tokopedia Link', key: 'tokped_link' },
                        { label: 'Shop Location', key: 'shop_location' },
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
                            Are you sure you want to delete this merchant? This action cannot be undone.
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