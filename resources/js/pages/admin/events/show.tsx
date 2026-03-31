import React from 'react';
import AppLayout from '@/layouts/app-layout';

interface Event {
    id: number;
    name: string;
    description?: string;
    background_image?: string;
    icon?: string;
}

interface Props {
    event: Event;
}

export default function EventShow({ event }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Event Details', href: `/admin/events/${event.id}` }]}> 
            <div className="max-w-lg mx-auto mt-8 bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
                <div className="mb-2">
                    <span className="font-semibold">Description:</span> {event.description || '-'}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Background Image:</span> {event.background_image ? (
                        <img src={event.background_image} alt={event.name} className="h-24 mt-2 rounded" />
                    ) : '-'}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Icon:</span> {event.icon ? (
                        <img src={event.icon} alt={`${event.name} icon`} className="h-12 w-12 mt-2 object-contain" />
                    ) : '-'}
                </div>
            </div>
        </AppLayout>
    );
}
