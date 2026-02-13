import type { Category, PaginationResponse, QueryParams } from "./types.ts";

const API_BASE_URL = "/api";

export const productsApi = {
  fetchData: async <T>(
    url: Category,
    queryParams: QueryParams = {},
  ): Promise<PaginationResponse<T> | undefined> => {
    try {
      let queryString = "";

      for (const key in queryParams) {
        queryString += `${key}=${queryParams[key]}&`;
      }

      const baseUrl = `${API_BASE_URL}/${url}?${queryString}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API ERROR:", error);
      return undefined;
    }
  },

  fetchDataId: async <T>(url: Category, id: string): Promise<T | undefined> => {
    try {
      const baseUrl = `${API_BASE_URL}/${url}/${id}`;
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API ERROR:", error);
      return undefined;
    }
  },
};

export default productsApi;

export async function fetchCategoryData(
  baseUrl: string,
  category: Category,
  params: { page?: number; items?: number; sort?: string } = {},
) {
  const search = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [k, v]) =>
        v != null && v !== "" ? { ...acc, [k]: String(v) } : acc,
      {} as Record<string, string>,
    ),
  ).toString();

  const res = await fetch(`${baseUrl}/api/${category}?${search}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok)
    return {
      data: [],
      pagination: { total: 0, page: 1, items: 16, totalPages: 0 },
    };
  return res.json();
}
