"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import SidebarFilter from "./SidebarFilter";
import { Product } from "@/data/demoProducts";
import { useRouter, usePathname } from "next/navigation";

interface SmtMachineBrowserProps {
    products: Product[];
    initialCategory?: string;
    initialBrand?: string;
}

export default function SmtMachineBrowser({
    products,
    initialCategory,
    initialBrand,
}: SmtMachineBrowserProps) {
    const router = useRouter();
    const pathname = usePathname();

    // State
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialCategory || null
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );

    // Derive Categories and Brands from products
    // We only want SMT Machines categories
    const categories = useMemo(() => {
        const map = new Map();
        products.forEach((p) => {
            if (p.categorySlug === "smt-machines" && p.subcategory && p.subcategorySlug) {
                if (!map.has(p.subcategorySlug)) {
                    map.set(p.subcategorySlug, p.subcategory);
                }
            }
        });
        return Array.from(map.entries()).map(([slug, name]) => ({ name, slug }));
    }, [products]);

    const brands = useMemo(() => {
        return Array.from(new Set(products.map((p) => p.brand))).sort();
    }, [products]);

    // Handle URL updates when category changes
    // Strategy: If user is on /smt-machines/pick-and-place, and clears category -> go to /smt-machines
    // If user is on /smt-machines, and clicks "Pick & Place" -> go to /smt-machines/pick-and-place
    // NOTE: This might cause a page reload if we use router.push with a new path. 
    // For a "browser" feel, we might want to stay on the same page and just filter, 
    // BUT the user specifically asked for "active category machines first", implying specific landing pages.
    // Let's use internal state for filtering, but MAYBE sync URL if it feels right. 
    // Actually, for SEO and deep linking, strict URL routing is better.
    // However, the user wants a "Left hand side filtering system" on the category page too.
    // So, let's keep it simple: Clicking a category in the sidebar navigates to that category's page.
    // This ensures the "active category" requirement is met natively.

    const handleCategoryChange = (slug: string | null) => {
        if (slug) {
            router.push(`/smt-machines/${slug}`);
        } else {
            router.push(`/smt-machines`);
        }
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // 1. Must be SMT Machines
            if (product.categorySlug !== 'smt-machines') return false;

            // 2. Category Match (if selected)
            if (selectedCategory && product.subcategorySlug !== selectedCategory) {
                return false;
            }

            // 3. Brand Match (if any selected)
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
                return false;
            }

            return true;
        });
    }, [products, selectedCategory, selectedBrands]);

    // Sync state if props change (e.g. navigation)
    useEffect(() => {
        setSelectedCategory(initialCategory || null);
    }, [initialCategory]);

    useEffect(() => {
        if (initialBrand) {
            setSelectedBrands([initialBrand]);
        } else {
            // Only clear if we are navigating to a root or category page without brand
            // But valid use case is navigating from brand page to root. 
            // For now, let's trust the user interaction for brands unless separate URL for brand exists
        }
    }, [initialBrand]);


    return (
        <div className="container mx-auto px-4 max-w-7xl py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/4 flex-shrink-0">
                    <SidebarFilter
                        categories={categories}
                        brands={brands}
                        selectedCategory={selectedCategory}
                        selectedBrands={selectedBrands}
                        onCategoryChange={handleCategoryChange}
                        onBrandChange={handleBrandChange}
                    />
                </div>

                {/* Product Grid */}
                <div className="lg:w-3/4">
                    {/* Header / Meta */}
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#022c75]">
                                {selectedCategory
                                    ? categories.find(c => c.slug === selectedCategory)?.name
                                    : "All SMT Machines"}
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Showing {filteredProducts.length} results
                            </p>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/smt-machines/${product.subcategorySlug || 'other'}/${product.brandSlug}/${product.id}`}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden p-6 flex items-center justify-center">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-gray-300 font-bold text-xl uppercase">{product.brand}</div>
                                        )}
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {product.condition}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-[#022c75] mb-1 group-hover:text-blue-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {product.subcategory} | {product.brand}
                                            </p>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                            {product.shortDescription}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#022c75] uppercase tracking-wider">
                                                View Details
                                            </span>
                                            <ArrowRight size={16} className="text-[#022c75] group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No machines found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
