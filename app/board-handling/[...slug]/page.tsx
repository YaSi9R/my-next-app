import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductById,
    getAllProducts
} from '@/lib/api';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';

export const dynamicParams = true;

export async function generateStaticParams() {
    const { products } = await getAllProducts();
    const boardHandling = products.filter(p => p.category?.slug === 'board-handling');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of boardHandling) {
        paths.push({ slug: [p.subcategory?.slug || 'other', p.brand?.slug || 'generic', p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(boardHandling.map(p => p.subcategory?.slug).filter(Boolean));
    const brands = new Set(boardHandling.map(p => p.brand?.slug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            const exists = boardHandling.some(p => p.subcategory?.slug === s && p.brand?.slug === b);
            if (exists) {
                paths.push({ slug: [s!, b!] });
            }
        });
    });

    return paths;
}

interface Props {
    params: Promise<{
        slug: string[];
    }>
}

export default async function BoardHandlingDynamicPage({ params }: Props) {
    const { slug } = await params;
    const initialData = await getAllProducts();
    const allProducts = initialData.products;

    // Helper to identify slug types
    const findBrand = (s: string) => allProducts.find(p => p.brand?.slug === s && p.category?.slug === 'board-handling')?.brand?.name;
    const findSubcat = (s: string) => allProducts.find(p => p.subcategory?.slug === s && p.category?.slug === 'board-handling')?.subcategory?.slug;

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    const product = await getProductById(potentialId);

    if (product && product.category?.slug === 'board-handling') {
        return <ProductDetail product={product} />;
    }

    // Case 2: Listing Page
    let initialCategory: string | undefined;
    let initialBrandName: string | undefined;

    for (const s of slug) {
        const isBrandName = findBrand(s);
        const isSubcatSlug = findSubcat(s);

        if (isSubcatSlug) initialCategory = isSubcatSlug;
        if (isBrandName) initialBrandName = isBrandName;
    }

    if (initialCategory || initialBrandName || slug.length === 0) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-16 text-[#022c75] text-center mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            {initialCategory
                                ? allProducts.find(p => p.subcategory?.slug === initialCategory)?.subcategory?.name
                                : (initialBrandName ? `${initialBrandName} Systems` : 'Board Handling Solutions')}
                        </h1>
                        <p className="text-xl text-[#022c75] max-w-2xl mx-auto  leading-relaxed">
                            Premium PCB handling and automation systems for high-performance SMT manufacturing lines.
                        </p>
                    </div>
                </div>
                <ProductBrowser
                    initialData={initialData}
                    rootCategorySlug="board-handling"
                    initialCategory={initialCategory}
                    initialBrand={initialBrandName}
                />
            </div>
        )
    }

    return notFound();
}
