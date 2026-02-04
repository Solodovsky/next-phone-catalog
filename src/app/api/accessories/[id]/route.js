import { NextResponse } from "next/server";
import accessories from "../../../../../data/accessories.json";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    let accessory = accessories.find((acc) => acc.id === id);

    if (!accessory) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(accessory);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: String(error) },
      { status: 500 }
    );
  }
}
