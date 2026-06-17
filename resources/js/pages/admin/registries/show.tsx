import React from 'react';
import AppLayout from '@/layouts/app-layout';

type DeliveryInfo = {
    id: number;
    receiver_name: string;
    phone_number: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    postal_code: string;
    address: string;
    full_address: string;
    greeting: string | null;
    notes: string | null;
};

type Product = {
    id: number;
    name: string;
    pivot: { quantity: number };
};

type User = {
    id: number;
    name: string;
    email: string;
};

type Event = {
    id: number;
    name: string;
};

type Registry = {
    id: number;
    name: string;
    date: string;
    magic_link: string;
    last_step: number;
    user: User;
    event: Event | null;
    delivery_info: DeliveryInfo | null;
    products: Product[];
    reservations: any[];
};

interface Props {
    registry: Registry;
}

export default function RegistryShow({ registry }: Props) {
    const status = registry.delivery_info ? 'Finished' : 'Not Finished';

    return (
        <AppLayout breadcrumbs={[
            { title: 'Registries', href: '/admin/registries' },
            { title: registry.name, href: `/admin/registries/${registry.id}` },
        ]}>
            <div className="max-w-3xl mx-auto mt-8 space-y-6">
                <h1 className="text-2xl font-bold">{registry.name}</h1>

                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                    <h2 className="text-lg font-semibold">Registry Info</h2>
                    <div><span className="font-semibold">ID:</span> {registry.id}</div>
                    <div><span className="font-semibold">Name:</span> {registry.name}</div>
                    <div><span className="font-semibold">Date:</span> {registry.date}</div>
                    <div><span className="font-semibold">Event:</span> {registry.event?.name || '-'}</div>
                    <div><span className="font-semibold">Magic Link:</span> {registry.magic_link}</div>
                    <div>
                        <span className="font-semibold">Status:</span>{' '}
                        {status === 'Finished' ? (
                            <span className="text-green-600">{status}</span>
                        ) : (
                            <span className="text-yellow-600">{status}</span>
                        )}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                    <h2 className="text-lg font-semibold">User Detail</h2>
                    <div><span className="font-semibold">Name:</span> {registry.user?.name || '-'}</div>
                    <div><span className="font-semibold">Email:</span> {registry.user?.email || '-'}</div>
                </div>

                {registry.delivery_info && (
                    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                        <h2 className="text-lg font-semibold">Delivery Info</h2>
                        <div><span className="font-semibold">Receiver:</span> {registry.delivery_info.receiver_name}</div>
                        <div><span className="font-semibold">Phone:</span> {registry.delivery_info.phone_number}</div>
                        <div><span className="font-semibold">Address:</span> {registry.delivery_info.full_address}</div>
                        <div><span className="font-semibold">Greeting:</span> {registry.delivery_info.greeting || '-'}</div>
                        <div><span className="font-semibold">Notes:</span> {registry.delivery_info.notes || '-'}</div>
                    </div>
                )}

                {registry.products && registry.products.length > 0 && (
                    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                        <h2 className="text-lg font-semibold">Product List ({registry.products.length} items)</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left px-3 py-2 font-semibold">Product</th>
                                        <th className="text-left px-3 py-2 font-semibold">Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registry.products.map((product) => (
                                        <tr key={product.id} className="border-b border-border">
                                            <td className="px-3 py-2">{product.name}</td>
                                            <td className="px-3 py-2">{product.pivot?.quantity || 1}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {registry.reservations && registry.reservations.length > 0 && (
                    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                        <h2 className="text-lg font-semibold">Reservations ({registry.reservations.length})</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left px-3 py-2 font-semibold">Name</th>
                                        <th className="text-left px-3 py-2 font-semibold">Greeting</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registry.reservations.map((res) => (
                                        <tr key={res.id} className="border-b border-border">
                                            <td className="px-3 py-2">{res.is_anonymous ? 'Anonymous' : res.name}</td>
                                            <td className="px-3 py-2">{res.greeting || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
