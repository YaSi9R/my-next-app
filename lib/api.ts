import { demoProducts, smtParts, smtLinePackages, Product } from '@/data/demoProducts';

// Simulate API delay for realism (optional, set to 0 for instant)
const SIMULATED_DELAY = 100;

// API Configuration (Placeholder)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getAllProducts(): Promise<Product[]> {
    // Database Integration Placeholder:
    // try {
    //     const res = await fetch(`${API_BASE_URL}/products`);
    //     if (!res.ok) throw new Error('Failed to fetch products');
    //     return await res.json();
    // } catch (error) {
    //     console.error('Error fetching products:', error);
    //     return [];
    // }

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/products?category=${category}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => p.category === category);
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/products?categorySlug=${categorySlug}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => p.categorySlug === categorySlug);
}

export async function getProductsBySubcategory(subcategory: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => p.subcategory === subcategory);
}

export async function getProductsBySubcategorySlug(subcategorySlug: string): Promise<Product[]> {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/products?subcategorySlug=${subcategorySlug}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => p.subcategorySlug === subcategorySlug);
}

export async function getProductsByBrandSlug(brandSlug: string): Promise<Product[]> {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/products?brandSlug=${brandSlug}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => p.brandSlug === brandSlug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/products/${id}`);
    // if (!res.ok) return undefined;
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const product = demoProducts.find(p => p.id === id);
    if (product) return product;

    // Also check parts
    const part = smtParts.find(p => p.id === id);
    if (part) return part as unknown as Product;

    return undefined;
}

// Helper to get by multiple criteria (simulate database query)
export async function getProductsByFilters(filters: { categorySlug?: string; subcategorySlug?: string; brandSlug?: string }): Promise<Product[]> {
    // Database Integration Placeholder:
    // const queryParams = new URLSearchParams(filters as any).toString();
    // const res = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return demoProducts.filter(p => {
        if (filters.categorySlug && p.categorySlug !== filters.categorySlug) return false;
        if (filters.subcategorySlug && p.subcategorySlug !== filters.subcategorySlug) return false;
        if (filters.brandSlug && p.brandSlug !== filters.brandSlug) return false;
        return true;
    });
}


// Parts
export async function getAllParts() {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/parts`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return smtParts;
}

export async function getPartsBySubcategorySlug(subcategorySlug: string) {
    // Database Integration Placeholder:
    // const res = await fetch(`${API_BASE_URL}/parts?subcategorySlug=${subcategorySlug}`);
    // return await res.json();

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return smtParts.filter(p => p.subcategorySlug === subcategorySlug);
}

// Lines
export async function getAllLinePackages() {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return smtLinePackages;
}
