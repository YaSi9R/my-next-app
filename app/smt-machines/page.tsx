import React from 'react';
import SmtMachineBrowser from '@/components/products/SmtMachineBrowser';
import { getAllProducts } from '@/lib/api';

export default async function SmtMachinesPage() {
    const products = await getAllProducts();

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* Hero / Header Area could go here if needed, but Browser includes a header */}
            <div className="bg-[#022c75] py-12 text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">SMT Machines</h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto px-4">
                    Explore our comprehensive range of high-quality SMT equipment tailored for your production needs.
                </p>
            </div>
            <SmtMachineBrowser products={products} />
        </div>
    );
}
