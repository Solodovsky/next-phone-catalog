"use client";

import React, { useState } from "react";
import { useFavoritesStore } from "@/store/client/favorites-store";
import { useStoreHydrated } from "@/store/context/StoreHydrationContext";
import ProductList from "@/components/ui/ProductList";
import styles from "./Favorites.module.scss";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 4;

const Favorites: React.FC = () => {
  const hydrated = useStoreHydrated();
  const favoriteProducts = useFavoritesStore((state) => state.favorites);
  const visibleFavoriteProducts = hydrated ? favoriteProducts : [];
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(visibleFavoriteProducts.length / ITEMS_PER_PAGE)
  );
  const effectivePage = Math.min(page, totalPages);
  const sliceStart = (effectivePage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = visibleFavoriteProducts.slice(
    sliceStart,
    sliceStart + ITEMS_PER_PAGE
  );

  return (
    <section className={`page container ${styles.favoritesPage}`}>
      <div className={styles.header}>
        <Breadcrumb />
        <h2 className={styles.title}>Favourites</h2>
        {visibleFavoriteProducts.length === 0 ? (
          ""
        ) : (
          <span className={styles.count}>
            {visibleFavoriteProducts.length}{" "}
            {visibleFavoriteProducts.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      {visibleFavoriteProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>There aren&apos;t products</p>
        </div>
      ) : (
        <>
          <ProductList products={visibleProducts} />
          <div className={styles.favoritesPagination}>
            <Pagination
              totalItems={visibleFavoriteProducts.length}
              items={ITEMS_PER_PAGE}
              currentPage={effectivePage}
              onPageChange={setPage}
              embedded
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
