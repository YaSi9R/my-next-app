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
    const machines = products.filter(p => p.category?.slug === 'smt-machines');

    const paths = [];

    // 1. Product Detail Pages: [subcat, subsubcat, id] or [subcat, id]
    for (const p of machines) {
        if (p.subcategory?.slug && p.subsubcategory?.slug) {
            paths.push({ slug: [p.subcategory.slug, p.subsubcategory.slug, p.id] });
        } else if (p.subcategory?.slug) {
            paths.push({ slug: [p.subcategory.slug, p.id] });
        }
    }

    // 2. Listing Pages (Deduplicated)
    const subcats = new Set(machines.map(p => p.subcategory?.slug).filter(Boolean));
    const subsubcats = new Set(machines.map(p => p.subsubcategory?.slug).filter(Boolean));

    // [subcat]
    subcats.forEach(s => paths.push({ slug: [s!] }));

    // [subcat, subsubcat]
    subcats.forEach(s => {
        subsubcats.forEach(ss => {
            const exists = machines.some(p => p.subcategory?.slug === s && p.subsubcategory?.slug === ss);
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

export default async function SmtMachinesDynamicPage({ params }: Props) {
    const { slug } = await params;

    // Case 1: Product Detail Page
    const potentialId = slug[slug.length - 1];
    let product = null;

    if (/^[0-9a-fA-F]{24}$/.test(potentialId)) {
        product = await getProductById(potentialId);
    }

    if (product && (product as any).category?.slug === 'smt-machines') {
        return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
    }

    // Case 2: Listing Page 
    let initialSubcategorySlug: string | undefined;
    let initialSubcategoryName: string | undefined;
    let initialSubsubcategorySlug: string | undefined;
    let initialSubsubcategoryName: string | undefined;

    // Direct database lookups for each slug segment
    for (const s of slug) {
        // Look up subcategory
        const subcategory = await prisma.subcategory.findFirst({
            where: {
                slug: s,
                category: { slug: 'smt-machines' }
            }
        });

        if (subcategory) {
            initialSubcategorySlug = subcategory.slug;
            initialSubcategoryName = subcategory.name;
            continue;
        }

        // Look up subsubcategory
        const subsubcat = await prisma.subSubcategory.findFirst({
            where: { slug: s }
        });

        if (subsubcat) {
            initialSubsubcategorySlug = subsubcat.slug;
            initialSubsubcategoryName = subsubcat.name;
            continue;
        }
    }

    // Always ensure we are filtering within SMT machines for this page
    const machinesData = await getProducts({
        categorySlug: 'smt-machines',
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
                            : (initialSubcategoryName ? initialSubcategoryName : 'SMT Machines')}
                    </h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                        Explore our comprehensive range of high-quality SMT equipment tailored for your production needs.
                    </p>
                </div>
                <ProductBrowser
                    initialData={JSON.parse(JSON.stringify(machinesData))}
                    rootCategorySlug="smt-machines"
                    initialSubcategory={initialSubcategorySlug}
                    initialSubsubcategory={initialSubsubcategorySlug}
                />
            </div>
        )
    }

    return notFound();
}
