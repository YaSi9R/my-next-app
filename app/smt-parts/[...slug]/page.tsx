import React from 'react';
import { notFound } from 'next/navigation';
import {
    getAllParts,
    getPartsBySubcategorySlug,
    getProductById
} from '@/lib/api';
import ProductDetail from '@/components/products/ProductDetail';
import ProductListing from '@/components/products/ProductListing';

interface Props {
    params: Promise<{
        slug: string[];
    }>
}

export default async function SmtPartsDynamicPage({ params }: Props) {
    const { slug: rawSlug } = await params;
    const slug = rawSlug.map(s => decodeURIComponent(s));
    const allParts = await getAllParts();

    // Helper to identify slug types
    const findBrand = (s: string) => allParts.find(p => p.brandSlug === s)?.brandSlug;
    const findSubcat = (s: string) => allParts.find(p => p.subcategorySlug === s)?.subcategorySlug;

    // Case 1: Detail Page (Segment 3 is ID, or Segment 2 is ID)
    // Try to find if any segment is a valid product ID
    for (const segment of [...slug].reverse()) {
        const part = await getProductById(segment);
        if (part && part.categorySlug === 'smt-parts') {
            return <ProductDetail product={part} />;
        }
    }

    // Case 2: Listing Page (Length 2: brand/subcat or subcat/brand)
    if (slug.length === 2) {
        let brandSlug: string | undefined;
        let subcatSlug: string | undefined;

        // Try to identify which is which
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
            const parts = allParts.filter(p =>
                (!brandSlug || p.brandSlug === brandSlug) &&
                (!subcatSlug || p.subcategorySlug === subcatSlug)
            );

            if (parts.length > 0) {
                const title = brandSlug && subcatSlug
                    ? `${parts[0].brand} ${parts[0].subcategory}`
                    : (brandSlug ? `${parts[0].brand} Parts` : parts[0].subcategory);

                return (
                    <ProductListing
                        title={title || 'Parts Listing'}
                        description={`Browse our range of ${title || 'parts'}.`}
                        products={parts}
                        breadcrumbs={[
                            { label: 'SMT Parts', href: '/smt-parts' },
                            { label: (brandSlug ? parts[0].brand : (parts[0].subcategory || 'Parts')) || 'Parts', href: `/smt-parts/${slug[0]}` },
                            { label: (subcatSlug && brandSlug ? (slug[0] === brandSlug ? parts[0].subcategory : parts[0].brand) : '') || '', href: `/smt-parts/${slug[0]}/${slug[1]}` }
                        ].filter(b => b.label)}
                    />
                );
            }
        }
    }

    // Case 3: Single segment (Brand or Subcategory or ID or 'others')
    if (slug.length === 1) {
        const s = slug[0];
        const priorityBrands = ['yamaha', 'fuji', 'panasonic'];

        // Special case for 'others' bucket
        if (s === 'others') {
            const parts = allParts.filter(p => !priorityBrands.includes(p.brandSlug?.toLowerCase() || ''));
            if (parts.length > 0) {
                return (
                    <ProductListing
                        title="Other Brand Parts"
                        description="Browse spare parts for various SMT manufacturers."
                        products={parts}
                        breadcrumbs={[
                            { label: 'SMT Parts', href: '/smt-parts' },
                            { label: 'Others', href: '/smt-parts/others' }
                        ]}
                    />
                );
            }
        }

        const isBrand = findBrand(s);
        const isSubcat = findSubcat(s);

        const parts = allParts.filter(p => p.brandSlug === s || p.subcategorySlug === s);

        if (parts.length > 0) {
            const title = isBrand ? `${parts[0].brand} Parts` : (parts[0].subcategory || 'Parts Listing');
            return (
                <ProductListing
                    title={title}
                    description={`Browse our ${title}.`}
                    products={parts}
                    breadcrumbs={[
                        { label: 'SMT Parts', href: '/smt-parts' },
                        { label: title, href: `/smt-parts/${s}` }
                    ]}
                />
            );
        }
    }

    return notFound();
}
