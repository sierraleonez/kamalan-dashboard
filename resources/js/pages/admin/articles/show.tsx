import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import articles from '@/routes/admin/articles';
import MDEditor from '@uiw/react-md-editor';

interface Article {
    id: number;
    title: string;
    description?: string;
    body: string;
    author?: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

interface Props {
    article: Article;
}

export default function ArticleShow({ article }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: `Article: ${article.title}`, href: articles.show(article.id).url }]}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{article.title}</h1>
                    <div className="flex gap-2">
                        <a 
                            href={articles.edit(article.id).url}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Edit
                        </a>
                        <a 
                            href={articles.index().url}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Back to articles
                        </a>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Article Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="mb-2">
                            <span className="font-semibold">ID:</span> {article.id}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Title:</span> {article.title}
                        </div>
                        {article.description && (
                            <div className="mb-2">
                                <span className="font-semibold">Description:</span>
                                <p className="mt-1 text-gray-700">{article.description}</p>
                            </div>
                        )}
                        <div className="mb-2">
                            <span className="font-semibold">Author:</span> {article.author?.name || 'Unknown'}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Created:</span> {new Date(article.created_at).toLocaleString()}
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold">Last Updated:</span> {new Date(article.updated_at).toLocaleString()}
                        </div>
                        <div className="mt-6">
                            <span className="font-semibold block mb-2">Content:</span>
                            <div data-color-mode="light" className="border rounded-md p-4">
                                <MDEditor.Markdown source={article.body} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
