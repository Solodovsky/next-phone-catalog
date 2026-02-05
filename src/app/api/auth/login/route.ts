import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../usersStore";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = findUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      {
        message: "Incorrect login or password",
      },
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

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const res = NextResponse.json(
    {
      message: "Successful login",
      user: { id: user.id, email: user.email, name: user.name },
    },
    { status: 200 }
  );

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
  });

  return res;
}
