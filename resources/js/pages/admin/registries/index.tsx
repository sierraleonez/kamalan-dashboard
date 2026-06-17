import React, { useState, useCallback } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import registriesRoute from '@/routes/admin/registries';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';

type Registry = {
    id: number;
    name: string;
    item_count: number;
    magic_link: string;
    user_name: string;
    status: string;
};

interface Props {
    registries: Registry[];
    filters: { search?: string };
}

export default function RegistryList({ registries, filters }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');
    console.log(registries)
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(registriesRoute.index().url, { search: value }, { preserveState: true, replace: true });
        }, 400),
        []
    );

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    }

    function onConfirmDelete() {
        if (deleteId) {
            router.delete(registriesRoute.destroy(deleteId).url);
            setShowConfirm(false);
            setDeleteId(null);
        }
    }

    return (
        <AppLayout breadcrumbs={[]}>
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>Delete Registry</DialogHeader>
                    <DialogDescription>Are you sure you want to delete this registry? All related data will be permanently removed.</DialogDescription>
                    <div className="flex gap-5 justify-end mt-4">
                        <button onClick={() => setShowConfirm(false)} className="btn">Cancel</button>
                        <button onClick={onConfirmDelete} className="btn btn-danger text-red-600">Delete</button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Registries</h1>
                </div>
                <Input
                    placeholder="Search by ID, name, or magic link..."
                    value={search}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
                <MinimalTable
                    redirectUrlFn={(row) => registriesRoute.edit(row.id).url}
                    data={registries}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Name', key: 'name' },
                        { label: 'Items', key: 'item_count' },
                        { label: 'Magic Link', key: 'magic_link' },
                        { label: 'User', key: 'user_name' },
                        { label: 'Status', key: 'status' },
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
