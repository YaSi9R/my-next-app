"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import SidebarFilter from "./SidebarFilter";
import { Product } from "@/data/demoProducts";
import Pagination from "@/components/ui/Pagination";
import { useRouter, usePathname } from "next/navigation";

interface ProductBrowserProps {
    products: Product[];
    rootCategorySlug: "smt-machines" | "smt-parts" | "board-handling" | "consumables";
    initialCategory?: string;
    initialBrand?: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductBrowser({
    products,
    rootCategorySlug,
    initialCategory,
    initialBrand,
}: ProductBrowserProps) {
    const router = useRouter();

    // State
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialCategory || null
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialBrand ? [initialBrand] : []
    );
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Derive Categories and Brands from products based on rootCategorySlug
    const categories = useMemo(() => {
        const map = new Map();
        products.forEach((p) => {
            // Logic: Only show categories that belong to the current Root Category
            if (p.categorySlug === rootCategorySlug && p.subcategory && p.subcategorySlug) {
                if (!map.has(p.subcategorySlug)) {
                    map.set(p.subcategorySlug, p.subcategory);
                }
            }
        });
        return Array.from(map.entries()).map(([slug, name]) => ({ name, slug }));
    }, [products, rootCategorySlug]);

    // Derive Types based on selected category
    const types = useMemo(() => {
        if (!selectedCategory) return [];
        const map = new Map();
        products.forEach((p) => {
            if (p.categorySlug === rootCategorySlug && p.subcategorySlug === selectedCategory && p.type && p.typeSlug) {
                if (!map.has(p.typeSlug)) {
                    map.set(p.typeSlug, p.type);
                }
            }
        });
        return Array.from(map.entries()).map(([slug, name]) => ({ name, slug }));
    }, [products, rootCategorySlug, selectedCategory]);

    // Derive Brands - Only show brands relevant to the current root category
    const brands = useMemo(() => {
        const relevantProducts = products.filter(p => p.categorySlug === rootCategorySlug);
        return Array.from(new Set(relevantProducts.map((p) => p.brand))).sort();
    }, [products, rootCategorySlug]);

    const handleCategoryChange = (slug: string | null) => {
        setCurrentPage(1);
        setSelectedTypes([]); // Reset types when category changes
        const parts: string[] = [rootCategorySlug];
        if (slug) parts.push(slug);
        router.push(`/${parts.join('/')}`);
    };

    const handleTypeChange = (typeSlug: string) => {
        setCurrentPage(1);
        setSelectedTypes(prev => {
            if (prev.includes(typeSlug)) {
                return prev.filter(t => t !== typeSlug);
            } else {
                return [...prev, typeSlug];
            }
        });
    };

    const handleBrandChange = (brand: string) => {
        setCurrentPage(1);
        let newBrands: string[];
        if (selectedBrands.includes(brand)) {
            newBrands = selectedBrands.filter(b => b !== brand);
        } else {
            newBrands = [...selectedBrands, brand];
        }
        setSelectedBrands(newBrands);
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (product.categorySlug !== rootCategorySlug) return false;
            if (selectedCategory && product.subcategorySlug !== selectedCategory) {
                return false;
            }
            if (selectedTypes.length > 0 && (!product.typeSlug || !selectedTypes.includes(product.typeSlug))) {
                return false;
            }
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
                return false;
            }
            return true;
        });
    }, [products, rootCategorySlug, selectedCategory, selectedTypes, selectedBrands]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);


    // Sync state if props change
    useEffect(() => {
        setSelectedCategory(initialCategory || null);
        setCurrentPage(1);
    }, [initialCategory]);

    useEffect(() => {
        if (initialBrand) {
            setSelectedBrands([initialBrand]);
        }
    }, [initialBrand]);

    const getRootTitle = () => {
        switch (rootCategorySlug) {
            case 'smt-machines': return 'SMT Machines';
            case 'smt-parts': return 'SMT Spare Parts';
            case 'board-handling': return 'Board Handling Systems';
            case 'consumables': return 'Consumables & Cleaning';
            default: return 'Products';
        }
    }


    return (
        <div className="container mx-auto px-4 max-w-7xl py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/4 flex-shrink-0">
                    <SidebarFilter
                        categories={categories}
                        types={types}
                        brands={brands}
                        selectedCategory={selectedCategory}
                        selectedTypes={selectedTypes}
                        selectedBrands={selectedBrands}
                        onCategoryChange={handleCategoryChange}
                        onTypeChange={handleTypeChange}
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
                                    : `All ${getRootTitle()}`}
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Showing {filteredProducts.length} results
                            </p>
                        </div>
                    </div>

                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/${rootCategorySlug}/${product.subcategorySlug || 'other'}/${product.brandSlug}/${product.id}`}
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

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
                            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
