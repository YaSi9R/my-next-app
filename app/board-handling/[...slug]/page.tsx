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
    const products = await getAllProducts();
    const boardHandling = products.filter(p => p.categorySlug === 'board-handling');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of boardHandling) {
        paths.push({ slug: [p.subcategorySlug || 'other', p.brandSlug, p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(boardHandling.map(p => p.subcategorySlug).filter(Boolean));
    const brands = new Set(boardHandling.map(p => p.brandSlug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            const exists = boardHandling.some(p => p.subcategorySlug === s && p.brandSlug === b);
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
    const allProducts = await getAllProducts();

    // Helper to identify slug types
    const findBrand = (s: string) => allProducts.find(p => p.brandSlug === s && p.categorySlug === 'board-handling')?.brand;
    const findSubcat = (s: string) => allProducts.find(p => p.subcategorySlug === s && p.categorySlug === 'board-handling')?.subcategorySlug;

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    const product = await getProductById(potentialId);

    if (product && product.categorySlug === 'board-handling') {
        return <ProductDetail product={product} />;
    }

    // Case 2: Listing Page
    let initialCategory: string | undefined;
    let initialBrand: string | undefined;

    for (const s of slug) {
        const isBrand = findBrand(s);
        const isSubcat = findSubcat(s);

        if (isSubcat) initialCategory = isSubcat;
        if (isBrand) initialBrand = isBrand;
    }

    if (initialCategory || initialBrand || slug.length === 0) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-16 text-[#022c75] text-center mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            {initialCategory
                                ? allProducts.find(p => p.subcategorySlug === initialCategory)?.subcategory
                                : (initialBrand ? `${initialBrand} Systems` : 'Board Handling Solutions')}
                        </h1>
                        <p className="text-xl text-[#022c75] max-w-2xl mx-auto  leading-relaxed">
                            Premium PCB handling and automation systems for high-performance SMT manufacturing lines.
                        </p>
                    </div>
                </div>
                <ProductBrowser
                    products={allProducts}
                    rootCategorySlug="board-handling"
                    initialCategory={initialCategory}
                    initialBrand={initialBrand}
                />
            </div>
        )
    }

    return notFound();
}
