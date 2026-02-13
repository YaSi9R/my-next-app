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
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(brands);
}