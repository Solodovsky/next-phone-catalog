import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resolveJwtSecret } from "@/lib/jwt-secret";
import { isPrismaDatabaseUnavailableError } from "@/lib/prisma-env-error";

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60,
};

export async function POST(req: NextRequest) {
  const jwtSecret = resolveJwtSecret();
  if (!jwtSecret) {
    return NextResponse.json(
      {
        message:
          "Set JWT_SECRET in the server environment (see .env.example). Required in production.",
      },
      { status: 503 }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const emailRaw = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  const email = emailRaw.trim().toLowerCase();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Incorrect login or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Incorrect login or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });

    const res = NextResponse.json(
      {
        message: "Successful login",
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 200 }
    );

    res.cookies.set("token", token, cookieOpts);

    return res;
  } catch (e) {
    if (isPrismaDatabaseUnavailableError(e)) {
      return NextResponse.json(
        {
          message:
            "Database is unavailable. Create next-phone-catalog/.env with DATABASE_URL (see .env.example), then run: npx prisma migrate deploy",
        },
        { status: 503 }
      );
    }

    console.error("[auth/login]", e);
    const payload: { message: string; debug?: string } = {
      message:
        "Login failed. Check the terminal log and DATABASE_URL / migrations.",
    };
    if (process.env.NODE_ENV === "development" && e instanceof Error) {
      payload.debug = e.message;
    }
    return NextResponse.json(payload, { status: 500 });
  }
}
