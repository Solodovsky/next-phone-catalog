import { NextResponse } from "next/server";
import phones from "../../../../data/phones.json";
import { nameMatchesQuery } from "@/lib/searchMatch";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const model = searchParams.get("model");
    const sort = searchParams.get("sort");
    const hotPrices = searchParams.get("hotPrices");
    const page = Number(searchParams.get("page") || "1");
    const items = Number(searchParams.get("items") || "16");

    let result = [...phones];

    if (model) {
      result = result.filter((phone) => phone.id.includes(model));

      if (model.includes("iphone-14")) {
        result.sort((a, b) => {
          const aPro = a.id.includes("iphone-14-pro");
          const bPro = b.id.includes("iphone-14-pro");

          if (aPro && !bPro) return -1;
          if (!aPro && bPro) return 1;

          return 0;
        });
      }
    }

    if (hotPrices) {
      result = result.filter(
        (phone) => phone.priceDiscount < phone.priceRegular
      );

      result.sort((a, b) => {
        const discountA = a.priceRegular - a.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;

        return discountB - discountA;
      });
    }

    const q = searchParams.get("q")?.trim().toLowerCase();
    if (q) {
      result = result.filter((phone) => nameMatchesQuery(phone.name, q));
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
    const paginationResult = result.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginationResult,
      pagination: {
        total,
        page: pageNum,
        items: perPageNum,
        totalPages: Math.ceil(total / perPageNum),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching phones" },
      { status: 500 }
    );
  }
}
