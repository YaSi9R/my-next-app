import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductById,
    getProducts
} from '@/lib/services/product-service';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';

export const dynamicParams = true;

export async function generateStaticParams() {
    const { products } = await getProducts({ limit: 50 });
    const parts = products.filter(p => p.category?.slug === 'smt-parts');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of parts) {
        paths.push({ slug: [p.subcategory?.slug || 'other', p.brand?.slug || 'generic', p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(parts.map(p => p.subcategory?.slug).filter(Boolean));
    const brands = new Set(parts.map(p => p.brand?.slug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));

    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            const exists = parts.some(p => p.subcategory?.slug === s && p.brand?.slug === b);
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

export default async function SmtPartsDynamicPage({ params }: Props) {
    const { slug } = await params;
    const initialData = await getProducts({ limit: 50 });
    const allProducts = initialData.products;

    // Helper to identify slug types
    const findBrand = (s: string) => allProducts.find(p => p.brand?.slug === s)?.brand?.name;
    const findSubcat = (s: string) => allProducts.find(p => p.subcategory?.slug === s)?.subcategory?.slug;

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    const product = await getProductById(potentialId);

    if (product && (product as any).category?.slug === 'smt-parts') {
        return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
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

    if (initialCategory || initialBrandName) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialCategory
                            ? allProducts.find(p => p.subcategory?.slug === initialCategory)?.subcategory?.name
                            : (initialBrandName ? `${initialBrandName} Parts` : 'SMT Parts')}
                    </h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                        Find the perfect parts for your {initialCategory || initialBrandName || 'SMT'} equipment.
                    </p>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(initialData))}
                    rootCategorySlug="smt-parts"
                    initialCategory={initialCategory}
                    initialBrand={initialBrandName}
                />
            </div>
        )
    }

    return notFound();
}
