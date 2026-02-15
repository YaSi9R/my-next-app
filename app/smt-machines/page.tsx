import React from 'react';
import ProductBrowser from '@/components/products/ProductBrowser';
import { getProducts } from '@/lib/services/product-service';

export default async function SmtMachinesPage() {
    const initialData = await getProducts({ categorySlug: 'smt-machines' });

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            <div className="bg-[#e6e6e6] py-12 text-center text-[#022c75] mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">SMT Machines</h1>
                <p className="text-xl text-[#022c75] max-w-2xl mx-auto px-4">
                    Explore our comprehensive range of high-quality SMT equipment tailored for your production needs.
                </p>
            </div>
            <ProductBrowser initialData={JSON.parse(JSON.stringify(initialData)) || { products: [], total: 0, totalPages: 0 }} rootCategorySlug="smt-machines" />
        </div>
    );
}
