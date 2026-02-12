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

    // Case 1: Product Detail Page (Length 3: /subcategory/brand/id)
    // We check this first or last? 
    // If we follow strict hierarchy:
    // [0] = subcategory
    // [1] = brand
    // [2] = product id

    if (slug.length === 3) {
        const productId = slug[2];
        const product = await getProductById(productId);

        if (product) {
            return <ProductDetail product={product} />;
        }
    }

    // Case 2: Subcategory Page (Length 1: /subcategory)
    if (slug.length === 1) {
        const subcategorySlug = slug[0];
        // Fetch products for this subcategory
        const products = await getProductsBySubcategorySlug(subcategorySlug);

        if (products.length > 0) {
            // Derive title from the first product or a lookup map (simplified here)
            const title = products[0].subcategory || 'Machine Listing';

            return (
                <ProductListing
                    title={title}
                    description={`Explore our range of ${title}.`}
                    products={products}
                    breadcrumbs={[
                        { label: 'SMT Machines', href: '/smt-machines' },
                        { label: title, href: `/smt-machines/${subcategorySlug}` }
                    ]}
                />
            );
        }
    }

    // Case 3: Brand Page (Length 2: /subcategory/brand)
    if (slug.length === 2) {
        const subcategorySlug = slug[0];
        const brandSlug = slug[1];

        const products = await getProductsByFilters({
            subcategorySlug,
            brandSlug
        });

        if (products.length > 0) {
            const title = `${products[0].brand} ${products[0].subcategory}`;

            return (
                <ProductListing
                    title={title}
                    description={`Browse detailed specifications for ${title}.`}
                    products={products}
                    breadcrumbs={[
                        { label: 'SMT Machines', href: '/smt-machines' },
                        { label: products[0].subcategory || subcategorySlug, href: `/smt-machines/${subcategorySlug}` },
                        { label: products[0].brand, href: `/smt-machines/${subcategorySlug}/${brandSlug}` }
                    ]}
                />
            );
        }
    }

    // If nothing matched
    return notFound();
}
