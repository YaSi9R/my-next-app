import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("Deleting query:", id);

    await prisma.customerQuery.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Query deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Query Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete query" },
      { status: 500 }
    );
  }
}