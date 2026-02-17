"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
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

    // State
    const [products, setProducts] = useState<Product[]>(initialData.products);
    const [total, setTotal] = useState(initialData.total);
    const [totalPages, setTotalPages] = useState(initialData.totalPages);

    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
        initialSubcategory || null
    );
    const [selectedSubsubcategories, setSelectedSubsubcategories] = useState<string[]>(
        initialSubsubcategory ? [initialSubsubcategory] : []
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Sync state with props when navigation occurs
    useEffect(() => {
        setProducts(initialData.products);
        setTotal(initialData.total);
        setTotalPages(initialData.totalPages);
    }, [initialData]);

    useEffect(() => {
        setSelectedSubcategory(initialSubcategory || null);
        setSelectedSubsubcategories(initialSubsubcategory ? [initialSubsubcategory] : []);
    }, [initialSubcategory, initialSubsubcategory]);

    // Derive Categories (Subcategories) from products
    const subcategories = useMemo(() => {
        const map = new Map();
        products.forEach((p) => {
            if (p.subcategory?.name && p.subcategory?.slug) {
                if (!map.has(p.subcategory.slug)) {
                    map.set(p.subcategory.slug, p.subcategory.name);
                }
            }
        });
        return Array.from(map.entries()).map(([slug, name]) => ({ name, slug }));
    }, [products]);

    // Derive Subsubcategories from products for the selected subcategory
    const subsubcategories = useMemo(() => {
        const relevantSubsubs = new Map();
        products.forEach(p => {
            if (p.subcategory?.slug === selectedSubcategory && p.subsubcategory?.name && p.subsubcategory?.slug) {
                relevantSubsubs.set(p.subsubcategory.slug, p.subsubcategory.name);
            }
        });
        return Array.from(relevantSubsubs.entries()).map(([slug, name]) => ({ name, slug }));
    }, [products, selectedSubcategory]);

    const handleSubcategoryChange = (slug: string | null) => {
        setCurrentPage(1);
        setSelectedSubsubcategories([]);
        const parts: string[] = [rootCategorySlug];
        if (slug) parts.push(slug);
        router.push(`/${parts.join('/')}`);
    };

    const handleSubsubcategoryChange = (slug: string) => {
        setCurrentPage(1);

        const isRemoving = selectedSubsubcategories.includes(slug);

        // Update URL to reflect the new selection
        const parts: string[] = [rootCategorySlug];
        if (selectedSubcategory) parts.push(selectedSubcategory);

        if (!isRemoving) {
            // If checking a new one, add it to URL
            parts.push(slug);
        }
        // If removing, we don't add it to parts, so URL becomes the parent category

        router.push(`/${parts.join('/')}`);
    };

    // Filter local products
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (selectedSubcategory && product.subcategory?.slug !== selectedSubcategory) return false;
            if (selectedSubsubcategories.length > 0 && !selectedSubsubcategories.includes(product.subsubcategory?.slug || '')) return false;
            return true;
        });
    }, [products, selectedSubcategory, selectedSubsubcategories]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

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
                        categories={subcategories}
                        types={subsubcategories}
                        brands={[]} // Brands are now removed
                        selectedCategory={selectedSubcategory}
                        selectedTypes={selectedSubsubcategories}
                        selectedBrands={[]}
                        onCategoryChange={handleSubcategoryChange}
                        onTypeChange={handleSubsubcategoryChange}
                        onBrandChange={() => { }}
                    />
                </div>

                {/* Product Grid */}
                <div className="lg:w-3/4">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#022c75]">
                                {selectedSubcategory
                                    ? subcategories.find(c => c.slug === selectedSubcategory)?.name
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
                                        href={`/${rootCategorySlug}/${product.subcategory?.slug || 'other'}${product.subsubcategory?.slug ? `/${product.subsubcategory.slug}` : ''}/${product.id}`}
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

                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
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
