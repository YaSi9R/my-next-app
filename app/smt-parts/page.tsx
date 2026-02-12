import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, Wrench, CircleDot } from 'lucide-react';
import { getAllParts } from '@/lib/api';

const iconMap: Record<string, any> = {
    'feeders': Settings,
    'nozzles': CircleDot,
    'spare-parts': Wrench,
};

export default async function SmtPartsPage() {
    const parts = await getAllParts();

    // Extract unique subcategories
    const subcategoriesMap = new Map();

    parts.forEach(part => {
        if (part.subcategorySlug && !subcategoriesMap.has(part.subcategorySlug)) {
            subcategoriesMap.set(part.subcategorySlug, {
                name: part.subcategory || 'Parts',
                description: `High-quality ${part.subcategory || 'parts'} for your SMT line.`,
                href: `/smt-parts/${part.subcategorySlug}`,
                slug: part.subcategorySlug
            });
        }
    });

    const categories = Array.from(subcategoriesMap.values());

    return (
        <div className="min-h-screen bg-[#022c75] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        SMT Spare Parts
                    </h1>
                    <p className="text-xl text-gray-300">
                        Keep your line running with high-quality spare parts and consumables
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {categories.map((category) => {
                        const Icon = iconMap[category.slug] || Wrench;
                        return (
                            <Link
                                key={category.slug}
                                href={category.href}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-[#e6e6e6] transition-colors">
                                        <Icon className="w-8 h-8 text-[#022c75] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#022c75] mb-2">{category.name}</h2>
                                        <p className="text-gray-600 mb-4">{category.description}</p>
                                        <span className="inline-flex items-center gap-2 text-[#022c75] font-semibold group-hover:gap-3 transition-all">
                                            Browse Parts
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {categories.length === 0 && (
                        <div className="col-span-full text-center text-white">
                            <p>No part categories found. Please add parts to the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
