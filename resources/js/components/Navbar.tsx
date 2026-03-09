import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, User, LogOut, LogIn, UserPlus, ChevronRight } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';

interface Step {
    label: string;
    isActive: boolean;
    isCompleted: boolean;
}

interface NavbarProps {
    showRegistryBreadcrumbs?: boolean;
    currentRegistryStep?: number;
}

export default function Navbar({ showRegistryBreadcrumbs = false, currentRegistryStep = 1 }: NavbarProps) {
    const { auth } = usePage().props as any;
    const [showUserTooltip, setShowUserTooltip] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    // Close tooltip when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                tooltipRef.current && 
                buttonRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowUserTooltip(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                setShowUserTooltip(false);
            }
        });
    };

    const handleLogin = () => {
        router.visit('/login');
        setShowUserTooltip(false);
    };

    const handleRegister = () => {
        router.visit('/register');
        setShowUserTooltip(false);
    };

    function handleLogoClick() {
        router.visit('/');
    }

    const steps: Step[] = [
        { label: 'Tentukan Acara', isActive: currentRegistryStep === 1, isCompleted: currentRegistryStep > 1 },
        { label: 'Pilih Hadiah', isActive: currentRegistryStep === 2, isCompleted: currentRegistryStep > 2 },
        // { label: 'Desain Registry', isActive: currentRegistryStep === 3, isCompleted: currentRegistryStep > 3 },
        { label: 'Lengkapi Data', isActive: currentRegistryStep === 4, isCompleted: currentRegistryStep > 4 },
        { label: 'Mari Bagikan!', isActive: currentRegistryStep === 5, isCompleted: currentRegistryStep > 5 },
    ];

    return (
        <header className="sticky top-0 bg-[oklch(1_0_0)] z-50 border-b border-[oklch(0.922_0_0)]">
            <div className="max-w-screen-xl mx-auto px-4 h-20 flex items-center justify-between">
                <div onClick={handleLogoClick} className="flex items-center">
                    <img
                        src="/kamalan_logo_green.png"
                        alt="Kamalan"
                        className="h-20 font-serif"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.style.display = 'block';
                        }}
                    />
                    <span className="hidden font-serif text-2xl font-bold text-[#889966]">Kamalan</span>
                </div>

                {/* <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors font-medium">
                        Home
                    </a>
                    <a href="#" className="text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors font-medium">
                        Registry
                    </a>
                    <a href="#" className="text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors font-medium">
                        Tentang
                    </a>
                    <a href="#" className="text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors font-medium">
                        Kontak
                    </a>
                </nav> */}

                <div className="flex items-center space-x-6">
                    <Heart className="w-6 h-6 cursor-pointer text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors" />
                    <ShoppingCart className="w-6 h-6 cursor-pointer text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors" />
                    
                    {/* User Icon with Tooltip */}
                    <div className="relative">
                        <div
                            ref={buttonRef}
                            onClick={() => setShowUserTooltip(!showUserTooltip)}
                            className="cursor-pointer"
                        >
                            <User className="w-6 h-6 text-[oklch(0.145_0_0)] hover:text-[#889966] transition-colors" />
                        </div>

                        {/* User Tooltip */}
                        {showUserTooltip && (
                            <div
                                ref={tooltipRef}
                                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                            >
                                {auth?.user ? (
                                    // Logged in user
                                    <div>
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-[#889966] rounded-full flex items-center justify-center">
                                                    <span className="text-white font-medium">
                                                        {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : auth.user.email.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {auth.user.name || 'User'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {auth.user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-2 py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-2 px-2 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Anonymous user
                                    <div>
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Anonim</p>
                                                    <p className="text-sm text-gray-500">Tidak masuk</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-2 py-1 space-y-1">
                                            <button
                                                onClick={handleLogin}
                                                className="w-full flex items-center space-x-2 px-2 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <LogIn className="w-4 h-4" />
                                                <span>Login</span>
                                            </button>
                                            <button
                                                onClick={handleRegister}
                                                className="w-full flex items-center space-x-2 px-2 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                <span>Daftar</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Registry Breadcrumbs */}
            {showRegistryBreadcrumbs && (
                <nav className="flex items-center justify-center space-x-2 px-4 py-4 border-t border-[oklch(0.922_0_0)]">
                    {/* Desktop: Show all steps */}
                    <div className="hidden md:flex items-center space-x-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.label}>
                                <div className={`
                                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                                    ${step.isActive 
                                        ? 'bg-[#889966] text-[oklch(0.985_0_0)]' 
                                        : step.isCompleted 
                                            ? 'text-[#889966]' 
                                            : 'text-gray-500'
                                    }
                                `}>
                                    {step.label}
                                </div>
                                {index < steps.length - 1 && (
                                    <ChevronRight 
                                        className={`w-4 h-4 ${
                                            step.isCompleted ? 'text-[#889966]' : 'text-gray-400'
                                        }`} 
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    
                    {/* Mobile: Show only current step */}
                    <div className="md:hidden flex items-center">
                        {steps.filter(step => step.isActive).map(step => (
                            <div key={step.label} className="px-3 py-2 rounded-md text-sm font-medium bg-[#889966] text-[oklch(0.985_0_0)]">
                                {step.label}
                            </div>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}