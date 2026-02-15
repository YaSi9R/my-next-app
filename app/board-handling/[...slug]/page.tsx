import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductById,
    getProducts
} from '@/lib/services/product-service';
import { prisma } from '@/lib/prisma';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';

export const dynamicParams = true;

export async function generateStaticParams() {
    const { products } = await getProducts({ limit: 50 });
    const boardHandling = products.filter(p => (p as any).category?.slug === 'board-handling');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of boardHandling) {
        paths.push({ slug: [(p as any).subcategory?.slug || 'other', (p as any).brand?.slug || 'generic', (p as any).id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(boardHandling.map(p => (p as any).subcategory?.slug).filter(Boolean));
    const brands = new Set(boardHandling.map(p => (p as any).brand?.slug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            const exists = boardHandling.some(p => (p as any).subcategory?.slug === s && (p as any).brand?.slug === b);
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

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    let product = null;

    if (/^[0-9a-fA-F]{24}$/.test(potentialId)) {
        product = await getProductById(potentialId);
    }

    if (product && (product as any).category?.slug === 'board-handling') {
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
                category: { slug: 'board-handling' }
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

    // Always ensure we are filtering within board handling for this page
    const productsData = await getProducts({
        categorySlug: 'board-handling',
        subcategorySlug: initialCategorySlug,
        brandSlug: initialBrandSlug,
        limit: 50
    });

    if (initialCategorySlug || initialBrandSlug || slug.length === 0) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-16 text-[#022c75] text-center mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            {initialCategoryName
                                ? initialCategoryName
                                : (initialBrandName ? `${initialBrandName} Systems` : 'Board Handling Solutions')}
                        </h1>
                        <p className="text-xl text-[#022c75] max-w-2xl mx-auto  leading-relaxed">
                            Premium PCB handling and automation systems for high-performance SMT manufacturing lines.
                        </p>
                    </div>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(productsData))}
                    rootCategorySlug="board-handling"
                    initialCategory={initialCategorySlug}
                    initialBrandSlug={initialBrandSlug}
                />
            </div>
        )
    }

    return notFound();
}
