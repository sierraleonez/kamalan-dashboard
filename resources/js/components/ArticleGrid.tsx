import React from 'react';
import { Link } from '@inertiajs/react';

interface Article {
    id: number;
    title: string;
    description?: string;
    author?: { id: number; name: string };
    created_at?: string;
}

interface ArticleGridProps {
    articles?: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
    const defaultArticles: Article[] = [
        {
            id: 1,
            title: "Tips Memilih Hadiah Baby Shower yang Bermakna",
            description: "Panduan lengkap memilih hadiah yang tepat untuk merayakan kedatangan buah hati",
        },
        {
            id: 2,
            title: "Tradisi Siraman: Makna dan Persiapan Hadiah",
            description: "Memahami tradisi siraman dan hadiah yang sesuai dengan nilai budaya",
        },
        {
            id: 3,
            title: "Hamper Lebaran: Seni Berbagi Kebahagiaan",
            description: "Cara menyusun hamper Lebaran yang indah dan penuh makna untuk keluarga",
        }
    ];

    const articlesToShow = articles && articles.length > 0 ? articles : defaultArticles;
    const defaultImage = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop';

    return (
        <section className="py-16 bg-[oklch(1_0_0)]">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[oklch(0.145_0_0)] mb-4">
                        Catatan Kamalan
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Inspirasi dan panduan untuk menciptakan momen istimewa dalam setiap acara
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articlesToShow.map((article) => (
                        <Link key={article.id} href={`/articles/${article.id}`}>
                            <article className="group cursor-pointer">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[oklch(0.922_0_0)] hover:shadow-lg transition-all duration-300">
                                    {/* Image */}
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={defaultImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="font-serif text-xl font-semibold text-[oklch(0.145_0_0)] mb-3 leading-tight group-hover:text-[#889966] transition-colors">
                                            {article.title}
                                        </h3>
                                        
                                        {/* Excerpt/Description */}
                                        {article.description && (
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {article.description}
                                            </p>
                                        )}
                                        
                                        {/* Author and Date */}
                                        {(article.author || article.created_at) && (
                                            <div className="flex items-center text-xs text-gray-500">
                                                {article.author && <span>{article.author.name}</span>}
                                                {article.author && article.created_at && <span className="mx-2">•</span>}
                                                {article.created_at && (
                                                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/articles"
                        className="inline-block border border-[#889966] text-[#889966] hover:bg-[#889966] hover:text-[oklch(0.985_0_0)] font-semibold py-3 px-8 rounded-lg transition-all duration-200"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}