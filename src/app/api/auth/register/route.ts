import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { isPrismaDatabaseUnavailableError } from "@/lib/prisma-env-error";

export async function POST(req: NextRequest) {
  try {
    let body: { email?: string; password?: string; name?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { email: emailRaw, password, name } = body;
    const email = typeof emailRaw === "string" ? emailRaw.trim() : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return NextResponse.json(
        {
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email: normalizedEmail, passwordHash, name },
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "A user with this email already exists" },
          { status: 409 }
        );
      }
    }

    if (isPrismaDatabaseUnavailableError(e)) {
      return NextResponse.json(
        {
          message:
            "Database is unavailable. Create next-phone-catalog/.env with DATABASE_URL (see .env.example), then run: npx prisma migrate deploy",
        },
        { status: 503 }
      );
    }

    console.error("[auth/register]", e);
    return NextResponse.json(
      {
        message:
          "Registration failed. If this persists, check that PostgreSQL is running and DATABASE_URL is correct.",
      },
      { status: 500 }
    );
  }
}
