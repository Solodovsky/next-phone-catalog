"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";
import ProductList from "@/components/ui/ProductList";
import PageLoader from "@/components/ui/PageLoader";
import { Product } from "@/lib/types";
import {
  type CategorySlug,
  type PaginationInfo,
} from "@/lib/catalog-api";
import { useCategoryProductsQuery } from "@/hooks/use-catalog-queries";
import styles from "./ProductPage.module.scss";

type Props = {
  category: CategorySlug;
  title: string;
  emptyMessage: string;
};

const SORT_OPTIONS = [
  { value: "age", label: "Newest" },
  { value: "title", label: "Name" },
  { value: "price", label: "Price" },
];

const ITEMS_OPTIONS = [4, 8, 16] as const;

const EMPTY_PAGINATION: PaginationInfo = {
  total: 0,
  page: 1,
  items: 16,
  totalPages: 0,
};

const ProductPage: React.FC<Props> = ({ category, title, emptyMessage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const items = Number(searchParams.get("items")) || 16;
  const sort = searchParams.get("sort") || "";
  const q = searchParams.get("q")?.trim() || "";

  const { data, isLoading, isFetching, isError } = useCategoryProductsQuery({
    category,
    page,
    items,
    sort: sort || undefined,
    q: q || undefined,
  });

  const products: Product[] = data?.data ?? [];
  const pagination = data?.pagination ?? EMPTY_PAGINATION;
  const totalItems = pagination.total;
  const showLoader = isLoading || (isFetching && products.length === 0);

  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    updateParams({ page: 1, sort: newSort || null });
  };

  const handleItemsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItems = +event.target.value;
    updateParams({ page: 1, items: newItems });
  };

  return (
    <div className="page container">
      <Breadcrumb />
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.totalItem}>{totalItems} models</span>
      <div className={styles.selectContainer}>
        <div className={styles.selectItems}>
          <span>Sorty by</span>
          <select
            name="Sort by"
            id="sort-select"
            className={styles.selectItem}
            value={sort}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectItems}>
          <span>Items on page</span>
          <select
            name="Items per page"
            id="per-page-select"
            className={styles.selectItem}
            value={items.toString()}
            onChange={handleItemsChange}
          >
            {ITEMS_OPTIONS.map((count, idx) => (
              <option key={idx} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showLoader ? (
        <PageLoader />
      ) : isError ? (
        <div className={styles.emptyMessage}>Failed to load products</div>
      ) : products.length === 0 ? (
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      ) : (
        <ProductList products={products} />
      )}

      {!showLoader && !isError && totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          items={items}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductPage;
