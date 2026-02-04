import { NextResponse } from "next/server";
import phones from "../../../../../data/phones.json";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const phone = phones.find((item) => item.id === id);

    if (!phone) {
      return NextResponse.json({ message: "Phone not found" }, { status: 404 });
    }

    return NextResponse.json(phone);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching",
      },
      { status: 500 }
    );
  }
}
