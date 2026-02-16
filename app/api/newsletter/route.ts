import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        let subscription;
        try {
            subscription = await (prisma as any).newsletter.create({
                data: { email },
            });
        } catch (error: any) {
            // Fallback for when the Prisma client isn't regenerated yet
            console.log("Prisma model 'newsletter' not found, trying raw fallback...");
            subscription = await (prisma as any).$runCommandRaw({
                insert: "Newsletter",
                documents: [{ email, createdAt: { "$date": new Date().toISOString() } }],
            });
        }

        return NextResponse.json(subscription, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002' || error.message?.includes('E11000')) {
            return NextResponse.json({ message: "Email already subscribed" }, { status: 200 });
        }
        console.error("Newsletter Subscription Error:", error);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}

export async function GET() {
    try {
        let subscriptions;
        try {
            subscriptions = await (prisma as any).newsletter.findMany({
                orderBy: { createdAt: "desc" },
            });
        } catch (error) {
            console.log("Prisma model 'newsletter' not found, trying raw fallback for GET...");
            const result = await (prisma as any).$runCommandRaw({
                find: "Newsletter",
                sort: { createdAt: -1 }
            });
            subscriptions = result.cursor?.firstBatch || [];
        }
        return NextResponse.json(subscriptions);
    } catch (error) {
        console.error("Fetch Newsletter Error:", error);
        return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
    }
}
