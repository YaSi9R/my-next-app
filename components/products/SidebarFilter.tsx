"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, X, Filter } from "lucide-react";

interface SidebarFilterProps {
    categories: { name: string; slug: string }[];
    types?: { name: string; slug: string }[];
    brands: { name: string; slug: string }[];
    selectedCategory: string | null;
    selectedTypes?: string[];
    selectedBrands: string[];
    onCategoryChange: (categorySlug: string | null) => void;
    onTypeChange?: (typeSlug: string) => void;
    onBrandChange: (brandSlug: string) => void;
    className?: string;
}

export default function SidebarFilter({
    categories,
    types = [],
    brands,
    selectedCategory,
    selectedTypes = [],
    selectedBrands,
    onCategoryChange,
    onTypeChange,
    onBrandChange,
    className = "",
}: SidebarFilterProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden w-full bg-white border border-gray-200 text-[#022c75] px-4 py-3 rounded-xl mb-6 flex items-center justify-between font-bold shadow-sm"
            >
                <span className="flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                </span>
                <ChevronRight size={18} />
            </button>

            {/* Sidebar Container */}
            <aside
                className={`
          fixed inset-0 z-50 bg-white lg:bg-transparent lg:static lg:z-auto transition-transform duration-300 transform
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
            >
                <div className="h-full overflow-y-auto p-6 lg:p-0 border-r lg:border-none border-gray-100 lg:pr-8">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-[#022c75]">Filters</h2>
                        <button onClick={() => setIsMobileOpen(false)} className="p-2 text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-[#022c75] mb-6 flex items-center gap-2">
                            Category
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => {
                                        onCategoryChange(null);
                                        setIsMobileOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm font-medium ${selectedCategory === null
                                        ? "bg-[#022c75] text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    All Categories
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.slug} className="space-y-2">
                                    <button
                                        onClick={() => {
                                            onCategoryChange(selectedCategory === cat.slug ? null : cat.slug);
                                            setIsMobileOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm font-bold flex items-center justify-between group ${selectedCategory === cat.slug
                                            ? "bg-[#022c75] text-white shadow-md"
                                            : "text-[#022c75] hover:bg-gray-100"
                                            }`}
                                    >
                                        {cat.name}
                                        {selectedCategory === cat.slug && <ChevronDown size={14} className="opacity-70" />}
                                    </button>

                                    {/* Sub-categories (Types) */}
                                    {selectedCategory === cat.slug && types.length > 0 && (
                                        <ul className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                            {types.map((type) => (
                                                <li key={type.slug}>
                                                    <button
                                                        onClick={() => onTypeChange?.(type.slug)}
                                                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-semibold transition-all border-l-2 ${selectedTypes.includes(type.slug)
                                                            ? "border-[#022c75] text-[#022c75] bg-blue-50"
                                                            : "border-transparent text-gray-500 hover:text-[#022c75] hover:bg-gray-50 hover:border-gray-200"
                                                            }`}
                                                    >
                                                        {type.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brands */}
                    <div>
                        <h3 className="text-xl font-bold text-[#022c75] mb-6 flex items-center gap-2">
                            Filter by Brands
                        </h3>
                        <div className="space-y-3">
                            {brands.map((brand) => (
                                <label
                                    key={brand.slug}
                                    className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand.slug)}
                                            onChange={() => onBrandChange(brand.slug)}
                                            className="peer w-5 h-5 border-2 border-gray-300 rounded focus:ring-0 checked:bg-[#022c75] checked:border-[#022c75] transition-all"
                                        />
                                        <ChevronDown
                                            size={12}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                            strokeWidth={4}
                                        />
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${selectedBrands.includes(brand.slug) ? 'text-[#022c75]' : 'text-gray-600'}`}>
                                        {brand.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Apply Button */}
                    <div className="mt-8 lg:hidden">
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="w-full bg-[#022c75] text-white font-bold py-4 rounded-xl shadow-lg"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}
