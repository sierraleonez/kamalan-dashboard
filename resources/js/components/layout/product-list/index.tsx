import React, { useCallback, useMemo, useState } from 'react';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, MapPin, Filter, ChevronDown, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import products from '@/routes/products';
import createRegistry from '@/routes/create-registry';

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

export interface iProduct {
    id: number;
    name: string;
    price: number;
    formatted_price?: string;
    merchant_id: number;
    display_image: string;
    affiliate_link?: string;
}

interface ProductCardProps {
    product: iProduct;
    onAddToCart: (product: iProduct) => void;
    registryId?: number;
    onBuyNow?: (product: iProduct) => void;
}

export function ProductCard({ product, onAddToCart, registryId, onBuyNow }: ProductCardProps) {
    function onCickProduct() {
        // Navigate to product detail page with registry ID
        const registryUrl = createRegistry.showProduct({
            product_id: product.id,
        }, {
            query: { registry: registryId }
        }).url
        const guestUrl = products.show(product.id).url

        const url = registryId ? registryUrl : guestUrl;
        router.visit(url);
    }

    function handleAddToCart(e: React.MouseEvent) {
        e.stopPropagation();
        onAddToCart(product);
    }

    function handleBuyNow(e: React.MouseEvent) {
        e.stopPropagation();
        if (onBuyNow) {
            onBuyNow(product);
        } else if (product.affiliate_link) {
            window.open(product.affiliate_link, '_blank');
        }
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
                <h3 className="font-inter font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-[#A3B18A] mb-1">
                    Rp {product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600 mb-3">Kamalan</p>
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        Jakarta
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        className="w-full bg-[#BBCC77] hover:bg-[#A3B18A] text-white text-xs py-2"
                    >
                        <Plus className="w-3 h-3 mr-1" />
                        Tambah Registry
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleBuyNow}
                        className="w-full border-[#BBCC77] text-[#BBCC77] hover:bg-[#BBCC77] hover:text-white text-xs py-2"
                    >
                        Miliki Sekarang
                    </Button>
                </div>
            </div>
        </Card>
    );
}

interface FilterSidebarProps {
    categories: Array<{ id: number; name: string }>;
    brands: Array<{ id: number; name: string }>;
    filterValues?: {
        categories: number[];
        brands: number[];
        search: string;
    };
    addFilter?: (type: 'category' | 'brand' | 'search', id: number | string) => void;
    removeFilter?: (type: 'category' | 'brand' | 'search', id: number | string) => void;
}

