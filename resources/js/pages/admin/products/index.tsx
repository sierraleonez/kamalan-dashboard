import React, { useState } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import productsRoute from '@/routes/admin/products';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

type Product = {
    id: number;
    name: string;
    description?: string;
    display_image?: string;
    price: number;
    formatted_price: string;
    category?: { id: number; name: string };
    merchant?: { id: number; name: string };
};

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    function onConfirmDelete() {
        if (deleteId) {
            router.delete(productsRoute.destroy(deleteId).url);
            setShowConfirm(false);
            setDeleteId(null);
        }
    }

    return (
        <AppLayout breadcrumbs={[]}> 
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>Delete Product</DialogHeader>
                    <DialogDescription>Are you sure you want to delete this product?</DialogDescription>
                    <div className="flex gap-5 justify-end mt-4">
                        <button onClick={() => setShowConfirm(false)} className="btn">Cancel</button>
                        <button onClick={onConfirmDelete} className="btn btn-danger text-red-600">Delete</button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Products</h1>
                    <a
                        href={productsRoute.create().url}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        Create Product
                    </a>
                </div>
                <MinimalTable
                    redirectUrlFn={(p) => productsRoute.edit(p.id).url}
                    data={products.map((prod) => ({
                        ...prod,
                        category: prod.category?.name || '',
                    }))}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Name', key: 'name' },
                        { label: 'Description', key: 'description' },
                        { label: 'Price', key: 'formatted_price' },
                        { label: 'Category', key: 'category' },
                        { label: 'Enabled', key: 'enabled' },
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
                                        setDeleteId(row.id);
                                        setShowConfirm(true);
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            ),
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
