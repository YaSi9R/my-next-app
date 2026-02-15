import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductById,
    getProducts
} from '@/lib/services/product-service';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';
import { prisma } from '@/lib/prisma';

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

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    let product = null;

    if (/^[0-9a-fA-F]{24}$/.test(potentialId)) {
        product = await getProductById(potentialId);
    }

    if (product && (product as any).category?.slug === 'smt-parts') {
        return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
    }

    // Case 2: Listing Page 
    let initialCategorySlug: string | undefined;
    let initialCategoryName: string | undefined;
    let initialBrandName: string | undefined;
    let initialBrandSlug: string | undefined;

    // Direct database lookups for each slug segment to be robust
    for (const s of slug) {
        // Look up subcategory
        const subcategory = await prisma.subcategory.findFirst({
            where: {
                slug: s,
                category: { slug: 'smt-parts' }
            }
        });

        if (subcategory) {
            initialCategorySlug = subcategory.slug;
            initialCategoryName = subcategory.name;
            continue;
        }

        // Look up brand
        const brand = await prisma.brand.findUnique({
            where: { slug: s }
        });

        if (brand) {
            initialBrandName = brand.name;
            initialBrandSlug = brand.slug;
            continue;
        }
    }

    // Always ensure we are filtering within SMT parts for this page
    const partsData = await getProducts({
        categorySlug: 'smt-parts',
        subcategorySlug: initialCategorySlug,
        brandSlug: initialBrandSlug,
        limit: 50
    });

    if (initialCategorySlug || initialBrandSlug || slug.length === 0) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialCategoryName
                            ? initialCategoryName
                            : (initialBrandName ? `${initialBrandName} Parts` : 'SMT Parts')}
                    </h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                        Find the perfect parts for your {initialCategoryName || initialBrandName || 'SMT'} equipment.
                    </p>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(partsData))}
                    rootCategorySlug="smt-parts"
                    initialCategory={initialCategorySlug}
                    initialBrandSlug={initialBrandSlug}
                />
            </div>
        )
    }

    return notFound();
}
