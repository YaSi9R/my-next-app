import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }

    // Prepare content for external API
    const externalFormData = new FormData();
    externalFormData.append("file", file);
    externalFormData.append("action", "upload");

    const apiKey = process.env.IMAGE_UPLOAD_API_KEY;
    const uploadServer = process.env.IMAGE_UPLOAD_SERVER;

    if (!apiKey || !uploadServer) {
      console.error("Missing configuration: IMAGE_UPLOAD_API_KEY or IMAGE_UPLOAD_SERVER");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch(`${uploadServer}`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: externalFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed upstream:", response.status, errorText);
      return NextResponse.json({ error: "Upload failed upstream" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}