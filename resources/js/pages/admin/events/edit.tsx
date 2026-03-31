import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm, router, usePage } from '@inertiajs/react';
import events from '@/routes/admin/events';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

type Event = {
    id: number;
    name: string;
    description?: string;
    background_image: string;
    icon: string;
};

interface Props {
    event: Event;
    errors?: Record<string, string[]>;
}

export default function EventEdit({ event, errors = {} }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(event.background_image || null);
    const props = usePage().props;
    
    const { data, setData, put, processing } = useForm({
        name: event.name,
        description: event.description || '',
        background_image: event.background_image,
        icon: event.icon,
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
        put(events.update(event.id).url);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Event', href: `/admin/events/${event.id}/edit` }]}> 
            <h1 className="sr-only">Edit Event</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={data.name} onChange={handleChange} required placeholder="Event name" />
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
                        <Input id="background_image" name="background_image" value={data.background_image} onChange={handleChange} placeholder="Or enter image URL" className="flex-1" />
                    </div>
                    <InputError message={errors.background_image?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="icon">Icon URL</Label>
                    <Input id="icon" name="icon" value={data.icon} onChange={handleChange} required placeholder="Icon URL" />
                    <InputError message={errors.icon?.[0]} />
                </div>
                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing}>Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
