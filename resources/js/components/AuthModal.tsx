import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { request } from '@/routes/password';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    redirectTo?: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess, redirectTo }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        redirect_to: redirectTo || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = isLogin ? '/login' : '/register';

        post(endpoint, {
            onSuccess: () => {
                reset();
                onSuccess?.();
                onClose();
            },
            onError: () => {
                // Errors are automatically handled by Inertia
            }
        });
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        reset('name', 'email', 'password', 'password_confirmation');
        // Keep redirect_to when switching modes
        setData('redirect_to', redirectTo || '');
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        {isLogin ? 'Halo!' : 'Buat Akun Baru'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        {isLogin
                            ? 'Isi email dan sandi untuk buat Registry'
                            : 'Isi informasi di bawah ini'
                        }
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field (only for registration) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                placeholder="Tulis namamu"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                            placeholder="Email"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                placeholder="Password"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {/* Password Confirmation (only for register) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                placeholder="Password"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#889966] text-[oklch(0.985_0_0)] py-2 px-4 rounded-md hover:bg-[#778855] focus:outline-none focus:ring-2 focus:ring-[#889966] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing
                            ? (isLogin ? 'Mencari datamu...' : 'Membuat akunmu...')
                            : (isLogin ? 'Masuk' : 'Buat Akun')
                        }
                    </button>
                </form>

                {/* Switch Mode */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                        <button
                            type="button"
                            onClick={switchMode}
                            className="text-[#889966] hover:text-[#778855] font-medium"
                        >
                            {isLogin ? 'Buat Akun' : 'Masuk'}
                        </button>
                    </p>
                    <a
                        type="button"
                        href={request().url}
                        className="text-[#889966] text-sm hover:text-[#778855] font-medium"
                    >
                        Lupa Password?
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
}