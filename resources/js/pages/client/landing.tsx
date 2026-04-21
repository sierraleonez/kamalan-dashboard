import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedBanner from '@/components/FeaturedBanner';
import ArticleGrid from '@/components/ArticleGrid';
import BrandWall from '@/components/BrandWall';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import ProductSlider from '@/components/product-slider';
import createRegistry from '@/routes/create-registry';
import products from '@/routes/products';

export default function Landing() {
    const { auth, products: productList, merchants, articles } = usePage().props as any;
    const [showAuthModal, setShowAuthModal] = useState(false);

    function handleCreateRegistry() {
        // Redirect to select gifts page (first step is now select gifts, not select event)
        // router.visit(createRegistry.selectGifts.url());
        if (auth?.user) {
            router.visit(createRegistry.selectGifts.url());
        } else {
            setShowAuthModal(true);
        }
    }

    function handleAuthSuccess() {
        // After successful login/register, redirect to select gifts page
        router.visit(createRegistry.selectGifts.url());
    }

    function handleViewAllProducts() {
        router.visit(products.index.url());
    }

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title="Kamalan - Gift Registry Platform" />
            
            <Navbar />
            
            <main>
                <HeroSection
                    onClickCreateRegistry={handleCreateRegistry}
                />
                
                <ProductSlider 
                    products={productList}
                    onViewAll={handleViewAllProducts}
                />
                
                <ArticleGrid articles={articles} />
                
                <BrandWall merchants={merchants} />
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
