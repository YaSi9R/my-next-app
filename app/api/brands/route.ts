import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  const { name } = await req.json();

  const slug = slugify(name, { lower: true });

  const brand = await prisma.brand.create({
    data: { name, slug },
  });

  return NextResponse.json(brand);
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error("Get Brands Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
