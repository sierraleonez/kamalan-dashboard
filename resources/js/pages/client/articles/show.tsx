import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
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

interface PageProps {
    article: Article;
}

export default function ArticleShow({ article }: PageProps) {
    return (
        <div className="min-h-screen bg-white">
            <Head title={`${article.title} - Kamalan`} />

            {/* Navbar */}
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-[#889966]">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/articles" className="hover:text-[#889966]">
                            Articles
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{article.title}</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {article.title}
                    </h1>
                    
                    {article.description && (
                        <p className="text-xl text-gray-600 leading-relaxed mb-6">
                            {article.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[#889966] flex items-center justify-center text-white font-semibold">
                                {article.author?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">
                                    {article.author?.name || 'Unknown Author'}
                                </div>
                                <div className="text-xs">
                                    {new Date(article.created_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none" data-color-mode="light">
                    <MDEditor.Markdown 
                        source={article.body}
                        style={{ 
                            backgroundColor: 'transparent',
                            color: '#1f2937',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {/* Back to Articles */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 text-[#889966] hover:text-[#6b7a52] font-medium"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Articles
                    </Link>
                </div>
            </article>
        </div>
    );
}
