import type { EndpointName, PaginationResponse, QueryParams } from "./types.ts";

const API_BASE_URL = "/api";

export const productsApi = {
  fetchData: async <T>(
    url: EndpointName,
    queryParams: QueryParams = {}
  ): Promise<PaginationResponse<T> | undefined> => {
    try {
      const params = new URLSearchParams();

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

  fetchDataId: async <T>(
    url: EndpointName,
    id: string
  ): Promise<T | undefined> => {
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
