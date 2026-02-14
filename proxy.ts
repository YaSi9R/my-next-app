import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;

  const protectedPaths = [
    "/api/products",
    "/api/brands",
    "/api/categories",
    "/api/subcategories",
  ];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) return NextResponse.next();

  if (req.method === "GET") return NextResponse.next();

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