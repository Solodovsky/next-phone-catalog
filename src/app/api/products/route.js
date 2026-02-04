import { NextResponse } from "next/server";
import products from "../../../../data/products.json";

export async function GET() {
  try {
    return NextResponse.json({
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: String(error) },
      { status: 500 }
    );
  }
}
