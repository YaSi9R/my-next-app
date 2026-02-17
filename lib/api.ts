// API Configuration
const API_BASE_URL = '';

export type Product = {
    id: string;
    name: string;
    slug: string;
    condition: string;
    availability: string;
    shortDescription: string;
    longDescription: string;
    images: string[];
    specifications: { label: string; value: string }[];
    features: string[];
    category: { name: string; slug: string };
    subcategory: { name: string; slug: string };
    subsubcategory?: { name: string; slug: string };
    createdAt: string;
    updatedAt: string;
};

export async function getAllProducts(page = 1, limit = 50): Promise<{ products: Product[], total: number, totalPages: number }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return { products: [], total: 0, totalPages: 0 };
    }
}

export async function getProductsByCategorySlug(categorySlug: string, page = 1, limit = 50): Promise<{ products: Product[], total: number, totalPages: number }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/products?categorySlug=${categorySlug}&page=${page}&limit=${limit}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products by category');
        return await res.json();
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return { products: [], total: 0, totalPages: 0 };
    }
}

export async function getProductsBySubcategorySlug(subcategorySlug: string, page = 1, limit = 10): Promise<{ products: Product[], total: number, totalPages: number }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/products?subcategorySlug=${subcategorySlug}&page=${page}&limit=${limit}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products by subcategory');
        return await res.json();
    } catch (error) {
        console.error('Error fetching products by subcategory:', error);
        return { products: [], total: 0, totalPages: 0 };
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        console.error('Error fetching product by id:', error);
        return undefined;
    }
}

export async function getProductsByFilters(filters: { categorySlug?: string; subcategorySlug?: string; subsubcategorySlug?: string; page?: number; limit?: number }): Promise<{ products: Product[], total: number, totalPages: number }> {
    try {
        const queryParams = new URLSearchParams();
        if (filters.categorySlug) queryParams.append('categorySlug', filters.categorySlug);
        if (filters.subcategorySlug) queryParams.append('subcategorySlug', filters.subcategorySlug);
        if (filters.subsubcategorySlug) queryParams.append('subsubcategorySlug', filters.subsubcategorySlug);
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit) queryParams.append('limit', filters.limit.toString());

        const res = await fetch(`${API_BASE_URL}/api/products?${queryParams.toString()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products by filters');
        return await res.json();
    } catch (error) {
        console.error('Error fetching products by filters:', error);
        return { products: [], total: 0, totalPages: 0 };
    }
}

// Keeping these for now, assuming they might still use demo data or need future migration
export async function getAllParts() {
    return []; // Return empty for now as parts should be migrated to products model
}

import { demoProducts, smtLinePackages } from "@/data/demoProducts";

export async function getPartsBySubcategorySlug(subcategorySlug: string) {
    const { products } = await getAllProducts();
    return products.filter(p => p.category?.slug === 'smt-parts' && p.subcategory?.slug === subcategorySlug);
}

export async function getAllLinePackages() {
    return smtLinePackages;
}
