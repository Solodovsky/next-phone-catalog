"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks/redux";
import ProductList from "../components/ui/ProductList";
import styles from "./Favorites.module.scss";
import Breadcrumb from "../components/ui/Breadcrumb";
import Pagination from "../components/ui/Pagination";

const ITEMS_PER_PAGE = 4;

const Favorites: React.FC = () => {
  const favoriteProducts = useAppSelector((state) => state.favorites);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(favoriteProducts.length / ITEMS_PER_PAGE)
  );
  const effectivePage = Math.min(page, totalPages);
  const sliceStart = (effectivePage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = favoriteProducts.slice(
    sliceStart,
    sliceStart + ITEMS_PER_PAGE
  );

  return (
    <section className={`page container ${styles.favoritesPage}`}>
      <div className={styles.header}>
        <Breadcrumb />
        <h2 className={styles.title}>Favourites</h2>
        {favoriteProducts.length === 0 ? (
          ""
        ) : (
          <span className={styles.count}>
            {favoriteProducts.length}{" "}
            {favoriteProducts.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      <ProductList products={visibleProducts} />
      <div className={styles.favoritesPagination}>
        <Pagination
          totalItems={favoriteProducts.length}
          items={ITEMS_PER_PAGE}
          currentPage={effectivePage}
          onPageChange={setPage}
          embedded
        />
      </div>
    </section>
  );
};

export default Favorites;
