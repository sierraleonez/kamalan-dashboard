import React, { useState } from 'react';
import { Heart, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
        // Handle newsletter signup logic here
    };

    return (
        <footer className="bg-[oklch(0.145_0_0)] text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="font-serif text-white text-xl font-bold mb-6">Tentang Kami</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Cerita Kamalan
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Tim Kami
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Karir
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Sustainability
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    {/* Information Section */}
                    <div>
                        <h3 className="font-serif text-white text-xl font-bold mb-6">Informasi</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    FAQ
                                </a>
                            </li>
                            {/* <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Shipping & Returns
                                </a>
                            </li> */}
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 className="font-serif text-white text-xl font-bold mb-6">Social Media</h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <img src="/images/icons/tiktok-icon.webp" alt="TikTok" className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <img src="/images/icons/threads-icon.png" alt="Threads" className="w-6 h-6" />
                            </a>
                            
                            {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a> */}
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    @kamalan.id
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Kamalan Official
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    {/* <div>
                        <div className="flex items-center mb-4">
                            <Heart className="w-6 h-6 text-[#889966] mr-2" />
                            <h3 className="font-serif text-white text-xl font-bold">Kawankamalan</h3>
                        </div>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                            Dapatkan update terbaru, tips, dan penawaran khusus langsung ke inbox Anda
                        </p>
                        
                        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#889966] transition-colors"
                                    required
                                />
                                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#889966] hover:bg-[#7A8A5C] text-[oklch(0.985_0_0)] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div> */}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <span className="font-serif text-2xl font-bold text-[#889966] mr-8">Kamalan</span>
                            <p className="text-gray-400 text-sm">
                                © 2026 Kamalan. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>Made with ❤️ in Indonesia</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}