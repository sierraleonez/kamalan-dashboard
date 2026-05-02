import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import categories from '@/routes/admin/categories';

type Category = {
    id: number;
    name: string;
    description?: string;
};

interface Props {
    category: Category;
    errors?: Record<string, string[]>;
}

export default function CategoryEdit({ category, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(categories.update(category.id).url);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Category', href: `/categories/${category.id}/edit` }]}>
            <h1 className="sr-only">Edit Category</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
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
                    <Button disabled={processing}>Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
