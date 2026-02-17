import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductBySlug,
    getProducts
} from '@/lib/services/product-service';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';
import { prisma } from '@/lib/prisma';

export const dynamicParams = true;

export async function generateStaticParams() {
    const { products } = await getProducts({ categorySlug: 'smt-parts', limit: 500 });

    const paths = [];

    for (const p of products) {
        if (p.subcategory?.slug && p.subsubcategory?.slug) {
            // [subcat, subsubcat, product-slug]
            paths.push({ slug: [p.subcategory.slug, p.subsubcategory.slug, p.slug] });
        } else if (p.subcategory?.slug) {
            // [subcat, product-slug]
            paths.push({ slug: [p.subcategory.slug, p.slug] });
        }
    }

    // Listing Pages
    const subcats = await prisma.subcategory.findMany({
        where: { category: { slug: 'smt-parts' } }
    });

    for (const s of subcats) {
        paths.push({ slug: [s.slug] });
        const subsubs = await prisma.subSubcategory.findMany({
            where: { subcategoryId: s.id }
        });
        for (const ss of subsubs) {
            paths.push({ slug: [s.slug, ss.slug] });
        }
    }

    return paths;
}

interface Props {
    params: Promise<{
        slug: string[];
    }>
}

export default async function SmtPartsDynamicPage({ params }: Props) {
    const { slug } = await params;

    // Case 1: Try resolving as a Product Detail Page
    if (slug.length >= 2) {
        const potentialProductSlug = slug[slug.length - 1];
        const product = await getProductBySlug(potentialProductSlug);

        if (product && product.category?.slug.toLowerCase() === 'smt-parts') {
            return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
        }
    }

    // Case 2: Listing Page 
    let initialSubcategorySlug: string | undefined;
    let initialSubcategoryName: string | undefined;
    let initialSubcategoryId: string | undefined;
    let initialSubsubcategorySlug: string | undefined;
    let initialSubsubcategoryName: string | undefined;

    // Resolve hierarchy
    for (const s of slug) {
        const normalizedSlug = s.toLowerCase();

        if (!initialSubcategorySlug) {
            const subcategory = await prisma.subcategory.findFirst({
                where: {
                    slug: { equals: normalizedSlug, mode: 'insensitive' },
                    category: { slug: { equals: 'smt-parts', mode: 'insensitive' } }
                }
            });
            if (subcategory) {
                initialSubcategorySlug = subcategory.slug;
                initialSubcategoryName = subcategory.name;
                initialSubcategoryId = subcategory.id;
                continue;
            }
        }

        if (initialSubcategoryId && !initialSubsubcategorySlug) {
            const subsubcat = await prisma.subSubcategory.findFirst({
                where: {
                    slug: { equals: normalizedSlug, mode: 'insensitive' },
                    subcategoryId: initialSubcategoryId
                }
            });
            if (subsubcat) {
                initialSubsubcategorySlug = subsubcat.slug;
                initialSubsubcategoryName = subsubcat.name;
                continue;
            }
        }
    }

    if (initialSubcategorySlug) {
        const partsData = await getProducts({
            categorySlug: 'smt-parts',
            subcategorySlug: initialSubcategorySlug,
            subsubcategorySlug: initialSubsubcategorySlug,
            limit: 12
        });

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
        );
    }

    return notFound();
}
