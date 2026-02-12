import React from 'react';
import { notFound } from 'next/navigation';
import {
    getAllParts,
    getPartsBySubcategorySlug
} from '@/lib/api';
import ProductDetail from '@/components/products/ProductDetail';
import ProductListing from '@/components/products/ProductListing';
import { Product } from '@/data/demoProducts';

// Reusing api functions for parts or creating specific ones
// Assuming getProductById works for parts too in the same demoProducts list?
// Wait, `demoProducts` in api.ts ONLY returns `demoProducts` array, but `getAllParts` returns `smtParts`.
// I need `getPartById` or separate logic if IDs can overlap or if they are in different arrays.
// In `api.ts`, `getProductById` searches `demoProducts`. I should update `getProductById` to search BOTH or add `getPartById`.

// Let's check api.ts again. 
// It has `getAllProducts` (demoProducts) and `getAllParts` (smtParts).
// `getProductById` only searches `demoProducts`.
// I need to fix `api.ts` to search parts too, or add a new function.
// For now, I'll inline the find logic or assume I need to fix api.ts.

// QUICK FIX: I will update api.ts in the next step to support parts lookup by ID. 
// For now I will assume `getPartById` exists or I will write a helper here.
import { smtParts } from '@/data/demoProducts';

async function getPartById(id: string) {
    // generic delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return smtParts.find(p => p.id === id);
}

interface Props {
    params: Promise<{
        slug: string[];
    }>
}

export default async function SmtPartsDynamicPage({ params }: Props) {
    const { slug } = await params;

    // Case 1: Part Detail Page (Length 3: /subcategory/brand/id or maybe just /subcategory/id?)
    // Structure: /smt-parts/[subcategory]/[partId] or /smt-parts/[subcategory]/[brand]/[partId]
    // The previous plan was generic. Let's see demoProducts data for parts.
    // Part: id='yamaha-cl-8mm-feeder', subcategorySlug='feeders', brandSlug='yamaha'

    // Logic:
    // If 3 parts: /feeders/yamaha/id
    if (slug.length === 3) {
        const id = slug[2];
        const part = await getPartById(id);
        if (part) return <ProductDetail product={part} />;
    }

    // If 2 parts: /feeders/id (if skipping brand) OR /feeders/yamaha (Listing)
    if (slug.length === 2) {
        // Check if [1] is ID or Brand.
        const potentialId = slug[1];
        const part = await getPartById(potentialId);
        if (part) return <ProductDetail product={part} />;

        // Else listing by brand
        const subcategorySlug = slug[0];
        const brandSlug = slug[1];
        const parts = smtParts.filter(p => p.subcategorySlug === subcategorySlug && p.brandSlug === brandSlug);

        if (parts.length > 0) {
            const title = `${parts[0].brand} ${parts[0].subcategory}`;
            return (
                <ProductListing
                    title={title}
                    description={`Browse ${title}.`}
                    products={parts}
                    breadcrumbs={[
                        { label: 'SMT Parts', href: '/smt-parts' },
                        { label: parts[0].subcategory || subcategorySlug, href: `/smt-parts/${subcategorySlug}` },
                        { label: parts[0].brand, href: `/smt-parts/${subcategorySlug}/${brandSlug}` }
                    ]}
                />
            );
        }
    }

    // Case 2: Subcategory Page (Length 1: /feeders)
    if (slug.length === 1) {
        const subcategorySlug = slug[0];
        const parts = await getPartsBySubcategorySlug(subcategorySlug);

        if (parts.length > 0) {
            const title = parts[0].subcategory || 'Parts Listing';
            return (
                <ProductListing
                    title={title}
                    description={`Browse our collection of ${title}.`}
                    products={parts}
                    breadcrumbs={[
                        { label: 'SMT Parts', href: '/smt-parts' },
                        { label: title, href: `/smt-parts/${subcategorySlug}` }
                    ]}
                />
            );
        }
    }

    return notFound();
}
