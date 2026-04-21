import React, { useState } from 'react';
import MinimalTable from '@/components/minimal-table';
import AppLayout from '@/layouts/app-layout';
import articlesRoute from '@/routes/admin/articles';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';

type Article = {
    id: number;
    title: string;
    description?: string;
    author?: { id: number; name: string };
    created_at: string;
};

interface Props {
    articles: Article[];
}

export default function ArticleList({ articles }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    function onConfirmDelete() {
        if (deleteId) {
            router.delete(articlesRoute.destroy(deleteId).url);
            setShowConfirm(false);
            setDeleteId(null);
        }
    }

    return (
        <AppLayout breadcrumbs={[]}> 
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>Delete Article</DialogHeader>
                    <DialogDescription>Are you sure you want to delete this article?</DialogDescription>
                    <div className="flex gap-5 justify-end mt-4">
                        <button onClick={() => setShowConfirm(false)} className="btn">Cancel</button>
                        <button onClick={onConfirmDelete} className="btn btn-danger text-red-600">Delete</button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Articles</h1>
                    <a
                        href={articlesRoute.create().url}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        Create Article
                    </a>
                </div>
                <MinimalTable
                    redirectUrlFn={(a) => articlesRoute.edit(a.id).url}
                    data={articles.map((article) => ({
                        ...article,
                        author: article.author?.name || 'Unknown',
                        created_at: new Date(article.created_at).toLocaleDateString(),
                    }))}
                    columns={[
                        { label: 'ID', key: 'id' },
                        { label: 'Title', key: 'title' },
                        { label: 'Author', key: 'author' },
                        { label: 'Created', key: 'created_at' },
                        {
                            label: 'Actions',
                            key: 'actions',
                            className: 'w-32',
                            renderItem: (row) => (
                                <button
                                    type="button"
                                    className="text-red-600 hover:text-red-800"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setDeleteId(row.id);
                                        setShowConfirm(true);
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            ),
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
