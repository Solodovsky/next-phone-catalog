import { NextResponse } from "next/server";
import tablets from "../../../../../data/tablets.json";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    const tablet = tablets.find((table) => table.id === id);

    if (!tablet) {
      return NextResponse.json(
        { message: "Tablet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tablet);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
