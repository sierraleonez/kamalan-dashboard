import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import admin from '@/routes/admin';

interface Product {
    id: number;
    name: string;
}

interface FeaturedProduct {
    id: number;
    product_id: number;
    priority: number;
    product: Product;
}

interface Props {
    featuredProduct: FeaturedProduct;
    products: Product[];
    errors?: Record<string, string[]>;
}

export default function FeaturedProductEdit({ featuredProduct, products, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        product_id: featuredProduct.product_id.toString(),
        priority: featuredProduct.priority.toString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.featuredProducts.update(featuredProduct.id).url);
    };

    return (
        <AppLayout>
            <Head title={`Edit Featured Product: ${featuredProduct.product.name}`} />
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-5 mt-8">
                <div className="grid gap-2">
                    <Label htmlFor="product_id">Product *</Label>
                    <select
                        id="product_id"
                        name="product_id"
                        value={data.product_id}
                        onChange={handleChange}
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.product_id?.[0]} />
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
                    <p className="text-xs text-gray-500">Higher priority products appear first</p>
                    <InputError message={errors.priority?.[0]} />
                </div>

                <div className="flex justify-end gap-2">
                    <a
                        href={admin.featuredProducts.index().url}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                        Cancel
                    </a>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Featured Product'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
