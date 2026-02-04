import React from "react";
import ProductPage from "../components/ui/ProductPage";

const Accessories: React.FC = () => {
  return (
    <ProductPage
      category="accessories"
      title="Accessories"
      emptyMessage="There are not accessories yet"
    />
  );
};

export default Accessories;
