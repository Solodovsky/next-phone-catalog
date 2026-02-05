import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };

    return NextResponse.json(
      {
        user: { id: payload.userId, email: payload.email },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
