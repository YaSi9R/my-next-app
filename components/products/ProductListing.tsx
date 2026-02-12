'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter, X } from 'lucide-react';
import { Product } from '@/data/demoProducts';

interface Props {
    title: string;
    description: string;
    products: Product[];
    breadcrumbs: { label: string; href: string }[];
}

export default function ProductListing({ title, description, products, breadcrumbs }: Props) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Get unique brands and conditions for filters
    const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products]);
    const conditions = useMemo(() => Array.from(new Set(products.map(p => p.condition))).sort(), [products]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const conditionMatch = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
            return brandMatch && conditionMatch;
        });
    }, [products, selectedBrands, selectedConditions]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleCondition = (condition: string) => {
        setSelectedConditions(prev =>
            prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedConditions([]);
    };

    return (
        <div className="min-h-screen bg-[#022c75] py-12 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumb */}
                <div className="text-sm mb-6 flex items-center gap-1">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            <span className="text-gray-500">/</span>
                            {idx === breadcrumbs.length - 1 ? (
                                <span className="text-white font-semibold">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.href} className="text-gray-400 hover:text-white transition-colors">{crumb.label}</Link>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-300">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg mb-4 w-fit border border-white/20"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:w-64 space-y-8 bg-[#022c75] lg:bg-transparent transition-transform duration-300 transform ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="flex flex-col h-full lg:h-auto p-6 lg:p-0 overflow-y-auto">
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <h2 className="text-2xl font-bold text-white">Filters</h2>
                                <button onClick={() => setIsMobileFilterOpen(false)} className="text-white p-2">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 opacity-50">Manufacturer</h3>
                                <div className="space-y-3">
                                    {brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-blue-500 transition-all cursor-pointer"
                                            />
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Condition Filter */}
                            <div className="mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 opacity-50">Condition</h3>
                                <div className="space-y-3">
                                    {conditions.map(condition => (
                                        <label key={condition} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedConditions.includes(condition)}
                                                onChange={() => toggleCondition(condition)}
                                                className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-blue-500 transition-all cursor-pointer"
                                            />
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{condition}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {(selectedBrands.length > 0 || selectedConditions.length > 0) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest mt-2 px-2 transition-colors inline-flex items-center gap-2"
                                >
                                    <X className="w-3 h-3" />
                                    Clear All Filters
                                </button>
                            )}

                            <div className="mt-8 lg:hidden">
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full bg-white text-[#022c75] font-bold py-4 rounded-xl shadow-lg"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/${product.categorySlug}/${product.subcategorySlug || 'other'}/${product.brandSlug}/${product.id}`}
                                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
                                    >
                                        {/* Image Box */}
                                        <div className="relative h-64 flex items-center justify-center overflow-hidden bg-white border-b border-gray-100">
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-[#022c75]"></div>
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="text-4xl font-bold text-gray-200 group-hover:scale-110 transition-transform uppercase tracking-tighter">
                                                    {product.brand}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-start justify-between mb-4 gap-4">
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#022c75] transition-colors leading-tight">{product.name}</h3>
                                                <span className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {product.condition}
                                                </span>
                                            </div>

                                            <p className="mb-6 line-clamp-2 text-sm text-gray-500 font-medium leading-relaxed">
                                                {product.shortDescription}
                                            </p>

                                            {/* Specs List */}
                                            <div className="space-y-3 mb-8 flex-1">
                                                {product.specifications.slice(0, 3).map((spec, idx) => (
                                                    <div key={idx} className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">
                                                        <span>{spec.label}</span>
                                                        <span className="text-gray-800">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Bar */}
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Pricing</span>
                                                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Request Quote</span>
                                                </div>
                                                <div className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] text-[#022c75] group-hover:gap-4 transition-all pr-1">
                                                    Details
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-white/5 rounded-[40px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                                <Filter className="w-12 h-12 text-white/20 mb-6" />
                                <p className="text-white text-2xl font-bold mb-2">No products found</p>
                                <p className="text-gray-400 mb-8 max-w-xs mx-auto">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-white text-[#022c75] px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
