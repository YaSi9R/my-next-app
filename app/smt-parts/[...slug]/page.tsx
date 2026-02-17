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
    const { products } = await getProducts({ limit: 100 });
    const parts = products.filter(p => p.category?.slug === 'smt-parts');

    const paths = [];

    // 1. Product Detail Pages
    for (const p of parts) {
        if (p.subcategory?.slug && p.subsubcategory?.slug) {
            paths.push({ slug: [p.subcategory.slug, p.subsubcategory.slug, p.id] });
        } else if (p.subcategory?.slug) {
            paths.push({ slug: [p.subcategory.slug, p.id] });
        }
    }

    // 2. Listing Pages
    const subcats = new Set(parts.map(p => p.subcategory?.slug).filter(Boolean));
    const subsubcats = new Set(parts.map(p => p.subsubcategory?.slug).filter(Boolean));

    subcats.forEach(s => paths.push({ slug: [s!] }));
    subcats.forEach(s => {
        subsubcats.forEach(ss => {
            const exists = parts.some(p => p.subcategory?.slug === s && p.subsubcategory?.slug === ss);
            if (exists) {
                paths.push({ slug: [s!, ss!] });
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

    if (product && (product as any).category?.slug.toLowerCase() === 'smt-parts') {
        return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
    }

    // Case 2: Listing Page 
    let initialSubcategorySlug: string | undefined;
    let initialSubcategoryName: string | undefined;
    let initialSubsubcategorySlug: string | undefined;
    let initialSubsubcategoryName: string | undefined;

    for (const s of slug) {
        const normalizedSlug = s.toLowerCase();

        const subcategory = await prisma.subcategory.findFirst({
            where: {
                slug: { equals: normalizedSlug },
                category: { slug: 'smt-parts' }
            }
        });

        if (subcategory) {
            initialSubcategorySlug = subcategory.slug;
            initialSubcategoryName = subcategory.name;
            continue;
        }

        const subsubcat = await prisma.subSubcategory.findFirst({
            where: { slug: { equals: normalizedSlug } }
        });

        if (subsubcat) {
            initialSubsubcategorySlug = subsubcat.slug;
            initialSubsubcategoryName = subsubcat.name;
            continue;
        }
    }

    const partsData = await getProducts({
        categorySlug: 'smt-parts',
        subcategorySlug: initialSubcategorySlug,
        subsubcategorySlug: initialSubsubcategorySlug,
        limit: 50
    });

    if (initialSubcategorySlug || initialSubsubcategorySlug) {
        return (
            <div className="min-h-screen bg-[#e6e6e6]">
                <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {initialSubsubcategoryName
                            ? initialSubsubcategoryName
                            : (initialSubcategoryName ? initialSubcategoryName : 'SMT Parts')}
                    </h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                        Quality spare parts for all your SMT machines and production lines.
                    </p>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(partsData))}
                    rootCategorySlug="smt-parts"
                    initialSubcategory={initialSubcategorySlug}
                    initialSubsubcategory={initialSubsubcategorySlug}
                />
            </div>
        )
    }

    return notFound();
}
