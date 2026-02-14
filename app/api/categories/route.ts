import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  const { name } = await req.json();
const slug = slugify(name, { lower: true });
  const category = await prisma.category.create({
    data: {
      name,
      slug}
  });

  return NextResponse.json(category);
}

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });

  return NextResponse.json(categories);
}