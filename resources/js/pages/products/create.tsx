
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Root, Thumb} from '@radix-ui/react-switch';
import Switch from '@/components/ui/switch';



interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  errors?: Record<string, string[]>;
}

export default function ProductCreate({ categories, errors = {} }: Props) {
  const { data, setData, post, processing } = useForm({
    name: '',
    description: '',
    display_image: '',
    affiliate_link: '',
    category_id: '',
    price: '',
    enabled: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/products');
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
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={data.price} onChange={handleChange} required placeholder="Price" />
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
          <Label htmlFor="enabled">Enabled</Label>
          <Switch/>
        </div>
        <div className="flex items-center gap-4">
          <Button disabled={processing}>Create</Button>

        </div>
      </form>
    </AppLayout>
  );
}
