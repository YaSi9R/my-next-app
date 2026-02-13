import React from 'react';
import ProductBrowser from '@/components/products/ProductBrowser';
import { getAllProducts } from '@/lib/api';

export default async function SmtPartsPage() {
    const products = await getAllProducts();

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">SMT Spare Parts</h1>
                <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                    High-quality spare parts for all your SMT equipment needs. From feeders to nozzles, we have it all.
                </p>
            </div>
            <ProductBrowser products={products} rootCategorySlug="smt-parts" />
        </div>
    );
}
