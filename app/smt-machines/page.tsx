import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Printer, Activity } from 'lucide-react';
import { getAllProducts } from '@/lib/api';

// Map specific slugs to icons, default to Layers
const iconMap: Record<string, any> = {
    'pick-and-place': Cpu,
    'reflow-ovens': Layers,
    'spi': Printer,
    'screen-printers': Printer,
};

export default async function SmtMachinesPage() {
    const products = await getAllProducts();

    // Filter for machines and extract unique subcategories
    const machineProducts = products.filter(p => p.categorySlug === 'smt-machines');

    const subcategoriesMap = new Map();

    machineProducts.forEach(product => {
        if (product.subcategorySlug && !subcategoriesMap.has(product.subcategorySlug)) {
            subcategoriesMap.set(product.subcategorySlug, {
                name: product.subcategory || 'Other Machines',
                description: `Browse our collection of ${product.subcategory || 'machines'}.`, // Generic description or we could add this to data
                href: `/smt-machines/${product.subcategorySlug}`,
                slug: product.subcategorySlug
            });
        }
    });

    const categories = Array.from(subcategoriesMap.values());

    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold  mb-4 text-[#022c75]">
                        SMT Machines
                    </h1>
                    <p className="text-xl text-[#022c75]">
                        Explore our range of high-quality SMT equipment
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {categories.map((category) => {
                        const Icon = iconMap[category.slug] || Activity;
                        return (
                            <Link
                                key={category.slug}
                                href={category.href}
                                className="bg-[#022c75] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-[#e6e6e6] transition-colors">
                                        <Icon className="w-8 h-8 text-[#022c75]   transition-colors" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#e6e6e6] mb-2">{category.name}</h2>
                                        <p className="text-gray-400 mb-4">{category.description}</p>
                                        <span className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold group-hover:gap-3 transition-all">
                                            View Machines
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {categories.length === 0 && (
                        <div className="col-span-full text-center text-white">
                            <p>No machine categories found. Please add products to the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
