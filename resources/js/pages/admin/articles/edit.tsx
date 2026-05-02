import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import articles from '@/routes/admin/articles';
import MDEditor from '@uiw/react-md-editor';
import admin from '@/routes/admin';
import { Upload } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    description?: string;
    body: string;
    author?: { id: number; name: string };
    cover_image_url?: string;
}

interface Props {
    article: Article;
    errors?: Record<string, string[]>;
}

export default function ArticleEdit({ article, errors = {} }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(article.cover_image_url || null);
    const props = usePage().props;
    const { data, setData, put, processing } = useForm({
        title: article.title || '',
        description: article.description || '',
        body: article.body || '',
        cover_image_url: article.cover_image_url || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(articles.update(article.id).url);
    };

    useEffect(() => {
        const flashData = props?.flash as { image_url?: string } | undefined;
        if (flashData?.image_url) {
            setData('cover_image_url', flashData.image_url);
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

    return (
        <AppLayout breadcrumbs={[{ title: `Edit Article: ${article.title}`, href: articles.edit(article.id).url }]}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-xl font-semibold">Edit Article</h1>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter article title"
                        />
                        <InputError message={errors.title?.[0]} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cover_image_url">Cover Image</Label>
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
                            <Input id="cover_image_url" name="cover_image_url" value={data.cover_image_url} onChange={handleChange} placeholder="Or enter image URL" className="flex-1" />
                        </div>
                        <InputError message={errors.cover_image_url?.[0]} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Enter a brief description (optional)"
                            rows={3}
                        />
                        <InputError message={errors.description?.[0]} />
                    </div>

                    <div className="grid gap-2" data-color-mode="light">
                        <Label htmlFor="body">Content *</Label>
                        <MDEditor
                            value={data.body}
                            onChange={(value) => setData('body', value || '')}
                            preview="edit"
                            height={400}
                            className="border rounded-md"
                        />
                        <InputError message={errors.body?.[0]} />
                    </div>

                    <div className="flex justify-end gap-2">
                        <a
                            href={articles.index().url}
                            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                            Cancel
                        </a>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Article'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
