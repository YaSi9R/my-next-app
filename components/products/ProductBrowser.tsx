"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import SidebarFilter from "./SidebarFilter";
import { Product } from "@/lib/api";
import Pagination from "@/components/ui/Pagination";
import { useRouter, usePathname } from "next/navigation";

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
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    console.log('[ProductBrowser] Initialized with:', {
        rootCategorySlug,
        initialSubcategory,
        initialSubsubcategory,
        productsCount: initialData.products.length
    });

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

                    console.log('[ProductBrowser] Navigation loaded:', {
                        subcategories: subcats.length,
                        subsubcategories: subsubs.length
                    });
                }
            } catch (err) {
                console.error("[ProductBrowser] Failed to fetch filters:", err);
            }
        };
        fetchNav();
    }, [rootCategorySlug]);

    // Fetch products whenever filters or page changes (only for local filter changes)
    const fetchProducts = useCallback(async () => {
        console.log('[ProductBrowser] Fetching products with:', {
            rootCategorySlug,
            selectedSubcategory,
            selectedSubsubcategories,
            currentPage
        });

        setLoading(true);
        try {
            const params = new URLSearchParams({
                categorySlug: rootCategorySlug,
                page: String(currentPage),
                limit: String(ITEMS_PER_PAGE),
            });
            if (selectedSubcategory) params.append('subcategorySlug', selectedSubcategory);

            if (selectedSubsubcategories.length > 0) {
                params.append('subsubcategorySlug', selectedSubsubcategories[0]);
            }

            const res = await fetch(`/api/products?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();

            console.log('[ProductBrowser] Fetched', data.products.length, 'products');

            setProducts(data.products);
            setTotal(data.total);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("[ProductBrowser] Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, [rootCategorySlug, selectedSubcategory, selectedSubsubcategories, currentPage]);

    // Sync state when props change (back/forward navigation or page reload)
    // This should be the ONLY place where we update from initialData
    useEffect(() => {
        console.log('[ProductBrowser] Props changed, syncing state');

        // Reset all state to match the new props
        setProducts(initialData.products);
        setTotal(initialData.total);
        setTotalPages(initialData.totalPages);
        setSelectedSubcategory(initialSubcategory || null);
        setSelectedSubsubcategories(initialSubsubcategory ? [initialSubsubcategory] : []);
        setCurrentPage(1);
        // Reset first render flag
        isFirstRender.current = true;
    }, [initialData, initialSubcategory, initialSubsubcategory]);

    // Fetch when user changes filters locally (not on initial render)
    useEffect(() => {
        if (isFirstRender.current) {
            console.log('[ProductBrowser] First render, skipping fetch');
            isFirstRender.current = false;
            return;
        }
        console.log('[ProductBrowser] Filters changed, fetching products');
        fetchProducts();
    }, [selectedSubcategory, selectedSubsubcategories, currentPage, fetchProducts]);

    const handleSubcategoryChange = (slug: string | null) => {
        console.log('[ProductBrowser] Subcategory changed to:', slug);
        setSelectedSubcategory(slug);
        setSelectedSubsubcategories([]);
        setCurrentPage(1);

        // Build URL
        const parts: string[] = [rootCategorySlug];
        if (slug) {
            parts.push(slug);
        }
        router.push(`/${parts.join('/')}`, { scroll: false });
    };

    const handleSubsubcategoryChange = (slugs: string[]) => {
        console.log('[ProductBrowser] Sub-subcategory changed to:', slugs);
        setSelectedSubsubcategories(slugs);
        setCurrentPage(1);

        // Build URL
        const parts: string[] = [rootCategorySlug];
        if (selectedSubcategory) {
            parts.push(selectedSubcategory);
        }
        if (slugs.length > 0) {
            parts.push(slugs[0]);
        }
        router.push(`/${parts.join('/')}`, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        console.log('[ProductBrowser] Page changed to:', page);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Filter sub-subcategories based on selected subcategory
    const filteredSubsubcategories = useMemo(() => {
        if (!selectedSubcategory) return [];

        const selectedSubcatObj = availableSubcategories.find(s => s.slug === selectedSubcategory);
        if (!selectedSubcatObj) return [];

        return availableSubsubcategories.filter(ss => ss.subcategoryId === selectedSubcatObj.id);
    }, [selectedSubcategory, availableSubcategories, availableSubsubcategories]);

    return (
        <div className="container mx-auto px-4 max-w-7xl py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter */}
                <aside className="lg:w-64 flex-shrink-0">
                    <SidebarFilter
                        categories={availableSubcategories}
                        types={filteredSubsubcategories}
                        selectedCategory={selectedSubcategory}
                        selectedTypes={selectedSubsubcategories}
                        onCategoryChange={handleSubcategoryChange}
                        onTypeChange={handleSubsubcategoryChange}
                    />
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-[#022c75]" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-600">No products found</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <p className="text-[#022c75] font-semibold">
                                    Showing <span className="font-bold text-[#022c75]">{products.length}</span> results
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/${rootCategorySlug}/${product.subcategory?.slug || 'unknown'}/${product.subsubcategory?.slug || product.slug}/${product.slug}`}
                                        className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border "
                                    >
                                        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                                            {product.images && product.images[0] ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                            {product.condition && (
                                                <div className="absolute top-3 right-3">
                                                    <span className="bg-[#022c75] text-[#e6e6e6] text-xs font-bold px-3 py-1 rounded-full">
                                                        {product.condition}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5">
                                            {product.subsubcategory && (
                                                <p className="text-xs font-semibold text-[#022c75] uppercase tracking-wider mb-2">
                                                    {product.subsubcategory.name}
                                                </p>
                                            )}
                                            <h3 className="text-lg font-bold text-[#022c75] mb-2 ">
                                                {product.name}
                                            </h3>
                                            {product.shortDescription && (
                                                <p className="text-sm text-[#022c75] mb-4">
                                                    {product.shortDescription}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                               
                                                <span className="inline-flex items-center text-[#022c75] font-semibold text-sm group-hover:gap-2 transition-all">
                                                    View Details
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-12">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
