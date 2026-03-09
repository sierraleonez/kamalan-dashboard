

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import categories from '@/routes/admin/categories';

interface Props {
    errors?: Record<string, string[]>;
}

export default function CategoryCreate({ errors = {} }: Props) {
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        background_image: '',
        icon: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name, e.target.value);
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
                    <Input id="description" as="textarea" name="description" value={data.description} onChange={handleChange} placeholder="Description" />
                    <InputError message={errors.description?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="background_image">Background Image</Label>
                    <Input id="background_image" name="background_image" value={data.background_image} onChange={handleChange} required placeholder="Background image URL" />
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
