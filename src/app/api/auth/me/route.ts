import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { resolveJwtSecret } from "@/lib/jwt-secret";

export async function GET(req: NextRequest) {
  const jwtSecret = resolveJwtSecret();
  if (!jwtSecret) {
    return NextResponse.json({ user: null });
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: string;
      email: string;
    };

    return NextResponse.json({
      user: { id: payload.userId, email: payload.email },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
