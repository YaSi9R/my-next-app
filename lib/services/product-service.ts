import { prisma } from "@/lib/prisma";

export interface ProductFilters {
    categorySlug?: string;
    subcategorySlug?: string;
    subsubcategorySlug?: string;
    categoryId?: string;
    subcategoryId?: string;
    productSlug?: string;
    page?: number;
    limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
    const {
        categorySlug,
        subcategorySlug,
        subsubcategorySlug,
        categoryId,
        subcategoryId,
        productSlug,
        page = 1,
        limit = 50,
    } = filters;

    console.log('[ProductService] getProducts called with filters:', filters);

    const skip = (page - 1) * limit;
    const where: any = {};

    // If looking for a specific product by slug, filter by that
    if (productSlug) {
        where.slug = { equals: productSlug, mode: 'insensitive' };
    }

    if (categoryId) {
        where.categoryId = categoryId;
    }

    if (subcategoryId) {
        where.subcategoryId = subcategoryId;
    }

    // Category filtering (by slug)
    let internalCategoryId: string | null = categoryId || null;
    if (categorySlug && !categoryId) {
        const category = await prisma.category.findFirst({
            where: {
                slug: { equals: categorySlug, mode: 'insensitive' }
            }
        });

        if (category) {
            where.categoryId = category.id;
            internalCategoryId = category.id;
            console.log('[ProductService] Category found:', category.name, '(', category.id, ')');
        } else {
            console.log('[ProductService] Category not found for slug:', categorySlug);
            if (!productSlug) {
                return { products: [], total: 0, page, limit, totalPages: 0 };
            }
        }
    }

    // Subcategory filtering (by slug)
    let internalSubcategoryId: string | null = subcategoryId || null;
    if (subcategorySlug && !subcategoryId) {
        const subcategoryWhere: any = {
            slug: { equals: subcategorySlug, mode: 'insensitive' }
        };

        // Only filter by category if we have one
        if (internalCategoryId) {
            subcategoryWhere.categoryId = internalCategoryId;
        }

        const subcategory = await prisma.subcategory.findFirst({
            where: subcategoryWhere
        });

        if (subcategory) {
            internalSubcategoryId = subcategory.id;
            where.subcategoryId = subcategory.id;
            console.log('[ProductService] Subcategory found:', subcategory.name, '(', subcategory.id, ')');
        } else {
            console.log('[ProductService] Subcategory not found for slug:', subcategorySlug);
            if (!productSlug) {
                return { products: [], total: 0, page, limit, totalPages: 0 };
            }
        }
    }

    // Sub-subcategory filtering
    if (subsubcategorySlug) {
        const subsubcatWhere: any = {
            slug: { equals: subsubcategorySlug, mode: 'insensitive' }
        };

        // Only filter by subcategory if we have one
        if (internalSubcategoryId) {
            subsubcatWhere.subcategoryId = internalSubcategoryId;
        }

        const subsubcategory = await prisma.subSubcategory.findFirst({
            where: subsubcatWhere
        });

        if (subsubcategory) {
            where.subsubcategoryId = subsubcategory.id;
            console.log('[ProductService] Sub-subcategory found:', subsubcategory.name, '(', subsubcategory.id, ')');
        } else {
            console.log('[ProductService] Sub-subcategory not found for slug:', subsubcategorySlug);
            if (!productSlug) {
                return { products: [], total: 0, page, limit, totalPages: 0 };
            }
        }
    }

    console.log('[ProductService] Final query where clause:', JSON.stringify(where, null, 2));

    // Execute the query
    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: { select: { name: true, slug: true } },
                subcategory: { select: { name: true, slug: true } },
                subsubcategory: { select: { name: true, slug: true } },
            },
        }),
        prisma.product.count({ where }),
    ]);

    console.log('[ProductService] Query results: found', total, 'total products, returning', products.length);

    return {
        products,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

export async function getProductById(id: string) {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return null;
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: { select: { name: true, slug: true } },
            subcategory: { select: { name: true, slug: true } },
            subsubcategory: { select: { name: true, slug: true } },
        },
    });
}

export async function getProductBySlug(slug: string) {
    if (!slug) return null;
    return await prisma.product.findFirst({
        where: { slug: { equals: slug, mode: 'insensitive' } },
        include: {
            category: { select: { name: true, slug: true } },
            subcategory: { select: { name: true, slug: true } },
            subsubcategory: { select: { name: true, slug: true } },
        },
    });
}
