import { prisma } from "@/lib/prisma";

export interface ProductFilters {
    categorySlug?: string;
    subcategorySlug?: string;
    brandSlug?: string;
    page?: number;
    limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
    const {
        categorySlug,
        subcategorySlug,
        brandSlug,
        page = 1,
        limit = 50,
    } = filters;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (categorySlug) {
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) where.categoryId = category.id;
        else return { products: [], total: 0, page, limit, totalPages: 0 };
    }

    if (subcategorySlug) {
        const subcategory = await prisma.subcategory.findFirst({ where: { slug: subcategorySlug } });
        if (subcategory) where.subcategoryId = subcategory.id;
        else return { products: [], total: 0, page, limit, totalPages: 0 };
    }

    if (brandSlug) {
        const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
        if (brand) where.brandId = brand.id;
        else return { products: [], total: 0, page, limit, totalPages: 0 };
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
                brand: { select: { name: true, slug: true } },
                category: { select: { name: true, slug: true } },
                subcategory: { select: { name: true, slug: true } },
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
            brand: { select: { name: true, slug: true } },
            category: { select: { name: true, slug: true } },
            subcategory: { select: { name: true, slug: true } },
        },
    });
}

export async function getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        include: {
            brand: { select: { name: true, slug: true } },
            category: { select: { name: true, slug: true } },
            subcategory: { select: { name: true, slug: true } },
        },
    });
}
