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
    const machines = products.filter(p => p.category?.slug === 'smt-machines');

    const paths = [];

    // 1. Product Detail Pages: [subcat, brand, id]
    for (const p of machines) {
        paths.push({ slug: [p.subcategory?.slug || 'other', p.brand?.slug || 'generic', p.id] });
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(machines.map(p => p.subcategory?.slug).filter(Boolean));
    const brands = new Set(machines.map(p => p.brand?.slug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));
    // [brand]
    brands.forEach(b => paths.push({ slug: [b!] }));
    // [subcat, brand]
    subcats.forEach(s => {
        brands.forEach(b => {
            const exists = machines.some(p => p.subcategory?.slug === s && p.brand?.slug === b);
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

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    let product = null;

    // Only attempt lookup if it looks like a MongoDB ObjectId
    // Regular text (like "yamaha") will skip this and move to category/brand lookup
    if (/^[0-9a-fA-F]{24}$/.test(potentialId)) {
        product = await getProductById(potentialId);
    }

    if (product && (product as any).category?.slug === 'smt-machines') {
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
                category: { slug: 'smt-machines' }
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

    // Always ensure we are filtering within SMT machines for this page
    const machinesData = await getProducts({
        categorySlug: 'smt-machines',
        subcategorySlug: initialCategorySlug,
        brandSlug: initialBrandSlug,
        limit: 50
    });

    if (initialCategorySlug || initialBrandSlug) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialCategoryName
                            ? initialCategoryName
                            : (initialBrandName ? `${initialBrandName} Machines` : 'SMT Machines')}
                    </h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                        Explore our comprehensive range of high-quality SMT equipment tailored for your production needs.
                    </p>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(machinesData))}
                    rootCategorySlug="smt-machines"
                    initialCategory={initialCategorySlug}
                    initialBrand={initialBrandName}
                />
            </div>
        )
    }

    return notFound();
}
