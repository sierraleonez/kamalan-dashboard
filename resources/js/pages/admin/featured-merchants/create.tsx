import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import admin from '@/routes/admin';

interface Merchant {
    id: number;
    name: string;
}

interface Props {
    merchants: Merchant[];
    errors?: Record<string, string[]>;
}

export default function FeaturedMerchantCreate({ merchants, errors = {} }: Props) {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, post, processing } = useForm({
        merchant_id: '',
        priority: '0',
        subscription_date_start: today,
        subscription_date_end: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.featuredMerchants.store().url);
    };

    return (
        <AppLayout title="Add Featured Merchant">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="merchant_id">Merchant *</Label>
                    <select
                        id="merchant_id"
                        name="merchant_id"
                        value={data.merchant_id}
                        onChange={handleChange}
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="">Select a merchant</option>
                        {merchants.map((merchant) => (
                            <option key={merchant.id} value={merchant.id}>
                                {merchant.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.merchant_id?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="priority">Priority *</Label>
                    <Input
                        id="priority"
                        name="priority"
                        type="number"
                        min="0"
                        value={data.priority}
                        onChange={handleChange}
                        required
                        placeholder="Enter priority (higher = more prominent)"
                    />
                    <p className="text-xs text-gray-500">Higher priority merchants appear first</p>
                    <InputError message={errors.priority?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="subscription_date_start">Subscription Start Date *</Label>
                    <Input
                        id="subscription_date_start"
                        name="subscription_date_start"
                        type="date"
                        min={today}
                        value={data.subscription_date_start}
                        onChange={handleChange}
                        required
                    />
                    <InputError message={errors.subscription_date_start?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="subscription_date_end">Subscription End Date *</Label>
                    <Input
                        id="subscription_date_end"
                        name="subscription_date_end"
                        type="date"
                        min={data.subscription_date_start || today}
                        value={data.subscription_date_end}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-xs text-gray-500">Must be after start date</p>
                    <InputError message={errors.subscription_date_end?.[0]} />
                </div>

                <div className="flex justify-end gap-2">
                    <a
                        href={admin.featuredMerchants.index().url}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                        Cancel
                    </a>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Adding...' : 'Add Featured Merchant'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
