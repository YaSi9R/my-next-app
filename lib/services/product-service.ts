import { prisma } from "@/lib/prisma";

export interface ProductFilters {
    categorySlug?: string;
    subcategorySlug?: string;
    subsubcategorySlug?: string;
    productSlug?: string;
    page?: number;
    limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
    const {
        categorySlug,
        subcategorySlug,
        subsubcategorySlug,
        productSlug,
        page = 1,
        limit = 50,
    } = filters;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (productSlug) {
        where.slug = { equals: productSlug, mode: 'insensitive' };
    }

    let categoryId: string | null = null;
    if (categorySlug) {
        const category = await prisma.category.findFirst({
            where: {
                slug: { equals: categorySlug, mode: 'insensitive' }
            }
        });
        if (category) {
            categoryId = category.id;
            where.categoryId = category.id;
        } else if (!productSlug) {
            // Only return empty if we aren't looking for a specific product slug
            return { products: [], total: 0, page, limit, totalPages: 0 };
        }
    }

    if (subcategorySlug) {
        const subcategoryWhere: any = {
            slug: { equals: subcategorySlug, mode: 'insensitive' }
        };
        if (categoryId) {
            subcategoryWhere.categoryId = categoryId;
        }
        const subcategory = await prisma.subcategory.findFirst({
            where: subcategoryWhere
        });
        if (subcategory) {
            where.subcategoryId = subcategory.id;
        } else if (!productSlug) {
            return { products: [], total: 0, page, limit, totalPages: 0 };
        }
    }

    if (subsubcategorySlug) {
        const subsubcatWhere: any = {
            slug: { equals: subsubcategorySlug, mode: 'insensitive' }
        };
        if (where.subcategoryId) {
            subsubcatWhere.subcategoryId = where.subcategoryId;
        }
        const subsubcategory = await prisma.subSubcategory.findFirst({
            where: subsubcatWhere
        });
        if (subsubcategory) {
            where.subsubcategoryId = subsubcategory.id;
        } else if (!productSlug) {
            return { products: [], total: 0, page, limit, totalPages: 0 };
        }
    }

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
