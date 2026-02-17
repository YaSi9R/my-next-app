"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, X, Filter } from "lucide-react";

interface SidebarFilterProps {
    categories: { name: string; slug: string }[];
    types?: { name: string; slug: string }[];
    selectedCategory: string | null;
    selectedTypes?: string[];
    onCategoryChange: (categorySlug: string | null) => void;
    onTypeChange?: (typeSlug: string) => void;
    className?: string;
}

export default function SidebarFilter({
    categories,
    types = [],
    selectedCategory,
    selectedTypes = [],
    onCategoryChange,
    onTypeChange,
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

                    {/* Categories (Subcategories in our new flow) */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-[#022c75] mb-6 flex items-center gap-2">
                            Categories
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
                                    All Items
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.slug}>
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
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Types (Sub-subcategories in a separate section) */}
                    {types.length > 0 && (
                        <div className="mb-10 animate-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-[#022c75] mb-6 flex items-center gap-2">
                                Sub-Categories
                            </h3>
                            <div className="space-y-3">
                                {types.map((type) => (
                                    <label
                                        key={type.slug}
                                        className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type.slug)}
                                                onChange={() => onTypeChange?.(type.slug)}
                                                className="peer w-5 h-5 border-2 border-gray-300 rounded focus:ring-0 checked:bg-[#022c75] checked:border-[#022c75] transition-all"
                                            />
                                            <ChevronDown
                                                size={12}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                                strokeWidth={4}
                                            />
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${selectedTypes.includes(type.slug) ? 'text-[#022c75]' : 'text-gray-600'}`}>
                                            {type.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

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
