import type { Product } from "@/lib/types";

export type CategorySlug = "phones" | "tablets" | "accessories";

export type PaginationInfo = {
  total: number;
  page: number;
  items: number;
  totalPages: number;
};

export type CategoryProductsResponse = {
  data: Product[];
  pagination: PaginationInfo;
};

export type CategoryProductsArgs = {
  category: CategorySlug;
  page?: number;
  items?: number;
  sort?: string;
  q?: string;
  model?: string;
  hotPrices?: string;
};

export type ProductByIdArgs = {
  category: CategorySlug;
  id: string;
};

export type SearchProductsArgs = {
  page?: number;
  items?: number;
  q?: string;
};

function buildQueryString(
  params: Record<string, string | number | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return value === "phones" || value === "tablets" || value === "accessories";
}

export function fetchCategoryProducts(
  args: CategoryProductsArgs,
): Promise<CategoryProductsResponse> {
  const { category, page, items, sort, q, model, hotPrices } = args;
  return fetchJson(
    `/api/${category}${buildQueryString({ page, items, sort, q, model, hotPrices })}`,
  );
}

export function fetchProductById(args: ProductByIdArgs): Promise<Product> {
  return fetchJson(`/api/${args.category}/${args.id}`);
}

export function fetchSearchProducts(
  args: SearchProductsArgs,
): Promise<CategoryProductsResponse> {
  const { page = 1, items = 16, q } = args;
  return fetchJson(
    `/api/search${buildQueryString({ page, items, q })}`,
  );
}
