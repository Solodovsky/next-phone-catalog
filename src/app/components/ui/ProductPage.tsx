'use client';

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import { Product } from "@/lib/types";
import styles from "./ProductPage.module.scss";

type Category = "phones" | "tablets" | "accessories";

type PaginationInfo = {
  total: number;
  page: number;
  items: number;
  totalPages: number;
};

type Props = {
  category: Category;
  title: string;
  emptyMessage: string;
  initialProducts: Product[];
  initialPagination: PaginationInfo;
};

const SORT_OPTIONS = [
  { value: "age", label: "Newest" },
  { value: "title", label: "Name" },
  { value: "price", label: "Price" },
];

const ITEMS_OPTIONS = [4, 8, 16] as const;

const ProductPage: React.FC<Props> = ({
  title,
  emptyMessage,
  initialProducts,
  initialPagination,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const items = Number(searchParams.get("items")) || 16;
  const sort = searchParams.get("sort") || "";
  const products = initialProducts;
  const totalItems = initialPagination.total;

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
      {products.length === 0 ? (
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      ) : (
        <ProductList products={products} />
      )}

      <Pagination
        totalItems={totalItems}
        items={items}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
