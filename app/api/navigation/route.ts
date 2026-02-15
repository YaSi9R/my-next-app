import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [categories, subcategories, brands, subsubcategories] = await Promise.all([
            prisma.category.findMany({
                orderBy: { name: 'asc' }
            }),
            prisma.subcategory.findMany({
                include: {
                    category: true,
                    subsubcategories: true // Include third-level items
                },
                orderBy: { name: 'asc' }
            }),
            prisma.brand.findMany({
                orderBy: { name: 'asc' }
            }),
            prisma.subSubcategory.findMany({
                include: { subcategory: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return NextResponse.json({
            categories,
            subcategories,
            brands,
            subsubcategories
        }, {
            headers: {
                'Cache-Control': 'no-store, max-age=0'
            }
        });
    } catch (error) {
        console.error("Navigation API error:", error);
        return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 });
    }
}
