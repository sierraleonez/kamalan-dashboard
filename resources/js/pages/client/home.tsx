import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, ShoppingCart, User, Heart, MapPin, Filter, ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: "Premium Lebaran Hamper",
        price: 250000,
        brand: "Toko Berkah",
        location: "Jakarta",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Sahur Deluxe Package",
        price: 180000,
        brand: "Hamper Nusantara",
        location: "Bekasi",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Eid Cookies Collection",
        price: 120000,
        brand: "Sweet Corner",
        location: "Jakarta",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Traditional Dates Hamper",
        price: 320000,
        brand: "Desert Gold",
        location: "Tangerang",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Luxury Gift Box",
        price: 450000,
        brand: "Premium Gifts",
        location: "Jakarta",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Family Feast Hamper",
        price: 380000,
        brand: "Family Delights",
        location: "Bekasi",
        image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=300&h=300&fit=crop"
    }
];

const categories = ["Sahur", "Lebaran", "Cookies & Snacks", "Traditional", "Premium"];
const brands = ["Toko Berkah", "Hamper Nusantara", "Sweet Corner", "Desert Gold", "Premium Gifts", "Family Delights"];
const locations = ["Jakarta", "Bekasi", "Tangerang", "Depok"];
const types = ["Voucher", "Hamper", "Satuan"];

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
    return (
        <Card className="group bg-white overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="font-inter font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-[#A3B18A] mb-1">
                    Rp {product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {product.location}
                </div>
            </div>
        </Card>
    );
}

function FilterSidebar() {
    return (
        <div className="space-y-3">
            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map(category => (
                        <label key={category} className="flex items-center gap-x-2">
                            <Checkbox id={`category-${category}`} name={`category-${category}`} />
                            <span className="text-sm">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-x-2 ">
                            <Checkbox id={`brand-${brand}`} name={`brand-${brand}`} />
                            <span className="text-sm">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Type</h3>
                <div className="space-y-2">
                    {types.map(type => (
                        <label key={type} className="flex items-center gap-x-2">
                            <Checkbox id={`type-${type}`} name={`type-${type}`} />
                            <span className="text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max="500000"
                    className="w-full accent-[#A3B18A]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Rp 0</span>
                    <span>Rp 500K+</span>
                </div>
            </div>

            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Location</h3>
                <div className="space-y-2">
                    {locations.map(location => (
                        <label key={location} className="flex items-center gap-x-2">
                            <input type="radio" name="location" className="mr-2" />
                            <span className="text-sm">{location}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ClientHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop"
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <header className="sticky top-0 bg-white z-40">
                <div className="max-w-screen-xl mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="/kamalan_logo_green.png"
                            alt="Kamalan"
                            className="h-24 font-serif"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling!.style.display = 'block';
                            }}
                        />
                        <span className="hidden font-serif text-xl font-bold text-[#A3B18A]">Kamalan</span>
                    </div>

                    <div className="flex items-center space-x-8">
                        <Heart className="w-6 h-6 cursor-pointer" />

                        <ShoppingCart className="w-6 h-6 cursor-pointer" />

                        <User className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <Card className="gap-2 p-6 bg-white border-none">
                            <FilterSidebar />
                        </Card>
                    </aside>

                    {/* Main Feed */}
                    <main className="flex-1">
                        {/* Hero Carousel */}
                        <div className="relative mb-8 rounded-xl overflow-hidden">
                            <div className="aspect-[3/1] bg-gradient-to-r from-[#A3B18A] to-[#88A25B]">
                                <img
                                    src={heroSlides[currentSlide]}
                                    alt="Hero Banner"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4">Premium Gift Hampers</h1>
                                        <p className="text-lg md:text-xl text-white">Curated with love for your special moments</p>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel pagination */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Search & Sort */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search for hampers, gifts, brands..."
                                    className="pl-10 border-primary"
                                />
                            </div>

                            <div className="flex gap-2">
                                {/* Mobile Filter Button */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="lg:hidden">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filters
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-80">
                                        <SheetHeader>
                                            <SheetTitle className="font-serif">Filters</SheetTitle>
                                        </SheetHeader>
                                        <div className="mt-6">
                                            <FilterSidebar />
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <Button variant="outline" className="min-w-[120px] bg-primary text-white border-primary hover:bg-primary/90 focus:ring-primary/50">
                                    Sort By <ChevronDown className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <Button variant="default" size="lg">
                                Load More Products
                            </Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}