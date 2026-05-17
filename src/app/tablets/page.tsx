import { headers } from "next/headers";
import ProductPage from "../components/ui/ProductPage";
import { fetchCategoryData } from "@/lib/productsApi";
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

export default async function TabletsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const items = (params.items as string) || "16";
  const sort = (params.sort as string) || "";
  const q = typeof params.q === "string" ? params.q : "";

  const baseUrl = await getBaseUrl();

  const queryParams: Record<string, string> = { page, items };
  if (sort) queryParams.sort = sort;
  if (q.trim()) queryParams.q = q.trim();

  const { data: products, pagination } = await fetchCategoryData(
    baseUrl,
    "tablets",
    queryParams
  );

  const defaultPagination = {
    total: 0,
    page: 1,
    items: 16,
    totalPages: 0,
  };

  return (
    <ProductPage
      category="tablets"
      title="Tablets"
      emptyMessage="There are not tablets yet"
      initialProducts={(products || []) as Product[]}
      initialPagination={pagination || defaultPagination}
    />
  );
}
