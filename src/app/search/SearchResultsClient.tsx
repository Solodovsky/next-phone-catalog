"use client";

import { useSearchParams } from "next/navigation";
import ProductList from "@/components/ui/ProductList";
import PageLoader from "@/components/ui/PageLoader";
import styles from "@/features/catalog/ProductPage.module.scss";
import SearchPagination from "./SearchPagination";
import { useSearchProductsQuery } from "@/hooks/use-catalog-queries";

const EMPTY_PAGINATION = {
  total: 0,
  page: 1,
  items: 16,
  totalPages: 0,
};

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const items = Number(searchParams.get("items")) || 16;
  const qRaw = searchParams.get("q") ?? "";
  const q = qRaw.trim();

  const { data, isLoading, isFetching, isError } = useSearchProductsQuery({
    page,
    items,
    q: q || undefined,
  });

  const products = data?.data ?? [];
  const p = data?.pagination ?? EMPTY_PAGINATION;
  const showLoader = isLoading || (isFetching && products.length === 0);

  return (
    <>
      <span className={styles.totalItem}>
        {p.total} {p.total === 1 ? "item" : "items"}
      </span>

      {showLoader ? (
        <PageLoader />
      ) : isError ? (
        <p className={styles.emptyMessage}>Failed to load search results</p>
      ) : (
        <ProductList products={products} />
      )}

      {!showLoader && !isError && (
        <SearchPagination
          totalItems={p.total}
          items={p.items}
          currentPage={p.page}
          q={qRaw}
        />
      )}
    </>
  );
}
