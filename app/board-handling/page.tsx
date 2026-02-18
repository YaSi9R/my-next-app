import React from 'react';
import ProductBrowser from '@/components/products/ProductBrowser';
import { getProducts } from '@/lib/services/product-service';

export default async function BoardHandlingPage() {
    const products = await getProducts({ categorySlug: 'board-handling' });

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            <div className="bg-[#e6e6e6] py-16 text-[#022c75] text-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Board Handling Solutions</h1>
                    <p className="text-xl text-[#022c75] max-w-2xl mx-auto  leading-relaxed">
                       PCB handling, automation and consumables built for efficient SMT production.
                    </p>
                </div>
            </div>
            <ProductBrowser initialData={JSON.parse(JSON.stringify(products)) || { products: [], total: 0, totalPages: 0 }} rootCategorySlug="board-handling" />
        </div>
    );
}
