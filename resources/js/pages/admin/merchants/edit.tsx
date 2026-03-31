import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm, router, usePage } from '@inertiajs/react';
import merchants from '@/routes/admin/merchants';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Merchant {
    id: number;
    name: string;
    shopee_link?: string;
    tokped_link?: string;
    shop_location?: string;
    merchant_icon_url?: string;
}

interface Props {
    merchant: Merchant;
    errors?: Record<string, string[]>;
}

export default function MerchantEdit({ merchant, errors = {} }: Props) {
    const { flash } = usePage<{ flash: { iconUrl?: string } }>().props;
    const [iconPreview, setIconPreview] = useState<string | null>(merchant.merchant_icon_url || null);

    const { data, setData, put, processing } = useForm({
        name: merchant.name || '',
        shopee_link: merchant.shopee_link || '',
        tokped_link: merchant.tokped_link || '',
        shop_location: merchant.shop_location || '',
        merchant_icon_url: merchant.merchant_icon_url || '',
    });

    useEffect(() => {
        if (flash?.iconUrl) {
            setData('merchant_icon_url', flash.iconUrl);
            setIconPreview(flash.iconUrl);
        }
    }, [flash]);

    const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setIconPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image', file);

        router.post(admin.uploadImage().url, formData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
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
                    <Label htmlFor="icon">Merchant Icon</Label>
                    {iconPreview ? (
                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                            <img
                                src={iconPreview}
                                alt="Icon preview"
                                className="w-full h-full object-cover"
                            />
                            <label
                                htmlFor="icon-upload"
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Upload className="w-6 h-6 text-white" />
                                <input
                                    type="file"
                                    id="icon-upload"
                                    accept="image/*"
                                    onChange={handleIconUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    ) : (
                        <label
                            htmlFor="icon-upload"
                            className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                            <div className="text-center">
                                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                                <span className="mt-2 text-sm text-gray-500">Upload Icon</span>
                            </div>
                            <input
                                type="file"
                                id="icon-upload"
                                accept="image/*"
                                onChange={handleIconUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                    <Input
                        type="text"
                        name="merchant_icon_url"
                        value={data.merchant_icon_url}
                        onChange={handleChange}
                        placeholder="Icon URL"
                        required
                        className="mt-2"
                    />
                    <InputError message={errors.merchant_icon_url?.[0]} />
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