import React from 'react';

interface Article {
    id: number;
    title: string;
    category: string;
    image: string;
    excerpt: string;
    readTime?: string;
}

interface ArticleGridProps {
    articles?: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
    const defaultArticles: Article[] = [
        {
            id: 1,
            title: "Tips Memilih Hadiah Baby Shower yang Bermakna",
            category: "Baby Shower",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
            excerpt: "Panduan lengkap memilih hadiah yang tepat untuk merayakan kedatangan buah hati",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Tradisi Siraman: Makna dan Persiapan Hadiah",
            category: "Wedding",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
            excerpt: "Memahami tradisi siraman dan hadiah yang sesuai dengan nilai budaya",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "Hamper Lebaran: Seni Berbagi Kebahagiaan",
            category: "Lebaran",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
            excerpt: "Cara menyusun hamper Lebaran yang indah dan penuh makna untuk keluarga",
            readTime: "6 min read"
        }
    ];

    const articlesToShow = articles || defaultArticles;

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
                        <article key={article.id} className="group cursor-pointer">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[oklch(0.922_0_0)] hover:shadow-lg transition-all duration-300">
                                {/* Image */}
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="p-6">
                                    {/* Category Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block bg-[#889966] text-[oklch(0.985_0_0)] px-3 py-1 rounded-full text-sm font-medium">
                                            {article.category}
                                        </span>
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="font-serif text-xl font-semibold text-[oklch(0.145_0_0)] mb-3 leading-tight group-hover:text-[#889966] transition-colors">
                                        {article.title}
                                    </h3>
                                    
                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {article.excerpt}
                                    </p>
                                    
                                    {/* Read Time */}
                                    {article.readTime && (
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span>{article.readTime}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="border border-[#889966] text-[#889966] hover:bg-[#889966] hover:text-[oklch(0.985_0_0)] font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                        Lihat Semua Artikel
                    </button>
                </div>
            </div>
        </section>
    );
}