import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, Wrench, CircleDot, Check, Printer, Cpu } from 'lucide-react';
import { getAllParts } from '@/lib/api';

const iconMap: Record<string, any> = {
    'yamaha': Settings,
    'fuji': Printer,
    'panasonic': Cpu,
    'others': Wrench,
};

export default async function SmtPartsPage() {
    const parts = await getAllParts();

    // Extract unique brands with counts
    const brandsMap = new Map();
    const priorityBrands = ['yamaha', 'fuji', 'panasonic'];

    parts.forEach(part => {
        const brandSlug = part.brandSlug?.toLowerCase() || 'others';
        const targetSlug = priorityBrands.includes(brandSlug) ? brandSlug : 'others';
        const targetName = priorityBrands.includes(brandSlug) ? part.brand : 'Others';

        const existing = brandsMap.get(targetSlug);
        if (!existing) {
            brandsMap.set(targetSlug, {
                name: targetName || 'Others',
                description: `High-quality spare parts for ${targetName} SMT equipment.`,
                href: `/smt-parts/${targetSlug}`,
                slug: targetSlug,
                count: 1
            });
        } else {
            existing.count++;
        }
    });

    // Ensure they appear in order: Yamaha, Fuji, Panasonic, Others
    const categories = [
        ...priorityBrands.map(b => brandsMap.get(b)).filter(Boolean),
        brandsMap.get('others')
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-[#e6e6e6] py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#022c75] mb-4">
                        SMT Spare Parts
                    </h1>
                    <p className="text-xl text-[#022c75]">
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
                                className="bg-[#022c75] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="bg-blue-50 p-4 rounded-xl  transition-colors">
                                        <Icon className="w-8 h-8 text-[#022c75] transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-2xl font-bold text-[#e6e6e6]">{category.name}</h2>
                                            <span className="text-gray-400 text-xs font-bold">{category.count} ITEMS</span>
                                        </div>
                                        <p className="text-[#e6e6e6] mb-4">{category.description}</p>
                                        <span className="inline-flex items-center gap-2 text-[#e6e6e6] font-semibold group-hover:gap-3 transition-all">
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
