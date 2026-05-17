import { headers } from "next/headers";
import SearchResultsClient from "./SearchResultsClient";
import { fetchSearchData } from "@/lib/productsApi";
import type { Product } from "@/lib/types";

async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const items = (params.items as string) || "16";
  const qRaw = typeof params.q === "string" ? params.q : "";
  const q = qRaw.trim();

  const baseUrl = await getBaseUrl();

  const query: Record<string, string> = { page, items };
  if (q) {
    query.q = q;
  }

  const { data: products, pagination } = await fetchSearchData(
    baseUrl,
    query,
  );

  const defaultPagination = {
    total: 0,
    page: 1,
    items: 16,
    totalPages: 0,
  };

  const p = pagination || defaultPagination;

  return (
    <div className="page container">
      <SearchResultsClient
        products={(products || []) as Product[]}
        pagination={p}
        qRaw={qRaw}
      />
    </div>
  );
}
