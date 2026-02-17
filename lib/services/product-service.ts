import { prisma } from "@/lib/prisma";

export interface ProductFilters {
    categorySlug?: string;
    subcategorySlug?: string;
    subsubcategorySlug?: string;
    page?: number;
    limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
    const {
        categorySlug,
        subcategorySlug,
        subsubcategorySlug,
        page = 1,
        limit = 50,
    } = filters;

    const skip = (page - 1) * limit;
    const where: any = {};

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
        } else {
            return { products: [], total: 0, page, limit, totalPages: 0 };
        }
    }

    if (subcategorySlug) {
        const subcategoryWhere: any = {
            slug: { equals: subcategorySlug, mode: 'insensitive' }
        };
        // If category is specified, ensure subcategory belongs to it
        if (categoryId) {
            subcategoryWhere.categoryId = categoryId;
        }
        const subcategory = await prisma.subcategory.findFirst({
            where: subcategoryWhere
        });
        if (subcategory) {
            where.subcategoryId = subcategory.id;
        } else {
            return { products: [], total: 0, page, limit, totalPages: 0 };
        }
    }

    if (subsubcategorySlug) {
        const subsubcatWhere: any = {
            slug: { equals: subsubcategorySlug, mode: 'insensitive' }
        };
        // If subcategory is specified, ensure subsubcategory belongs to it
        if (where.subcategoryId) {
            subsubcatWhere.subcategoryId = where.subcategoryId;
        }
        const subsubcategory = await prisma.subSubcategory.findFirst({
            where: subsubcatWhere
        });
        if (subsubcategory) {
            where.subsubcategoryId = subsubcategory.id;
        } else {
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
    return await prisma.product.findUnique({
        where: { slug },
        include: {
            category: { select: { name: true, slug: true } },
            subcategory: { select: { name: true, slug: true } },
            subsubcategory: { select: { name: true, slug: true } },
        },
    });
}
