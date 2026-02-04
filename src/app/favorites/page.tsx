"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks/redux";
import ProductList from "../components/ui/ProductList";
import styles from "./Favorites.module.scss";
import Breadcrumb from "../components/ui/Breadcrumb";

const Favorites: React.FC = () => {
  const favoriteProducts = useAppSelector((state) => state.favorites);

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
      <ProductList products={favoriteProducts} />
    </section>
  );
};

export default Favorites;
