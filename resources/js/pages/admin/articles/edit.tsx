import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import articles from '@/routes/admin/articles';
import MDEditor from '@uiw/react-md-editor';

interface Article {
    id: number;
    title: string;
    description?: string;
    body: string;
    author?: { id: number; name: string };
}

interface Props {
    article: Article;
    errors?: Record<string, string[]>;
}

export default function ArticleEdit({ article, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        title: article.title || '',
        description: article.description || '',
        body: article.body || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(articles.update(article.id).url);
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
