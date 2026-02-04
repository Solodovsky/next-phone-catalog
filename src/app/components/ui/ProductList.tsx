import React from "react";
import { Product } from "../../../lib/types";
import styles from "./ProductList.module.scss";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products?: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  if (!products.length) {
    return (
      <div className={styles.productEmpty}>
        <p>There are not products</p>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductList;
