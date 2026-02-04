import { NextResponse } from "next/server";
import products from "../../../../../data/products.json";
import tablets from "../../../../../data/tablets.json";
import accessories from "../../../../../data/accessories.json";
import phones from "../../../../../data/phones.json";




export async function GET(
  _request,
  { params }
) {
  try {
    const { id } = await params;
    

    let product = products.find(
      (prod) => String(prod.id) === id || prod.itemId === id
    );

    if (!product) {
        product = phones.find((phone) => phone.id === id);
    }

    if(!product) {
        product = accessories.find((acc) => acc.id === id)
    }

    if(!product) {
        product = tablets.find((tablet => tablet.id === id))
    }

    if (!product) {
        return NextResponse.json({ message: "Product not found" },
            {status: 404}
        );
      }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error: String(error) },
      { status: 500 }
    );
  }
}
