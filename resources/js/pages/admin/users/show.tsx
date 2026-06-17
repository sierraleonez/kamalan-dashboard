import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

type Registry = {
    id: number;
    name: string;
    magic_link: string;
    status?: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    disabled_at: string | null;
    registries_count: number;
    created_at: string;
};

interface Props {
    user: User;
    lastActive: string | null;
}

export default function UserShow({ user, lastActive }: Props) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Users', href: '/users' },
            { title: user.name, href: `/users/${user.id}` },
        ]}>
            <div className="max-w-2xl mx-auto mt-8 space-y-6">
                <h1 className="text-2xl font-bold">{user.name}</h1>

                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                    <h2 className="text-lg font-semibold">User Details</h2>
                    <div>
                        <span className="font-semibold">Name:</span> {user.name}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-semibold">Registered:</span> {user.created_at}
                    </div>
                    <div>
                        <span className="font-semibold">Last Active:</span> {lastActive || '-'}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span>{' '}
                        {user.disabled_at ? (
                            <span className="text-red-600">Disabled ({user.disabled_at})</span>
                        ) : (
                            <span className="text-green-600">Active</span>
                        )}
                    </div>
                    <div>
                        <span className="font-semibold">Registries:</span> {user.registries_count}
                    </div>
                </div>

                <div>
                    <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Edit User
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
