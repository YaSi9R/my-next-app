import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { getProducts } from "@/lib/services/product-service";

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
    const limit = Number(searchParams.get("limit")) || 50;
    const categorySlug = searchParams.get("categorySlug") || undefined;
    const subcategorySlug = searchParams.get("subcategorySlug") || undefined;
    const brandSlug = searchParams.get("brandSlug") || undefined;

    const data = await getProducts({
      categorySlug,
      subcategorySlug,
      brandSlug,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Get Products Route Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        path: req.url
      },
      { status: 500 }
    );
  }
}
