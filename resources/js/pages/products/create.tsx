
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
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

interface Props {
  categories: Category[];
  merchants: Merchant[];
  errors?: Record<string, string[]>;
}

export default function ProductCreate({ categories, merchants, errors = {} }: Props) {
  const { data, setData, post, processing } = useForm({
    name: '',
    description: '',
    display_image: '',
    affiliate_link: '',
    category_id: '',
    merchant_id: '',
    price: '',
    enabled: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(products.store().url);
  };

  function handleSwitch(val: boolean) {
    setData('enabled', val);
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Create Product', href: '/products/create' }]}>
      <h1 className="sr-only">Create Product</h1>
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
          <Label htmlFor="display_image">Display Image</Label>
          <Input id="display_image" name="display_image" value={data.display_image} onChange={handleChange} placeholder="Display image URL" />
          <InputError message={errors.display_image?.[0]} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="affiliate_link">Affiliate Link</Label>
          <Input id="affiliate_link" name="affiliate_link" value={data.affiliate_link} onChange={handleChange} placeholder="Affiliate link URL" />
          <InputError message={errors.affiliate_link?.[0]} />
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
          <select id="category_id" name="category_id" value={data.category_id} onChange={handleChange} required className="input rounded-md border border-gray-300 focus:outline-none focus:ring-2 px-3 py-1 shadow-xs text-base focus:ring-primary/50">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
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
          <InputError message={errors.merchant_id?.[0]} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="enabled">Enabled</Label>
          <Switch checked={!!data.enabled} onCheckedChange={handleSwitch} />
        </div>
        <div className="flex items-center gap-4">
          <Button disabled={processing}>Create</Button>

        </div>
      </form>
    </AppLayout>
  );
}
