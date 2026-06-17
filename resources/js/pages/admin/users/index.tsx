import React, { useState, useCallback } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import usersRoute from '@/routes/admin/users';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';

type User = {
    id: number;
    name: string;
    email: string;
    last_active: string | null;
    disabled_at: string | null;
    created_at: string;
};

interface Props {
    users: User[];
    filters: { search?: string };
}

export default function UserList({ users, filters }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(usersRoute.index().url, { search: value }, { preserveState: true, replace: true });
        }, 400),
        []
    );

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    }

    function onConfirmDelete() {
        if (deleteId) {
            router.delete(usersRoute.destroy(deleteId).url);
            setShowConfirm(false);
            setDeleteId(null);
        }
    }

    return (
        <AppLayout breadcrumbs={[]}>
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>Delete User</DialogHeader>
                    <DialogDescription>Are you sure you want to delete this user? All their registries will be permanently deleted.</DialogDescription>
                    <div className="flex gap-5 justify-end mt-4">
                        <button onClick={() => setShowConfirm(false)} className="btn">Cancel</button>
                        <button onClick={onConfirmDelete} className="btn btn-danger text-red-600">Delete</button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Users</h1>
                </div>
                <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
                <MinimalTable
                    redirectUrlFn={(row) => usersRoute.edit(row.id).url}
                    data={users}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Name', key: 'name' },
                        { label: 'Email', key: 'email' },
                        { label: 'Last Active', key: 'last_active' },
                        {
                            label: 'Disabled',
                            key: 'disabled_at',
                            renderItem: (row) => row.disabled_at ? 'Yes' : 'No',
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
