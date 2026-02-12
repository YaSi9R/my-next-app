import React from 'react';
import { notFound } from 'next/navigation';
import {
    getProductById,
    getProductsBySubcategorySlug,
    getProductsByFilters,
    getAllProducts
} from '@/lib/api';
import ProductDetail from '@/components/products/ProductDetail';
import ProductListing from '@/components/products/ProductListing';

export async function generateStaticParams() {
    const products = await getAllProducts();

    // Generate paths for all products: /smt-machines/[subcategory]/[brand]/[id]
    const productPaths = products.map(p => ({
        slug: [p.subcategorySlug || 'other', p.brandSlug, p.id]
    }));

    // We can also generate paths for subcategories and brands if we have a list of them
    // For now, let's just enable dynamic rendering for unknown paths or rely on ISR
    return productPaths;
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
    const findBrand = (s: string) => allProducts.find(p => p.brandSlug === s)?.brandSlug;
    const findSubcat = (s: string) => allProducts.find(p => p.subcategorySlug === s)?.subcategorySlug;

    // Case 1: Product Detail Page (Try segments for ID)
    for (const segment of [...slug].reverse()) {
        const product = await getProductById(segment);
        if (product && product.categorySlug === 'smt-machines') {
            return <ProductDetail product={product} />;
        }
    }

    // Case 2: Listing Page (Length 2: brand/subcat or subcat/brand)
    if (slug.length === 2) {
        let brandSlug: string | undefined;
        let subcatSlug: string | undefined;

        const s0_isBrand = findBrand(slug[0]);
        const s0_isSubcat = findSubcat(slug[0]);
        const s1_isBrand = findBrand(slug[1]);
        const s1_isSubcat = findSubcat(slug[1]);

        if (s0_isBrand && s1_isSubcat) {
            brandSlug = s0_isBrand;
            subcatSlug = s1_isSubcat;
        } else if (s0_isSubcat && s1_isBrand) {
            subcatSlug = s0_isSubcat;
            brandSlug = s1_isBrand;
        }

        if (brandSlug || subcatSlug) {
            const products = allProducts.filter(p =>
                (!brandSlug || p.brandSlug === brandSlug) &&
                (!subcatSlug || p.subcategorySlug === subcatSlug)
            );

            if (products.length > 0) {
                const title = brandSlug && subcatSlug
                    ? `${products[0].brand} ${products[0].subcategory}`
                    : (brandSlug ? `${products[0].brand} Machines` : products[0].subcategory);

                return (
                    <ProductListing
                        title={title || 'Machine Listing'}
                        description={`Browse our range of ${title || 'machines'}.`}
                        products={products}
                        breadcrumbs={[
                            { label: 'SMT Machines', href: '/smt-machines' },
                            { label: (brandSlug ? products[0].brand : (products[0].subcategory || 'Machines')) || 'Machines', href: `/smt-machines/${slug[0]}` },
                            { label: (subcatSlug && brandSlug ? (slug[0] === brandSlug ? products[0].subcategory : products[0].brand) : '') || '', href: `/smt-machines/${slug[0]}/${slug[1]}` }
                        ].filter(b => b.label)}
                    />
                );
            }
        }
    }

    // Case 3: Single segment (Brand or Subcategory)
    if (slug.length === 1) {
        const s = slug[0];
        const isBrand = findBrand(s);
        const isSubcat = findSubcat(s);

        const products = allProducts.filter(p => p.brandSlug === s || p.subcategorySlug === s);

        if (products.length > 0) {
            const title = isBrand ? `${products[0].brand} Machines` : (products[0].subcategory || 'Machine Listing');
            return (
                <ProductListing
                    title={title}
                    description={`Explore our collection of ${title}.`}
                    products={products}
                    breadcrumbs={[
                        { label: 'SMT Machines', href: '/smt-machines' },
                        { label: title, href: `/smt-machines/${s}` }
                    ]}
                />
            );
        }
    }

    return notFound();
}
