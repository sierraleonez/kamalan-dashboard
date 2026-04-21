import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';

interface Article {
    id: number;
    title: string;
    description?: string;
    author?: { id: number; name: string };
    created_at: string;
}

interface iPaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    path: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
}

interface PageProps {
    articles: iPaginatedResponse<Article>;
}

export default function ArticlesIndex({ articles }: PageProps) {
    const defaultImage = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop';

    return (
        <div className="min-h-screen bg-white">
            <Head title="Catatan Kamalan - Articles" />

            {/* Navbar */}
            <Navbar />

            {/* Header Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-4 py-12">
                    <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3 text-center">
                        Catatan Kamalan
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
                        Inspirasi dan panduan untuk menciptakan momen istimewa dalam setiap acara
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-screen-xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.data.map((article) => (
                        <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                                {/* Image */}
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={defaultImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-[#889966] transition-colors">
                                        {article.title}
                                    </h3>
                                    
                                    {/* Description/Excerpt */}
                                    {article.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {article.description}
                                        </p>
                                    )}
                                    
                                    {/* Meta Info */}
                                    <div className="flex items-center text-xs text-gray-500 mt-4">
                                        <span>{article.author?.name || 'Unknown'}</span>
                                        <span className="mx-2">•</span>
                                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {articles.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {articles.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded border ${
                                    link.active
                                        ? 'bg-[#889966] text-white border-[#889966]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
