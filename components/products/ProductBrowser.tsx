"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import SidebarFilter from "./SidebarFilter";
import { Product } from "@/lib/api";
import Pagination from "@/components/ui/Pagination";
import { useRouter } from "next/navigation";

interface ProductBrowserProps {
    initialData: {
        products: Product[];
        total: number;
        totalPages: number;
    };
    rootCategorySlug: string;
    initialSubcategory?: string;
    initialSubsubcategory?: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductBrowser({
    initialData,
    rootCategorySlug,
    initialSubcategory,
    initialSubsubcategory,
}: ProductBrowserProps) {
    const router = useRouter();

    // State
    const [products, setProducts] = useState<Product[]>(initialData.products);
    const [total, setTotal] = useState(initialData.total);
    const [totalPages, setTotalPages] = useState(initialData.totalPages);
    const [loading, setLoading] = useState(false);

    // Filter structure state (fetched from API)
    const [availableSubcategories, setAvailableSubcategories] = useState<{ name: string; slug: string; id: string }[]>([]);
    const [availableSubsubcategories, setAvailableSubsubcategories] = useState<{ name: string; slug: string; subcategoryId: string }[]>([]);

    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
        initialSubcategory || null
    );
    const [selectedSubsubcategories, setSelectedSubsubcategories] = useState<string[]>(
        initialSubsubcategory ? [initialSubsubcategory] : []
    );
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch navigation structure once
    useEffect(() => {
        const fetchNav = async () => {
            try {
                const res = await fetch('/api/navigation');
                if (!res.ok) return;
                const data = await res.json();

                // Find our root category
                const rootCat = data.categories.find((c: any) => c.slug === rootCategorySlug);
                if (rootCat) {
                    const subcats = data.subcategories.filter((s: any) => s.categoryId === rootCat.id);
                    setAvailableSubcategories(subcats);

                    const subsubs: any[] = [];
                    subcats.forEach((s: any) => {
                        if (s.subsubcategories) {
                            subsubs.push(...s.subsubcategories);
                        }
                    });
                    setAvailableSubsubcategories(subsubs);
                }
            } catch (err) {
                console.error("Failed to fetch filters:", err);
            }
        };
        fetchNav();
    }, [rootCategorySlug]);

    // Fetch products whenever filters or page changes
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                categorySlug: rootCategorySlug,
                page: String(currentPage),
                limit: String(ITEMS_PER_PAGE),
            });
            if (selectedSubcategory) params.append('subcategorySlug', selectedSubcategory);

            // Note: our API supports one subsubcategory filter at a time for now based on implementation_plan
            // If multiple are selected, we might need to adjust, but based on ProductBrowser's logic 
            // it seems to transition to a single subsubcategory URL.
            if (selectedSubsubcategories.length > 0) {
                params.append('subsubcategorySlug', selectedSubsubcategories[0]);
            }

            const res = await fetch(`/api/products?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setProducts(data.products);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, [rootCategorySlug, selectedSubcategory, selectedSubsubcategories, currentPage]);

    // Update state when initialData changes (navigating via browser back/forward)
    useEffect(() => {
        setProducts(initialData.products);
        setTotal(initialData.total);
        setTotalPages(initialData.totalPages);
        setSelectedSubcategory(initialSubcategory || null);
        setSelectedSubsubcategories(initialSubsubcategory ? [initialSubsubcategory] : []);
        setCurrentPage(1);
    }, [initialData, initialSubcategory, initialSubsubcategory]);

    // Only fetch if NOT the initial render (initialData handles that)
    // Actually, it's safer to always fetch when filters change to ensure sync
    // But let's rely on router.push to trigger the page component which passes new initialData

    const handleSubcategoryChange = (slug: string | null) => {
        setSelectedSubcategory(slug);
        setSelectedSubsubcategories([]);
        setCurrentPage(1);

        const parts: string[] = [rootCategorySlug];
        if (slug) parts.push(slug);
        router.push(`/${parts.join('/')}`);
    };

    const handleSubsubcategoryChange = (slug: string) => {
        setCurrentPage(1);
        const isRemoving = selectedSubsubcategories.includes(slug);

        const parts: string[] = [rootCategorySlug];
        if (selectedSubcategory) parts.push(selectedSubcategory);

        if (!isRemoving) {
            parts.push(slug);
            setSelectedSubsubcategories([slug]);
        } else {
            setSelectedSubsubcategories([]);
        }

        router.push(`/${parts.join('/')}`);
    };

    const getRootTitle = () => {
        switch (rootCategorySlug) {
            case 'smt-machines': return 'SMT Machines';
            case 'smt-parts': return 'SMT Spare Parts';
            case 'board-handling': return 'Board Handling Systems';
            case 'consumables': return 'Consumables & Cleaning';
            default: return 'Products';
        }
    }

    // Determine types (sub-subcategories) for the selected subcategory
    const currentTypes = useMemo(() => {
        if (!selectedSubcategory) return [];
        const subcat = availableSubcategories.find(s => s.slug === selectedSubcategory);
        if (!subcat) return [];
        return availableSubsubcategories.filter(ss => ss.subcategoryId === subcat.id);
    }, [selectedSubcategory, availableSubcategories, availableSubsubcategories]);

    return (
        <div className="container mx-auto px-4 max-w-7xl py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/4 flex-shrink-0">
                    <SidebarFilter
                        categories={availableSubcategories}
                        types={currentTypes}
                        selectedCategory={selectedSubcategory}
                        selectedTypes={selectedSubsubcategories}
                        onCategoryChange={handleSubcategoryChange}
                        onTypeChange={handleSubsubcategoryChange}
                    />
                </div>

                {/* Product Grid Area */}
                <div className="lg:w-3/4">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#022c75]">
                                {selectedSubcategory
                                    ? availableSubcategories.find(c => c.slug === selectedSubcategory)?.name
                                    : `All ${getRootTitle()}`}
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Showing {total} results
                                {loading && <Loader2 className="inline ml-2 animate-spin h-4 w-4" />}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/${rootCategorySlug}/${product.subcategory?.slug || 'other'}${product.subsubcategory?.slug ? `/${product.subsubcategory.slug}` : ''}/${product.slug}`}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
                                    >
                                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden p-3 flex items-center justify-center">
                                            {product.images?.[0] ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="text-gray-300 font-bold text-xl uppercase">{product.subcategory?.name || 'N/A'}</div>
                                            )}
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {product.condition}
                                            </div>
                                        </div>

                                        <div className="p-3 flex flex-col flex-1">
                                            <div className="mb-3">
                                                <h3 className="text-lg font-bold text-[#022c75] mb-1 group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-medium">
                                                    {product.subcategory?.name} {product.subsubcategory?.name ? `| ${product.subsubcategory.name}` : ''}
                                                </p>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
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

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
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
