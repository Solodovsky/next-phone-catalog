import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { resolveJwtSecret } from "@/lib/jwt-secret";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const secret = resolveJwtSecret();

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
    });
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path*"],
};
