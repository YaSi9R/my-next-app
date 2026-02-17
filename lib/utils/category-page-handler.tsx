import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductBySlug,
    getProducts
} from '@/lib/services/product-service';
import ProductDetail from '@/components/products/ProductDetail';
import ProductBrowser from '@/components/products/ProductBrowser';
import { prisma } from '@/lib/prisma';

/**
 * Generic utility function to create a category-based dynamic page handler
 * This works for ANY category (smt-machines, smt-parts, board-handling, etc.)
 */

interface DynamicPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

interface CategoryPageConfig {
    categorySlug: string;
    categoryName: string;
    pageTitle: string;
    pageDescription: string;
}

export function createCategoryPageHandler(config: CategoryPageConfig) {
    async function CategoryPage({ params }: DynamicPageProps) {
        const { slug } = await params;
        const { categorySlug, categoryName, pageTitle, pageDescription } = config;

        console.log(`[${categorySlug}] Dynamic page called with slug:`, slug);

        // Case 1: Try resolving as a Product Detail Page
        if (slug.length >= 2) {
            const potentialProductSlug = slug[slug.length - 1];
            console.log(`[${categorySlug}] Attempting to resolve as product:`, potentialProductSlug);

            const product = await getProductBySlug(potentialProductSlug);

            if (product && product.category?.slug.toLowerCase() === categorySlug.toLowerCase()) {
                console.log(`[${categorySlug}] Product found, rendering detail page`);
                return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
            }
        }

        // Case 2: Listing Page 
        let initialSubcategorySlug: string | undefined;
        let initialSubcategoryName: string | undefined;
        let initialSubcategoryId: string | undefined;
        let initialSubsubcategorySlug: string | undefined;
        let initialSubsubcategoryName: string | undefined;

        // Resolve hierarchy by walking through URL segments
        for (const s of slug) {
            const normalizedSlug = s.toLowerCase();

            // Try to find subcategory
            if (!initialSubcategorySlug) {
                const subcategory = await prisma.subcategory.findFirst({
                    where: {
                        slug: { equals: normalizedSlug, mode: 'insensitive' },
                        category: { slug: { equals: categorySlug, mode: 'insensitive' } }
                    }
                });
                if (subcategory) {
                    initialSubcategorySlug = subcategory.slug;
                    initialSubcategoryName = subcategory.name;
                    initialSubcategoryId = subcategory.id;
                    console.log(`[${categorySlug}] Subcategory found:`, subcategory.name);
                    continue;
                }
            }

            // Try to find sub-subcategory
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
                    console.log(`[${categorySlug}] Sub-subcategory found:`, subsubcat.name);
                    continue;
                }
            }
        }

        // If we resolved at least a subcategory, it's a valid listing page
        if (initialSubcategorySlug) {
            console.log(`[${categorySlug}] Fetching products for hierarchy:`, {
                category: categorySlug,
                subcategory: initialSubcategorySlug,
                subsubcategory: initialSubsubcategorySlug
            });

            const productsData = await getProducts({
                categorySlug,
                subcategorySlug: initialSubcategorySlug,
                subsubcategorySlug: initialSubsubcategorySlug,
                limit: 50
            });

            console.log(`[${categorySlug}] Rendering listing page with`, productsData.products.length, 'products');

            return (
                <div className="min-h-screen bg-[#e6e6e6]">
                    <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {initialSubsubcategoryName
                                ? initialSubsubcategoryName
                                : (initialSubcategoryName ? initialSubcategoryName : pageTitle)}
                        </h1>
                        <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                            {pageDescription}
                        </p>
                    </div>
                    <ProductBrowser
                        key={`${initialSubcategorySlug || 'all'}-${initialSubsubcategorySlug || 'none'}`}
                        initialData={JSON.parse(JSON.stringify(productsData))}
                        rootCategorySlug={categorySlug}
                        initialSubcategory={initialSubcategorySlug}
                        initialSubsubcategory={initialSubsubcategorySlug}
                    />
                </div>
            );
        }

        console.log(`[${categorySlug}] No valid hierarchy found, showing 404`);
        return notFound();
    }

    return CategoryPage;
}

// Export a function to generate static params generically
export function createStaticParamsGenerator(categorySlug: string) {
    async function generateStaticParams() {
        const { products } = await getProducts({ categorySlug, limit: 500 });

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
            where: { category: { slug: categorySlug } }
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

    return generateStaticParams;
}
