'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import productsApi from "../../../lib/productsApi";
import { Product } from "@/lib/types";
import styles from "./ProductPage.module.scss";

type Category = "phones" | "tablets" | "accessories";

type Props = {
  category: Category;
  title: string;
  emptyMessage: string;
};

const SORT_OPTIONS = [
  { value: "age", label: "Newest" },
  { value: "title", label: "Name" },
  { value: "price", label: "Price" },
];

const ITEMS_OPTIONS = [4, 8, 16] as const;

const ProductPage: React.FC<Props> = ({ category, title, emptyMessage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [items, setItems] = useState(
    () => Number(searchParams.get("items")) || 16
  );
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sort, setSort] = useState<string>(
    () => searchParams.get("sort") || ""
  );

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const queryParams: Record<string, string | number> = {
          page,
          items,
        };

        if (sort) {
          queryParams.sort = sort;
        }

        const response = await productsApi.fetchData<Product>(
          category,
          queryParams
        );

        if (!response) {
          return;
        }

        setProducts(response.data);

        if (response.pagination) {
          setTotalItems(response.pagination.total);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductsData();
  }, [page, category, items, sort]);

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
    setPage(newPage);
    updateParams({ page: newPage });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    setSort(newSort);

    updateParams({ page: page, sort: newSort || null });
  };

  const handleItemsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItems = +event.target.value;
    setItems(newItems);

    updateParams({ page: page, items: newItems });
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
