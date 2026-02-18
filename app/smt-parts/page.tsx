import React from 'react';
import ProductBrowser from '@/components/products/ProductBrowser';
import { getProducts } from '@/lib/services/product-service';

export default async function SmtPartsPage() {
    const products = await getProducts({ categorySlug: 'smt-parts' });

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">SMT Spare Parts</h1>
                <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                   Reliable SMT spare parts, from feeders to nozzles and beyond.it all.
                </p>
            </div>
            <ProductBrowser initialData={JSON.parse(JSON.stringify(products)) || { products: [], total: 0, totalPages: 0 }} rootCategorySlug="smt-parts" />
        </div>
    );
}
