import React, { useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import ProductListLayout, { iProduct } from '@/components/layout/product-list';
import { index } from '@/routes/products';
import debounce from 'lodash.debounce';

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

interface PageProps {
    products: iPaginatedResponse<iProduct>;
    categories?: Array<{ id: number; name: string }>;
    brands?: Array<{ id: number; name: string }>;
    filter: {
        categories?: number[];
        brands?: number[];
        search?: string;
        sort?: string;
    };
}

export default function ProductList({ products, categories, brands, filter }: PageProps) {
    const { setData, data } = useForm<{
        categories: number[];
        brands: number[];
        search: string;
        sort: string;
    }>();

    useEffect(() => {
        if (filter) setData(filter);
    }, [filter]);

    function refetch(newData: { categories?: number[]; brands?: number[]; search?: string }) {
        router.get(index.url({ query: newData }), {}, { preserveState: true, preserveScroll: true });
    }

    function addFilter(type: 'category' | 'brand' | 'search', value: number | string) {
        if (type === 'category') {
            const cats = data.categories || [];
            if (!cats.includes(value as number)) {
                const next = [...cats, value as number];
                setData('categories', next);
                refetch({ categories: next, brands: data.brands || [], sort: data.sort });
            }
        } else if (type === 'brand') {
            const brnds = data.brands || [];
            if (!brnds.includes(value as number)) {
                const next = [...brnds, value as number];
                setData('brands', next);
                refetch({ categories: data.categories || [], brands: next, sort: data.sort });
            }
        } else {
            debouncedSearch(value as string);
        }
    }

    function removeFilter(type: 'category' | 'brand' | 'search', value: number | string) {
        if (type === 'category') {
            const next = data.categories.filter(id => String(id) !== String(value));
            setData('categories', next);
            refetch({ categories: next, brands: data.brands || [], sort: data.sort });
        } else if (type === 'brand') {
            const next = data.brands.filter(id => String(id) !== String(value));
            setData('brands', next);
            refetch({ categories: data.categories || [], brands: next, sort: data.sort });
        } else {
            setData('search', '');
            refetch({ categories: data.categories || [], brands: data.brands || [], search: '', sort: data.sort });
        }
    }

    const debouncedSearch = React.useCallback(
        debounce((value: string) => {
            setData('search', value);
            refetch({ categories: data.categories || [], brands: data.brands || [], search: value, sort: data.sort });
        }, 700),
        []
    );

    function handleSortChange(sort: string) {
        setData('sort', sort);
        refetch({ categories: data.categories || [], brands: data.brands || [], search: data.search, sort });
    }

    return (
        <div className="min-h-screen bg-white">
            <Head title="Kamalan - Premium Gift Hampers" />
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 py-6">
                <ProductListLayout
                    categories={categories}
                    brands={brands}
                    products={products}
                    onAddToCart={(product) => console.log('Product clicked:', product)}
                    showHero={true}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    filterValues={data}
                    onSortChange={handleSortChange}
                />
            </div>
        </div>
    );
}
