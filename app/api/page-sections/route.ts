import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get("pageSlug");
    const sectionId = searchParams.get("sectionId");

    if (!pageSlug || !sectionId) {
        return NextResponse.json(
            { error: "Missing pageSlug or sectionId" },
            { status: 400 }
        );
    }

    try {
        const section = await prisma.pageSection.findUnique({
            where: {
                pageSlug_sectionId: {
                    pageSlug,
                    sectionId,
                },
            },
        });

        if (!section) {
            return NextResponse.json({ content: null });
        }

        return NextResponse.json(section);
    } catch (error) {
        console.error("Error fetching page section:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { pageSlug, sectionId, content } = body;

        if (!pageSlug || !sectionId || !content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const section = await prisma.pageSection.upsert({
            where: {
                pageSlug_sectionId: {
                    pageSlug,
                    sectionId,
                },
            },
            update: {
                content,
            },
            create: {
                pageSlug,
                sectionId,
                content,
            },
        });

        return NextResponse.json(section);
    } catch (error) {
        console.error("Error updating page section:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
