"use client";

import ProductList from "../components/ui/ProductList";
import styles from "../components/ui/ProductPage.module.scss";
import SearchPagination from "./SearchPagination";
import type { Product } from "@/lib/types";

type Pagination = {
  total: number;
  page: number;
  items: number;
  totalPages: number;
};

type Props = {
  products: Product[];
  pagination: Pagination;
  qRaw: string;
};

export default function SearchResultsClient({
  products,
  pagination: p,
  qRaw,
}: Props) {
  return (
    <>
      <span className={styles.totalItem}>
        {p.total} {p.total === 1 ? "item" : "items"}
      </span>
      <ProductList products={products} />
      <SearchPagination
        totalItems={p.total}
        items={p.items}
        currentPage={p.page}
        q={qRaw}
      />
    </>
  );
}
