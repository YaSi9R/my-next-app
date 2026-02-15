import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name } = await req.json();

    const updated = await prisma.subcategory.update({
      where: { id },
      data: {
        name,
        slug: slugify(name, { lower: true, strict: true }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update Subcategory Error:", error);
    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.subcategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Subcategory deleted" });
  } catch (error) {
    console.error("Delete Subcategory Error:", error);
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}