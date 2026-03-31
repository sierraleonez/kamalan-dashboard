import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import merchants from '@/routes/admin/merchants';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';

interface Props {
    errors?: Record<string, string[]>;
}

export default function MerchantCreate({ errors = {} }: Props) {
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const props = usePage().props;
    
    const { data, setData, post, processing } = useForm({
        name: '',
        shopee_link: '',
        tokped_link: '',
        shop_location: '',
        merchant_icon_url: '',
    });

    useEffect(() => {
        const flashData = props?.flash as { image_url?: string } | undefined;
        if (flashData?.image_url) {
            setData('merchant_icon_url', flashData.image_url);
            setIconPreview(flashData.image_url);
        }
    }, [props?.flash]);

    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setIconPreview(e.target?.result as string);
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);
            router.post(admin.uploadImage.url(), formData, {
                onSuccess: (response) => {
                    console.log('Image uploaded successfully:', response);
                }
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(merchants.store().url);
    };

    return (
        <AppLayout title="Create Merchant">
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
                    <Label htmlFor="merchant_icon_url">Merchant Icon *</Label>
                    {iconPreview && (
                        <div className="relative w-full max-w-md mb-2">
                            <img 
                                src={iconPreview} 
                                alt="Merchant icon preview" 
                                className="w-24 h-24 object-contain rounded-lg border border-gray-300 p-2"
                            />
                            <label className="absolute bottom-2 right-2 cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors shadow-lg">
                                <Upload size={14} />
                                Change Icon
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleIconUpload}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
                            <Upload size={16} />
                            Upload Icon
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIconUpload}
                                className="sr-only"
                            />
                        </label>
                        <Input 
                            id="merchant_icon_url" 
                            name="merchant_icon_url" 
                            value={data.merchant_icon_url} 
                            onChange={handleChange} 
                            placeholder="Or enter icon URL" 
                            className="flex-1"
                            required
                        />
                    </div>
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
                        {processing ? 'Creating...' : 'Create Merchant'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}