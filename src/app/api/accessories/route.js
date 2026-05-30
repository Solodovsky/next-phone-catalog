import { NextResponse } from "next/server";
import accessories from "../../../../data/accessories.json";
import { nameMatchesQuery } from "@/lib/searchMatch";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort");
    const page = Number(searchParams.get("page") || "1");
    const items = Number(searchParams.get("items") || "16");

    let result = [...accessories];

    const q = searchParams.get("q")?.trim().toLowerCase();
    if (q) {
      result = result.filter((item) => nameMatchesQuery(item.name, q));
    }

    if (sort) {
      switch (sort) {
        case "age":
          result.sort((a, b) => {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return b.id.localeCompare(a.id);
          });
          break;
        case "title":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "price":
          result.sort((a, b) => a.priceDiscount - b.priceDiscount);
          break;
        default:
          break;
      }
    }

    const total = result.length;
    const perPageNum = items > 0 ? items : 16;
    const pageNum = page > 0 ? page : 1;
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;
    const paginatedResult = result.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedResult,
      pagination: {
        total,
        page: pageNum,
        items: perPageNum,
        totalPages: Math.ceil(total / perPageNum),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching accessories" },
      { status: 500 }
    );
  }
}
