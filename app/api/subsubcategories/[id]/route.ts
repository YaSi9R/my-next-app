import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const { name, subcategoryId } = await req.json();
        const slug = slugify(name, { lower: true, strict: true });

        const subsubcategory = await prisma.subSubcategory.update({
            where: { id: params.id },
            data: {
                name,
                slug,
                ...(subcategoryId && { subcategoryId })
            }
        });

        return NextResponse.json(subsubcategory);
    } catch (error) {
        console.error("Error updating subsubcategory:", error);
        return NextResponse.json({ error: "Failed to update subsubcategory" }, { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        await prisma.subSubcategory.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting subsubcategory:", error);
        return NextResponse.json({ error: "Failed to delete subsubcategory" }, { status: 500 });
    }
}
