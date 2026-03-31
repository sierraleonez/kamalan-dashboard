
import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import Switch from '@/components/ui/switch';
import products from '@/routes/admin/products';
import { formatRupiah } from '@/lib/currency';
import Dropdown from '@/components/ui/dropdown';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';


interface Category {
  id: number;
  name: string;
}

interface Event {
  id: number;
  name: string;
}

interface Merchant {
  id: number;
  name: string;
}

interface Props {
  events: Event[];
  categories: Category[];
  merchants: Merchant[];
  errors?: Record<string, string[]>;
}

export default function ProductCreate({ events, categories, merchants, errors = {} }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const props = usePage().props;
  
  const { data, setData, post, processing } = useForm({
    name: '',
    description: '',
    display_image: '',
    affiliate_link: '',
    event_id: '',
    category_ids: [] as number[],
    merchant_id: '',
    price: '',
    enabled: true,
  });

  useEffect(() => {
    const flashData = props?.flash as { image_url?: string } | undefined;
    if (flashData?.image_url) {
      setData('display_image', flashData.image_url);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const handleCategoryChange = (selectedIds: number[]) => {
    setData('category_ids', selectedIds);
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
          <Label htmlFor="display_image">Display Image</Label>
          {imagePreview && (
            <div className="relative w-full max-w-md mb-2">
              <img 
                src={imagePreview} 
                alt="Product preview" 
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
            <Input id="display_image" name="display_image" value={data.display_image} onChange={handleChange} placeholder="Or enter image URL" className="flex-1" />
          </div>
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
          <Label htmlFor="event_id">Event</Label>
          <select id="event_id" name="event_id" value={data.event_id} onChange={handleChange} required className="input rounded-md border border-gray-300 focus:outline-none focus:ring-2 px-3 py-1 shadow-xs text-base focus:ring-primary/50">
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <InputError message={errors.event_id?.[0]} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category_ids">Categories</Label>
          <MultiSelect
            options={categories}
            value={data.category_ids}
            onChange={handleCategoryChange}
            placeholder="Select categories..."
          />
          <p className="text-xs text-gray-500">Search and select multiple categories</p>
          <InputError message={errors.category_ids?.[0]} />
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
