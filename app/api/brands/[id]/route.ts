import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE BRAND
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { name, slug } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Brand name is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.brand.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Update Brand Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to update brand" },
      { status: 500 }
    );
  }
}

// DELETE BRAND
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // ⚠ If brand linked to products, delete products first
    await prisma.product.deleteMany({
      where: { brandId: id },
    });

    await prisma.brand.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Brand deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Brand Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete brand" },
      { status: 500 }
    );
  }
}