import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, interest, message } = await req.json();

    if (!name || !email || !phone || !company || !interest || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const query = await prisma.customerQuery.create({
      data: {
        name,
        email,
        phone,
        company,
        interest,
        message,
      },
    });

    return NextResponse.json(
      { message: "Query submitted successfully", query },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add Query Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const queries = await prisma.customerQuery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(queries);
  } catch (error) {
    console.error("Get Query Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}