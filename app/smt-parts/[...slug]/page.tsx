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
    const parts = products.filter(p => p.categorySlug === 'smt-parts');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of parts) {
        paths.push({ slug: [p.subcategorySlug || 'other', p.brandSlug, p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(parts.map(p => p.subcategorySlug).filter(Boolean));
    const brands = new Set(parts.map(p => p.brandSlug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            // Only if such permutation exists (optional optimization, but let's include all valid combos found in products)
            const exists = parts.some(p => p.subcategorySlug === s && p.brandSlug === b);
            if (exists) {
                paths.push({ slug: [s!, b!] });
                paths.push({ slug: [b!, s!] }); // Handle reverse order too if needed, though we standardized
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
    const allProducts = await getAllProducts();

    // Helper to identify slug types
    const findBrand = (s: string) => allProducts.find(p => p.brandSlug === s)?.brand; // Return Name, not Slug
    const findSubcat = (s: string) => allProducts.find(p => p.subcategorySlug === s)?.subcategorySlug;

    // Case 1: Product Detail Page (Try segments for ID)
    const potentialId = slug[slug.length - 1];
    const product = await getProductById(potentialId);

    if (product && product.categorySlug === 'smt-parts') {
        return <ProductDetail product={product} />;
    }

    // Case 2: Listing Page (Brand or Subcategory or Combination)
    let initialCategory: string | undefined;
    let initialBrand: string | undefined;

    for (const s of slug) {
        const isBrand = findBrand(s);
        const isSubcat = findSubcat(s);

        if (isSubcat) initialCategory = isSubcat;
        if (isBrand) initialBrand = isBrand;
    }

    if (initialCategory || initialBrand) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#022c75] py-12 text-center text-white mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialCategory
                            ? allProducts.find(p => p.subcategorySlug === initialCategory)?.subcategory
                            : (initialBrand ? `${allProducts.find(p => p.brandSlug === initialBrand)?.brand} Parts` : 'SMT Parts')}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto px-4">
                        Find the perfect parts for your {initialCategory || initialBrand || 'SMT'} equipment.
                    </p>
                </div>
                <ProductBrowser
                    products={allProducts}
                    rootCategorySlug="smt-parts"
                    initialCategory={initialCategory}
                    initialBrand={initialBrand}
                />
            </div>
        )
    }

    return notFound();
}
