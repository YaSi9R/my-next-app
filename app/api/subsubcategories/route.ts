import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
    try {
        const subsubcategories = await prisma.subSubcategory.findMany({
            include: {
                subcategory: {
                    include: {
                        category: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(subsubcategories);
    } catch (error) {
        console.error("Error fetching subsubcategories:", error);
        return NextResponse.json({ error: "Failed to fetch subsubcategories" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, subcategoryId } = await req.json();

        const slug = slugify(name, { lower: true, strict: true });

        const subsubcategory = await prisma.subSubcategory.create({
            data: {
                name,
                slug,
                subcategoryId
            }
        });

        return NextResponse.json(subsubcategory);
    } catch (error) {
        console.error("Error creating subsubcategory:", error);
        return NextResponse.json({ error: "Failed to create subsubcategory" }, { status: 500 });
    }
}
