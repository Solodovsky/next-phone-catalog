import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryProducts,
  fetchProductById,
  fetchSearchProducts,
  type CategoryProductsArgs,
  type ProductByIdArgs,
  type SearchProductsArgs,
} from "@/lib/catalog-api";

export const catalogQueryKeys = {
  categoryProducts: (args: CategoryProductsArgs) =>
    ["categoryProducts", args] as const,
  productById: (args: ProductByIdArgs) => ["productById", args] as const,
  searchProducts: (args: SearchProductsArgs) =>
    ["searchProducts", args] as const,
};

type QueryOptions = {
  enabled?: boolean;
};

export function useCategoryProductsQuery(
  args: CategoryProductsArgs,
  options?: QueryOptions,
) {
  return useQuery({
    queryKey: catalogQueryKeys.categoryProducts(args),
    queryFn: () => fetchCategoryProducts(args),
    enabled: options?.enabled ?? true,
  });
}

export function useProductByIdQuery(
  args: ProductByIdArgs,
  options?: QueryOptions,
) {
  return useQuery({
    queryKey: catalogQueryKeys.productById(args),
    queryFn: () => fetchProductById(args),
    enabled: options?.enabled ?? true,
  });
}

export function useSearchProductsQuery(
  args: SearchProductsArgs,
  options?: QueryOptions,
) {
  return useQuery({
    queryKey: catalogQueryKeys.searchProducts(args),
    queryFn: () => fetchSearchProducts(args),
    enabled: options?.enabled ?? true,
  });
}
