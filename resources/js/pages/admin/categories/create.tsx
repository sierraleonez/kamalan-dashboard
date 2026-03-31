

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm, router, usePage } from '@inertiajs/react';
import categories from '@/routes/admin/categories';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
    errors?: Record<string, string[]>;
}

export default function CategoryCreate({ errors = {} }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const props = usePage().props;
    
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        background_image: '',
        icon: '',
    });

    useEffect(() => {
        const flashData = props?.flash as { image_url?: string } | undefined;
        if (flashData?.image_url) {
            setData('background_image', flashData.image_url);
            setImagePreview(flashData.image_url);
        }
    }, [props?.flash]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
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
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(categories.store().url);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Create Category', href: '/categories/create' }]}> 
            <h1 className="sr-only">Create Category</h1>
            <div>

            </div>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-4 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={data.name} onChange={handleChange} required placeholder="Category name" />
                    <InputError message={errors.name?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={data.description} 
                        onChange={handleChange} 
                        placeholder="Description"
                        className="input rounded-md border border-gray-300 focus:outline-none focus:ring-2 px-3 py-2 shadow-xs text-base focus:ring-primary/50 min-h-[80px]"
                    />
                    <InputError message={errors.description?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="background_image">Background Image</Label>
                    {imagePreview && (
                        <div className="relative w-full max-w-md mb-2">
                            <img 
                                src={imagePreview} 
                                alt="Background preview" 
                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                            />
                            <label className="absolute bottom-2 right-2 cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors shadow-lg">
                                <Upload size={14} />
                                Change Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap">
                            <Upload size={16} />
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="sr-only"
                            />
                        </label>
                        <Input id="background_image" name="background_image" value={data.background_image} onChange={handleChange} required placeholder="Or enter image URL" className="flex-1" />
                    </div>
                    <InputError message={errors.background_image?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input id="icon" name="icon" value={data.icon} onChange={handleChange} required placeholder="Icon URL or name" />
                    <InputError message={errors.icon?.[0]} />
                </div>
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
