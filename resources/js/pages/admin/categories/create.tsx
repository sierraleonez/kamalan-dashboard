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
    });

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
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
