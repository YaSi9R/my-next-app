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
    const machines = products.filter(p => p.categorySlug === 'smt-machines');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of machines) {
        paths.push({ slug: [p.subcategorySlug || 'other', p.brandSlug, p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(machines.map(p => p.subcategorySlug).filter(Boolean));
    const brands = new Set(machines.map(p => p.brandSlug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            // Only if such permutation exists
            const exists = machines.some(p => p.subcategorySlug === s && p.brandSlug === b);
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

export default async function SmtMachinesDynamicPage({ params }: Props) {
    const { slug } = await params;
    const allProducts = await getAllProducts();

    // Helper to identify slug types
    const findBrand = (s: string) => allProducts.find(p => p.brandSlug === s)?.brand; // Return Name not Slug
    const findSubcat = (s: string) => allProducts.find(p => p.subcategorySlug === s)?.subcategorySlug;

    // Case 1: Product Detail Page (Try segments for ID)
    // Identify if the last segment is an ID
    const potentialId = slug[slug.length - 1];
    const product = await getProductById(potentialId);

    if (product && product.categorySlug === 'smt-machines') {
        return <ProductDetail product={product} />;
    }

    // Case 2: Listing Page (Brand or Subcategory or Combination)
    // We want to render the browser with pre-selected filters

    let initialCategory: string | undefined;
    let initialBrand: string | undefined;

    // Analyze slug segments to determine filters
    for (const s of slug) {
        const isBrand = findBrand(s);
        const isSubcat = findSubcat(s);

        if (isSubcat) initialCategory = isSubcat;
        if (isBrand) initialBrand = isBrand;
    }

    // If we found a valid category or brand, or if we are just at a base listing state (though that's handled by main page)
    if (initialCategory || initialBrand) {
        // Filter products based on subcategory slug if it exists to ensure purely relevant products are passed? 
        // No, SmtMachineBrowser takes ALL products and handles filtering internally. 
        // Passing all products allows the user to "clear" filters and see everything without reloading.
        // However, for SSR and speed, we might want to pass everything. 

        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#022c75] py-12 text-center text-white mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialCategory
                            ? allProducts.find(p => p.subcategorySlug === initialCategory)?.subcategory
                            : (initialBrand ? `${allProducts.find(p => p.brandSlug === initialBrand)?.brand} Machines` : 'SMT Machines')}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto px-4">
                        Explore our comprehensive range of high-quality SMT equipment tailored for your production needs.
                    </p>
                </div>
                <ProductBrowser
                    products={allProducts}
                    rootCategorySlug="smt-machines"
                    initialCategory={initialCategory}
                    initialBrand={initialBrand}
                />
            </div>
        )
    }

    return notFound();
}
