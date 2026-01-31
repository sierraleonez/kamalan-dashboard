import React, { useState } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import categoriesRoute, { edit } from '@/routes/categories';
import { DeleteIcon, Trash2 } from 'lucide-react';
import { useForm, router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

type Category = {
    id: number;
    name: string;
    description?: string;
    background_image: string;
    icon: string;
};

interface Props {
    categories: Category[];
}

export default function CategoryList({ categories }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    function onConfirmDelete() {
        if (deleteId) {
            router.delete(`/categories/${deleteId}`);
            setShowConfirm(false);
            setDeleteId(null);
        }
    }

    return (
        <AppLayout breadcrumbs={[]}>
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>Delete Category</DialogHeader>
                    <DialogDescription>Are you sure you want to delete this category?</DialogDescription>
                    <div className="flex gap-5 justify-end mt-4">
                        <button onClick={() => setShowConfirm(false)} className="btn">Cancel</button>
                        <button onClick={onConfirmDelete} className="btn btn-danger text-red-600">Delete</button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <a
                        href={categoriesRoute.create().url}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        Create Category
                    </a>
                </div>
                <MinimalTable
                    data={categories}
                    redirectUrlFn={(row) => edit(row.id)}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Name', key: 'name' },
                        { label: 'Description', key: 'description' },
                        { label: 'Background Image', key: 'background_image' },
                        { label: 'Icon', key: 'icon' },
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
