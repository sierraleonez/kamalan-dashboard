
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { useForm } from '@inertiajs/react';
import Switch from '@/components/ui/switch';
import products from '@/routes/admin/products';
import { formatRupiah } from '@/lib/currency';
import Dropdown from '@/components/ui/dropdown';

interface Category {
    id: number;
    name: string;
}

interface Merchant {
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
    merchant_id: number;
    enabled: boolean;
}

interface Props {
    product: Product;
    categories: Category[];
    merchants: Merchant[];
    errors?: Record<string, string[]>;
}

export default function ProductEdit({ product, categories, merchants, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: product.name,
        affiliate_link: product.affiliate_link || '',
        display_image: product.display_image,
        price: product.price.toString(),
        description: product.description || '',
        category_id: product.category_id.toString(),
        merchant_id: product.merchant_id.toString(),
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
        put(products.update(product.id).url);
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
                    <Label htmlFor="price">Price (IDR)</Label>
                              <Input
                                id="price"
                                name="price"
                                type="text"
                                inputMode="numeric"
                                value={data.price ? formatRupiah(data.price) : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const raw = e.target.value.replace(/\D/g, '');
                                  setData('price', raw);
                                }}
                                required
                                placeholder="Enter price in Rupiah (e.g., 250000)"
                              />
                    <InputError message={errors.price?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Dropdown
                        items={categories}
                        value={data.category_id}
                        id='category_id'
                        name='category_id'
                        onChange={handleChange}
                        placeholder="Select Category"
                    />
                    <InputError message={errors.category_id?.[0]} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="merchant_id">Merchant</Label>
                    <Dropdown
                        items={merchants}
                        value={data.merchant_id}
                        id='merchant_id'
                        name='merchant_id'
                        onChange={handleChange}
                        placeholder="Select Merchant"
                    />
                    {/* <select id="merchant_id" name="merchant_id" value={data.merchant_id} onChange={handleChange} required className="input">
                        <option value="">Select Merchant</option>
                        {merchants.map((merchant) => (
                            <option key={merchant.id} value={merchant.id}>{merchant.name}</option>
                        ))}
                    </select> */}
                    <InputError message={errors.merchant_id?.[0]} />
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
