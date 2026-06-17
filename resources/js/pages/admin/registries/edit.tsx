import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import registriesRoute from '@/routes/admin/registries';

type Event = {
    id: number;
    name: string;
};

type Registry = {
    id: number;
    name: string;
    date: string;
    event_id: number;
};

interface Props {
    registry: Registry;
    events: Event[];
    errors?: Record<string, string[]>;
}

export default function RegistryEdit({ registry, events, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: registry.name,
        date: registry.date,
        event_id: registry.event_id,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(registriesRoute.update(registry.id).url);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Registries', href: '/admin/registries' },
            { title: registry.name, href: `/admin/registries/${registry.id}/edit` },
        ]}>
            <h1 className="sr-only">Edit Registry</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={data.name} onChange={handleChange} required placeholder="Registry name" />
                    <InputError message={errors.name?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" value={data.date} onChange={handleChange} required />
                    <InputError message={errors.date?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="event_id">Event</Label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={data.event_id}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="">Select event...</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                    <InputError message={errors.event_id?.[0]} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
