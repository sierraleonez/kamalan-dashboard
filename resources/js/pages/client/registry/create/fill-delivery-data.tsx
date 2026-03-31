import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Heart, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { deliveryData } from '@/routes/create-registry';
import { uploadFile } from '@/routes';

interface FormData {
    registry_id: number;
    photo_url: File | null;
    registry_title: string;
    greeting: string;
    event_name: string;
    event_date: string;
    receiver_name: string;
    phone_number: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    postal_code: string;
    address: string;
    privacy_agreement: boolean;
}

interface iRegistry {
    id: number;
    event_id: number;
    date: string;
    name: string;
    user_id: number;
    event: {
        id: number;
        name: string;
        background_image: string;
        description: string
    }
}

interface PageProps {
    registry?: number;
    registry_detail?: iRegistry;
}

export default function RegistryFormData(xprops: PageProps) {
    const registry = xprops.registry;
    const registryDetail = xprops.registry_detail;
    console.log(xprops)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const props = usePage().props
    
    const { data, setData, post: postForm, processing, errors } = useForm<FormData>({
        photo_url: null,
        registry_title: registryDetail ? registryDetail.name : '',
        greeting: '',
        event_name: registryDetail ? registryDetail.event.name : '',
        event_date: registryDetail ? registryDetail.date : '',
        receiver_name: '',
        phone_number: '',
        province: '',
        city: '',
        district: '',
        subdistrict: '',
        postal_code: '',
        address: '',
        registry_id: registry,
        privacy_agreement: false,
    });

    useEffect(() => {
        if (props?.flash?.image_url) {
            setData({...data, photo_url: props.flash.image_url});
        }
    }, [props?.flash?.image_url])
    console.log(data.photo_url)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('registry_background_image', file);
            router.post(uploadFile.url(), formData, { onSuccess: (response) => {
                // Handle successful upload if needed
                console.log('Image uploaded successfully:', response);
            }})
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postForm(deliveryData().url);
    };

    return (
        <div className="min-h-screen bg-[oklch(1_0_0)]">
            <Head title="Lengkapi Data Registry - Kamalan" />
            
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={4} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Section - Preview */}
                        <div className="space-y-6">
                            {/* Image Upload Area */}
                            <div className="relative">
                                <div className="aspect-[4/3] bg-gray-50 border-2 border-dashed border-[oklch(0.922_0_0)] rounded-lg flex flex-col items-center justify-center overflow-hidden">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Registry preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-500 mb-4">Tambahkan foto untuk registry kamu</p>
                                            <label className="cursor-pointer inline-flex items-center gap-2 bg-[#889966] text-[oklch(0.985_0_0)] px-4 py-2 rounded-md hover:bg-[#778855] transition-colors">
                                                <Upload size={16} />
                                                Unggah Foto
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                                {imagePreview && (
                                    <label className="absolute bottom-4 right-4 cursor-pointer inline-flex items-center gap-2 bg-[#889966] text-[oklch(0.985_0_0)] px-3 py-1.5 rounded-md hover:bg-[#778855] transition-colors shadow-lg">
                                        <Upload size={14} />
                                        Ganti Foto
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="sr-only"
                                        />
                                    </label>
                                )}
                                {errors.photo_url && (
                                    <p className="mt-2 text-sm text-red-600">{errors.photo_url}</p>
                                )}
                            </div>

                            {/* Registry Title */}
                            <div>
                                <label htmlFor="registry-title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Registry
                                </label>
                                <input
                                    type="text"
                                    // disabled
                                    id="registry-title"
                                    value={data.registry_title}
                                    onChange={(e) => setData('registry_title', e.target.value)}
                                    className="w-full px-4 py-3 text-2xl font-serif font-bold border border-[oklch(0.922_0_0)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                    placeholder="Mawar's Wedding Registry"
                                    required
                                />
                                {errors.registry_title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.registry_title}</p>
                                )}
                            </div>

                            {/* Welcome Message */}
                            <div>
                                <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kata Sambutan
                                </label>
                                <textarea
                                    id="greeting"
                                    value={data.greeting}
                                    onChange={(e) => setData('greeting', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-[oklch(0.922_0_0)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent resize-none"
                                    placeholder="Tulis kata sambutan untuk tamu yang akan memberikan hadiah..."
                                />
                                {errors.greeting && (
                                    <p className="mt-1 text-sm text-red-600">{errors.greeting}</p>
                                )}
                            </div>
                        </div>

                        {/* Right Section - Form Fields */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detail Acara & Kontak</h2>
                            
                            {/* Event Name */}
                            <div>
                                <label htmlFor="event-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Acara *
                                </label>
                                <input
                                    type="text"
                                    // disabled
                                    id="event-name"
                                    value={data.event_name}
                                    onChange={(e) => setData('event_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                    placeholder="Pernikahan, Ulang Tahun, dll."
                                    required
                                />
                                {errors.event_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.event_name}</p>
                                )}
                            </div>
                            

                            {/* Event Date */}
                            <div>
                                <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Acara *
                                </label>
                                <input
                                    type="date"
                                    id="event-date"
                                    // disabled
                                    value={new Date(data.event_date).toISOString().split('T')[0]} // Format date for input
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                    required
                                />
                                {errors.event_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.event_date}</p>
                                )}
                            </div>

                            {/* Owner Name */}
                            <div>
                                <label htmlFor="receiver-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Pemilik Acara *
                                </label>
                                <input
                                    type="text"
                                    id="receiver-name"
                                    value={data.receiver_name}
                                    onChange={(e) => setData('receiver_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                    placeholder="Nama lengkap pemilik acara"
                                    required
                                />
                                {errors.receiver_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.receiver_name}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Telepon *
                                </label>
                                <input
                                    type="tel"
                                    id="phone-number"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                    placeholder="08123456789"
                                    required
                                />
                                {errors.phone_number && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                                )}
                            </div>

                            {/* Address Section */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Alamat Acara</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Province */}
                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                                            Provinsi *
                                        </label>
                                        <input
                                            type="text"
                                            id="province"
                                            value={data.province}
                                            onChange={(e) => setData('province', e.target.value)}
                                            className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                            placeholder="Jawa Barat"
                                            required
                                        />
                                        {errors.province && (
                                            <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                            Kota *
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                            placeholder="Bandung"
                                            required
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>

                                    {/* District */}
                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                            Kecamatan *
                                        </label>
                                        <input
                                            type="text"
                                            id="district"
                                            value={data.district}
                                            onChange={(e) => setData('district', e.target.value)}
                                            className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                            placeholder="Coblong"
                                            required
                                        />
                                        {errors.district && (
                                            <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                                        )}
                                    </div>

                                    {/* Subdistrict */}
                                    <div>
                                        <label htmlFor="subdistrict" className="block text-sm font-medium text-gray-700 mb-1">
                                            Kelurahan *
                                        </label>
                                        <input
                                            type="text"
                                            id="subdistrict"
                                            value={data.subdistrict}
                                            onChange={(e) => setData('subdistrict', e.target.value)}
                                            className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                            placeholder="Dago"
                                            required
                                        />
                                        {errors.subdistrict && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subdistrict}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Postal Code */}
                                <div className="mt-4">
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 mb-1">
                                        Kode Pos *
                                    </label>
                                    <input
                                        type="text"
                                        id="postal-code"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent"
                                        placeholder="40135"
                                        required
                                    />
                                    {errors.postal_code && (
                                        <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>
                                    )}
                                </div>

                                {/* Address Detail */}
                                <div className="mt-4">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Detail Alamat *
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-[oklch(0.922_0_0)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#889966] focus:border-transparent resize-none"
                                        placeholder="Jl. Raya No. 123, RT 01 RW 02"
                                        required
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Privacy Agreement */}
                            <div className="flex items-start space-x-3 pt-6 border-t border-gray-200">
                                <input
                                    type="checkbox"
                                    id="privacy-agreement"
                                    checked={data.privacy_agreement}
                                    onChange={(e) => setData('privacy_agreement', e.target.checked)}
                                    className="mt-1 h-4 w-4 text-[#889966] border-gray-300 rounded focus:ring-[#889966]"
                                    required
                                />
                                <label htmlFor="privacy-agreement" className="text-sm text-gray-700">
                                    Saya setuju dengan{' '}
                                    <a href="#" className="text-[#889966] hover:underline">
                                        Kebijakan Privasi
                                    </a>{' '}
                                    dan{' '}
                                    <a href="#" className="text-[#889966] hover:underline">
                                        Syarat & Ketentuan
                                    </a>{' '}
                                    Kamalan. Data yang saya berikan akan digunakan untuk keperluan registry dan komunikasi terkait acara.
                                </label>
                                {errors.privacy_agreement && (
                                    <p className="mt-1 text-sm text-red-600">{errors.privacy_agreement}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-white border-t border-[oklch(0.922_0_0)] px-4 py-4">
                <div className="container mx-auto flex justify-end">
                    <button
                        type="submit"
                        form="registry-form"
                        disabled={processing}
                        onClick={handleSubmit}
                        className="bg-[#889966] text-[oklch(0.985_0_0)] px-8 py-3 rounded-md font-medium hover:bg-[#778855] focus:outline-none focus:ring-2 focus:ring-[#889966] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Membuat Registry...' : 'Buat Registry!'}
                    </button>
                </div>
            </div>
        </div>
    );
}