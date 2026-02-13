import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  const { name, categoryId } = await req.json();

  const subcategory = await prisma.subcategory.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      categoryId,
    },
  });

  return NextResponse.json(subcategory);
}

export async function GET() {
  const subcategories = await prisma.subcategory.findMany({
    include: {
      category: true,
    },
  });

  return NextResponse.json(subcategories);
}