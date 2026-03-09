import React, { useState } from 'react';
import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, ShoppingCart, User, Heart, MapPin, Filter, ChevronDown, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import client from '@/routes/client';
import ClientHeader from '@/components/client-header';
import Navbar from '@/components/Navbar';
import RegistryCart from '@/components/registry-cart';
import { addGiftToCart, deliveryData } from '@/routes/create-registry';

interface iPaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    path: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
}
interface iProduct {
    id: number;
    name: string;
    price: number;
    formatted_price?: string;
    merchant_id: number;
    display_image: string;
    affiliate_link?: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const categories = ["Sahur", "Lebaran", "Cookies & Snacks", "Traditional", "Premium"];
const brands = ["Toko Berkah", "Hamper Nusantara", "Sweet Corner", "Desert Gold", "Premium Gifts", "Family Delights"];
const locations = ["Jakarta", "Bekasi", "Tangerang", "Depok"];
const types = ["Voucher", "Hamper", "Satuan"];

function ProductCard({ product, onAddToCart, registryId }: { product: iProduct; onAddToCart: (product: iProduct) => void; registryId?: number }) {
    function onCickProduct() {
        // Navigate to product detail page with registry ID
        const url = registryId ? `${client.show(product.id).url}?registry=${registryId}` : client.show(product.id).url;
        router.visit(url);
    }

    function handleAddToCart(e: React.MouseEvent) {
        e.stopPropagation();
        onAddToCart(product);
    }
    return (
        <Card onClick={onCickProduct} className="group pt-0 bg-white overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.display_image}
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
                <p className="text-sm text-gray-600 mb-1">Kamalan</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        Jakarta
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAddToCart}
                        className="h-8 w-8 p-0 ml-2 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
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

interface PageProps {
    products: iPaginatedResponse<iProduct>;
    registryId?: number;
    initialCartItems?: CartItem[];
}

export default function ClientHome({ products, registryId, initialCartItems = [] }: PageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const heroSlides = [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop"
    ];

    const addToCart = (product: iProduct) => {
        if (!registryId) {
            console.error('No registry ID available');
            return;
        }

        // Optimistically update UI
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.display_image
            }];
        });

        // Send to backend
        router.post(addGiftToCart.url(), {
            product_id: product.id,
            registry_id: registryId,
        }, {
            preserveScroll: true,
            only: ['cartItems'],
            onSuccess: (page: any) => {
                // Update cart with server data if available
                if (page.props.cartItems) {
                    setCartItems(page.props.cartItems);
                }
            },
            onError: (errors) => {
                console.error('Failed to add to cart:', errors);
                // Revert optimistic update on error
                setCartItems(prev => {
                    const existingItem = prev.find(item => item.id === product.id);
                    if (existingItem && existingItem.quantity === 1) {
                        return prev.filter(item => item.id !== product.id);
                    }
                    return prev.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                });
            },
        });
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        if (!registryId) {
            console.error('No registry ID available');
            return;
        }

        // Optimistically update UI
        const removedItem = cartItems.find(item => item.id === id);
        setCartItems(prev => prev.filter(item => item.id !== id));

        // Send to backend
        router.delete(addGiftToCart.url(), {
            data: {
                product_id: id,
                registry_id: registryId,
            },
            preserveScroll: true,
            only: ['cartItems'],
            onSuccess: (page: any) => {
                // Update cart with server data if available
                if (page.props.cartItems) {
                    setCartItems(page.props.cartItems);
                }
            },
            onError: (errors) => {
                console.error('Failed to remove from cart:', errors);
                // Revert optimistic update on error
                if (removedItem) {
                    setCartItems(prev => [...prev, removedItem]);
                }
            },
        });
    };

    const handleContinue = () => {
        // Navigate to next step in registry creation
        router.visit(deliveryData.url({ query: { registry: registryId } }));
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />

            {/* Navbar */}
            <Navbar showRegistryBreadcrumbs={true} currentRegistryStep={2} />

            {/* Main Content */}
            <div className="max-w-screen-xl mx-auto flex px-4 py-6">
                <div className="flex lg:gap-8">
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
                                    <div className="text-center text-white px-4">
                                        <h1 className="font-serif text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Premium Gift Hampers</h1>
                                        <p className="text-sm md:text-lg lg:text-xl text-white">Curated with love for your special moments</p>
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
                        <InfiniteScroll data='products' >
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map(product => (
                                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} registryId={registryId} />
                                ))}
                            </div>
                        </InfiniteScroll>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <Button variant="default" size="lg">
                                Load More Products
                            </Button>
                        </div>
                    </main>

                    <RegistryCart
                        items={cartItems}
                        onUpdateQuantity={updateCartQuantity}
                        onRemoveItem={removeFromCart}
                        onContinue={handleContinue}
                    />
                </div>
            </div>

            {/* Registry Cart Component */}
            {/* <div className="lg:hidden relative bottom-4 right-4 z-50"> */}

            {/* </div> */}
        </div>
    );
}