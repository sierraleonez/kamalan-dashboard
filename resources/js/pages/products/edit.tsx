
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import Switch from '@/components/ui/switch';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    affiliate_link?: string;
    display_image: string;
    price: number;
    description?: string;
    category_id: number;
    enabled: boolean;
}

interface Props {
    product: Product;
    categories: Category[];
    errors?: Record<string, string[]>;
}

export default function ProductEdit({ product, categories, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: product.name,
        affiliate_link: product.affiliate_link || '',
        display_image: product.display_image,
        price: product.price.toString(),
        description: product.description || '',
        category_id: product.category_id.toString(),
        enabled: product.enabled ?? true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData(e.target.name, e.target.value);
    };

    const handleSwitch = (val: boolean) => {
        setData('enabled', val);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Product', href: `/products/${product.id}/edit` }]}> 
            <h1 className="sr-only">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={data.name} onChange={handleChange} required placeholder="Product name" />
                    <InputError message={errors.name?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" as="textarea" name="description" value={data.description} onChange={handleChange} placeholder="Description" />
                    <InputError message={errors.description?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="affiliate_link">Affiliate Link</Label>
                    <Input id="affiliate_link" name="affiliate_link" value={data.affiliate_link} onChange={handleChange} placeholder="Affiliate link URL" />
                    <InputError message={errors.affiliate_link?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="display_image">Display Image</Label>
                    <Input id="display_image" name="display_image" value={data.display_image} onChange={handleChange} placeholder="Display image URL" />
                    <InputError message={errors.display_image?.[0]} />
                    {data.display_image && (
                        <img
                            src={data.display_image}
                            alt="Product Preview"
                            className="mt-2 max-h-40 rounded border"
                        />
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" value={data.price} onChange={handleChange} required placeholder="Price" />
                    <InputError message={errors.price?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category_id">Category</Label>
                    <select id="category_id" name="category_id" value={data.category_id} onChange={handleChange} required className="input">
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <InputError message={errors.category_id?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="enabled">Enabled</Label>
                    <Switch checked={!!data.enabled} onCheckedChange={handleSwitch} />
                </div>
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
