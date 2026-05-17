import { NextResponse } from "next/server";
import phones from "../../../../data/phones.json";
import tablets from "../../../../data/tablets.json";
import accessories from "../../../../data/accessories.json";
import { nameMatchesQuery } from "@/lib/searchMatch";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
    const page = Number(searchParams.get("page") || "1");
    const items = Number(searchParams.get("items") || "16");

    const filterByName = (p) => !q || nameMatchesQuery(p.name, q);

    let result = [
      ...phones.filter(filterByName),
      ...tablets.filter(filterByName),
      ...accessories.filter(filterByName),
    ];

    result.sort((a, b) => a.name.localeCompare(b.name));

    const total = result.length;
    const perPageNum = items > 0 ? items : 16;
    const pageNum = page > 0 ? page : 1;
    const startIndex = (pageNum - 1) * perPageNum;
    const paginated = result.slice(startIndex, startIndex + perPageNum);

    return NextResponse.json({
      data: paginated,
      pagination: {
        total,
        page: pageNum,
        items: perPageNum,
        totalPages: Math.ceil(total / perPageNum) || 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error searching", error: String(error) },
      { status: 500 },
    );
  }
}
