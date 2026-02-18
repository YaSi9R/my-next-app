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
        category: true,
        subcategory: true,
        subsubcategory: true,
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
      categoryId,
      subcategoryId,
      subsubcategoryId,
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
        categoryId,
        subcategoryId,
        subsubcategoryId,
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

    // 1. Fetch product to get images
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    });

    if (product && product.images && product.images.length > 0) {
      const apiKey = process.env.IMAGE_UPLOAD_API_KEY;
      const uploadServer = process.env.IMAGE_UPLOAD_SERVER;

      if (apiKey && uploadServer) {
        // 2. Delete images from external server
        await Promise.all(
          product.images.map(async (imageUrl) => {
            try {
              // Extract filename from URL (assumes last part of path)
              const fileName = imageUrl.split("/").pop();
              if (!fileName) return;

              await fetch(`${uploadServer}`, {
                method: "DELETE",
                headers: {
                  "x-api-key": apiKey,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ file_name: fileName }),
              });
            } catch (err) {
              // console.error(`Failed to delete image ${imageUrl}:`, err);
            }
          })
        );
      } else {
        // console.warn("Skipping image deletion: Missing server configuration");
      }
    }

    // 3. Delete product from DB
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