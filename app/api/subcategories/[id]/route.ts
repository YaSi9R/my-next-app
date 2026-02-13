import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(req: Request, { params }: any) {
  const { name } = await req.json();

  const updated = await prisma.subcategory.update({
    where: { id: params.id },
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await prisma.subcategory.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Subcategory deleted" });
}