function FilterSidebar({
    categories,
    brands,
    filterValues,
    addFilter = () => { },
    removeFilter = () => { }
}: FilterSidebarProps) {
    const selectedCategoriesMap = useMemo(() => new Map(filterValues?.categories?.map(id => [id, true])), [filterValues?.categories]);
    const selectedBrandsMap = useMemo(() => new Map(filterValues?.brands?.map(id => [id, true])), [filterValues?.brands]);
    // console.log('Selected Categories Map:', categories);
    return (
        <div className="space-y-3">
            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-x-2">
                            <Checkbox
                                checked={selectedCategoriesMap.has(String(category.id))}
                                onCheckedChange={(checked) => {
                                    console.log(`Category Checkbox Changed - ID: ${category.id}, Checked: ${checked}`);
                                    if (checked) {
                                        addFilter('category', category.id);
                                    } else {
                                        console.log('removing')
                                        removeFilter('category', category.id);
                                    }
                            }} id={`category-${category.id}`} name={`category-${category.id}`} />
                            <span className="text-sm">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                    {brands.map(brand => (
                        <label key={brand.id} className="flex items-center gap-x-2 ">
                            <Checkbox
                                checked={selectedBrandsMap.has(String(brand.id))}
                                onCheckedChange={(checked) => {
                                    console.log(`Brand Checkbox Changed - ID: ${brand.id}, Checked: ${checked}`);
                                    if (checked) {
                                        addFilter('brand', brand.id);
                                    } else {
                                        removeFilter('brand', brand.id);
                                    }
                                }}
                                id={`brand-${brand.id}`}
                                name={`brand-${brand.id}`}
                            />
                            <span className="text-sm">{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Type</h3>
                <div className="space-y-2">
                    {types.map(type => (
                        <label key={type} className="flex items-center gap-x-2">
                            <Checkbox id={`type-${type}`} name={`type-${type}`} />
                            <span className="text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div> */}

            {/* <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max="500000"
                    className="w-full accent-[#A3B18A]"
                    onChangeCapture={e => {
                        e.
                        console.log('price range', e.target.value)
                    }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Rp 0</span>
                    <span>Rp 500K+</span>
                </div>
            </div> */}

            {/* <div>
                <h3 className="font-serif text-xl text-primary font-medium mb-3">Location</h3>
                <div className="space-y-2">
                    {locations.map(location => (
                        <label key={location} className="flex items-center gap-x-2">
                            <input type="radio" name="location" className="mr-2" />
                            <span className="text-sm">{location}</span>
                        </label>
                    ))}
                </div>
            </div> */}
        </div>
    );
}

export interface ProductListLayoutProps {
    products: iPaginatedResponse<iProduct>;
    registryId?: number;
    onAddToCart: (product: iProduct) => void;
    onBuyNow?: (product: iProduct) => void;
    showHero?: boolean;
    heroSlides?: string[];
    showFilters?: boolean;
    showSearch?: boolean;
    filterValues?: {
        categories: number[];
        brands: number[];
        search: string;
    };
    categories?: Array<{ id: number; name: string }>;
    brands?: Array<{ id: number; name: string }>;
    addFilter?: (type: 'category' | 'brand' | 'search', id: number | string) => void;
    removeFilter?: (type: 'category' | 'brand' | 'search', id: number | string) => void;
}

export default function ProductListLayout({
    products,
    registryId,
    onAddToCart,
    onBuyNow,
    showHero = true,
    categories,
    brands,
    addFilter = () => { },
    removeFilter = () => { },
    filterValues,
    heroSlides = [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop"
    ],
    showFilters = true,
    showSearch = true
}: ProductListLayoutProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div className="flex lg:gap-8">
            {/* Desktop Sidebar */}
            {showFilters && (
                <aside className="hidden lg:block w-64 shrink-0">
                    <Card className="gap-2 p-6 bg-white border-none">
                        <FilterSidebar
                            categories={categories}
                            brands={brands}
                            addFilter={addFilter}
                            removeFilter={removeFilter}
                            filterValues={filterValues}
                        />
                    </Card>
                </aside>
            )}

            {/* Main Feed */}
            <main className="flex-1">
                {/* Hero Carousel */}
                {showHero && (
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
                )}

                {/* Search & Sort */}
                {(showSearch || showFilters) && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        {showSearch && (
                            <SearchBox
                                value={filterValues?.search || ''}
                                onChange={(value) => {
                                    addFilter('search', value);
                                }}
                            />
                        )}

                        <div className="flex gap-2">
                            {/* Mobile Filter Button */}
                            {showFilters && (
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
                                            <FilterSidebar
                                                categories={categories}
                                                brands={brands}
                                                addFilter={addFilter}
                                                removeFilter={removeFilter}
                                            />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            )}

                            <Button variant="outline" className="min-w-[120px] bg-primary text-white border-primary hover:bg-primary/90 focus:ring-primary/50">
                                Sort By <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <InfiniteScroll data='products'>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.data.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                                onBuyNow={onBuyNow}
                                registryId={registryId}
                            />
                        ))}
                    </div>
                </InfiniteScroll>

                {/* Load More */}
                {/* <div className="text-center mt-12">
                    <Button variant="default" size="lg">
                        Load More Products
                    </Button>
                </div> */}
            </main>
        </div>
    );
}


interface SearchBoxProps {
    value: string;
    onChange: (searchTerm: string) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
    return (
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                placeholder="Search for hampers, gifts, brands..."
                defaultValue={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 border-primary"
            />

        </div>
    )
}
