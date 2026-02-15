import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

/* ================= GET SINGLE PRODUCT ================= */

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        subcategory: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ================= UPDATE PRODUCT ================= */

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const {
      name,
      condition,
      images,
      shortDescription,
      longDescription,
      availability,
      brandId,
      categoryId,
      subcategoryId,
      specifications,
      features,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    // Regenerate slug
    const baseSlug = slugify(name, { lower: true, strict: true });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: baseSlug,
        condition,
        images,
        shortDescription,
        longDescription,
        availability,
        brandId,
        categoryId,
        subcategoryId,
        specifications,
        features,
      },
    });

    // Revalidate product pages and listings
    revalidatePath("/");
    revalidatePath("/smt-machines");
    revalidatePath("/smt-parts");
    revalidatePath("/board-handling");
    revalidatePath("/consumables");
    // Also revalidate this specific product's page if it exists
    revalidatePath(`/products/${id}`);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* ================= DELETE PRODUCT ================= */

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.product.delete({
      where: { id },
    });

    // Revalidate product listing pages after deletion
    revalidatePath("/");
    revalidatePath("/smt-machines");
    revalidatePath("/smt-parts");
    revalidatePath("/board-handling");
    revalidatePath("/consumables");

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}