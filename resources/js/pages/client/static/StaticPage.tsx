import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MDEditor from '@uiw/react-md-editor';

interface StaticPageProps {
    title: string;
    content: string;
}

export default function StaticPage({ title, content }: StaticPageProps) {
    return (
        <div className="min-h-screen bg-white">
            <Head title={`${title} - Kamalan`} />
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">{title}</h1>
                <div className="prose prose-lg max-w-none" data-color-mode="light">
                    <MDEditor.Markdown
                        source={content}
                        style={{ backgroundColor: 'transparent', color: '#1f2937', fontFamily: 'inherit' }}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
