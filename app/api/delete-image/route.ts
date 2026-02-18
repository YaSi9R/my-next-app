import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { file_name } = body;

        if (!file_name) {
            return NextResponse.json({ error: "file_name is required" }, { status: 400 });
        }

        const apiKey = process.env.IMAGE_UPLOAD_API_KEY;
        const uploadServer = process.env.IMAGE_UPLOAD_SERVER;

        if (!apiKey || !uploadServer) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const response = await fetch(`${uploadServer}`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "delete", file_name }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Delete failed upstream:", response.status, errorText);
            return NextResponse.json({ error: "Delete failed upstream" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
