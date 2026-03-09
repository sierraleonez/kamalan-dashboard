import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedBanner from '@/components/FeaturedBanner';
import ArticleGrid from '@/components/ArticleGrid';
import BrandWall from '@/components/BrandWall';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import createRegistry from '@/routes/create-registry';

export default function Landing() {
    const { auth } = usePage().props as any;
    const [showAuthModal, setShowAuthModal] = useState(false);

    function handleCreateRegistry() {
        // Check if user is authenticated
        if (auth?.user) {
            // User is logged in, redirect to create registry page
            router.visit(createRegistry.selectEvent.url());
        } else {
            // User is not logged in, show auth modal
            setShowAuthModal(true);
        }
    }

    function handleAuthSuccess() {
        // After successful login/register, redirect to create registry
        router.visit(createRegistry.selectEvent.url());
    }

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title="Kamalan - Gift Registry Platform" />
            
            <Navbar />
            
            <main>
                <HeroSection
                    onClickCreateRegistry={handleCreateRegistry}
                />
                
                <FeaturedBanner 
                    title="Baby Shower Collection"
                    subtitle="Bulan Ini di Kamalan"
                    image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1600&h=600&fit=crop"
                    ctaText="Lihat Koleksi"
                />
                
                <ArticleGrid />
                
                <BrandWall />
            </main>
            
            <Footer />

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />
        </div>
    );
}