import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "../usersStore";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

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

  const existing = findUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      {
        message: "A user with this email already exists",
      },
      { status: 409 }
    );
  }

  const user = await createUser(email, password, name);

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    { status: 201 }
  );
}
