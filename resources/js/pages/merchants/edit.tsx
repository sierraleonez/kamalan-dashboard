import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import merchants from '@/routes/admin/merchants';

interface Merchant {
    id: number;
    name: string;
    shopee_link?: string;
    tokped_link?: string;
    shop_location?: string;
}

interface Props {
    merchant: Merchant;
    errors?: Record<string, string[]>;
}

export default function MerchantEdit({ merchant, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: merchant.name || '',
        shopee_link: merchant.shopee_link || '',
        tokped_link: merchant.tokped_link || '',
        shop_location: merchant.shop_location || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(merchants.update(merchant.id).url);
    };

    return (
        <AppLayout title={`Edit Merchant: ${merchant.name}`}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter merchant name"
                    />
                    <InputError message={errors.name?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="shopee_link">Shopee Link</Label>
                    <Input
                        id="shopee_link"
                        name="shopee_link"
                        value={data.shopee_link}
                        onChange={handleChange}
                        placeholder="https://shopee.co.id/yourstore"
                    />
                    <InputError message={errors.shopee_link?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tokped_link">Tokopedia Link</Label>
                    <Input
                        id="tokped_link"
                        name="tokped_link"
                        value={data.tokped_link}
                        onChange={handleChange}
                        placeholder="https://tokopedia.com/yourstore"
                    />
                    <InputError message={errors.tokped_link?.[0]} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="shop_location">Shop Location</Label>
                    <Input
                        id="shop_location"
                        name="shop_location"
                        value={data.shop_location}
                        onChange={handleChange}
                        placeholder="Jakarta, Indonesia"
                    />
                    <InputError message={errors.shop_location?.[0]} />
                </div>

                <div className="flex justify-end gap-2">
                    <a
                        href={merchants.index().url}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                        Cancel
                    </a>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Merchant'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}