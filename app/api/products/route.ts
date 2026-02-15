import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
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

    if (!name || !brandId || !categoryId || !subcategoryId) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
    });

    const product = await prisma.product.create({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        brand: true,
        category: true,
        subcategory: true,
      },
    });

    return NextResponse.json({
      products
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}