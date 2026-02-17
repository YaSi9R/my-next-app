import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [categories, subcategories] = await Promise.all([
            prisma.category.findMany(),
            prisma.subcategory.findMany({
                include: {
                    category: true,
                    subsubcategories: true
                }
            })
        ]);

        return NextResponse.json({
            categories,
            subcategories
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
