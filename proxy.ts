import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  // ===============================
  // PUBLIC ROUTES
  // ===============================

  // 1️⃣ Public POST for queries
  if (pathname.startsWith("/api/queries") && method === "POST") {
    return NextResponse.next();
  }

  // 2️⃣ Public GET for everything except queries
  if (
    method === "GET" &&
    !pathname.startsWith("/api/queries")
  ) {
    return NextResponse.next();
  }

  // ===============================
  // PROTECTED ROUTES
  // ===============================

  // Protect:
  // - POST/PUT/DELETE of all APIs
  // - GET of /api/queries

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token" },
      { status: 401 }
    );
  }

  try {
    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/products/:path*",
    "/api/brands/:path*",
    "/api/categories/:path*",
    "/api/subcategories/:path*",
  ],
};